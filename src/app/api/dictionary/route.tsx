import { analyzeWord } from "@/lib/ai/dictionary-agent";
import { RootWord } from "@/lib/db/models/RootWord";
import { connectDB } from "@/lib/db/mongoose";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const normalized =
    typeof body?.word === "string" ? body.word.trim().toLowerCase() : "";

  if (!normalized) {
    return Response.json({ error: "A word is required" }, { status: 400 });
  }

  // Step 1: database lookup
  try {
    await connectDB();

    // word == any existing form
    const cachedByForm = await RootWord.findOne({
      "forms.form": normalized,
    }).lean();
    if (cachedByForm) return Response.json(cachedByForm);

    // word == root
    const cachedByRoot = await RootWord.findOne({ root: normalized }).lean();
    if (cachedByRoot) return Response.json(cachedByRoot);
  } catch (e) {
    console.error("Database lookup failed:", e);
    return Response.json({ error: "Database lookup failed" }, { status: 500 });
  }

  // Step 2: word isn't stored yet, so ask the AI
  let aiResponse;
  try {
    aiResponse = await analyzeWord(normalized);
  } catch (e) {
    console.error("AI lookup failed:", e);
    return Response.json(
      {
        error: "AI lookup failed",
        detail: e instanceof Error ? e.message : String(e),
      },
      { status: 502 },
    );
  }

  // Step 3: save the result
  try {
    const saved = await RootWord.create(aiResponse);
    return Response.json(saved);
  } catch (e) {
    console.error("Saving entry failed:", e);
    return Response.json({ error: "Saving entry failed" }, { status: 500 });
  }
}
