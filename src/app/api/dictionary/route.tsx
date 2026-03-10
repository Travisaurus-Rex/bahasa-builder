import { analyzeWord } from "@/lib/ai/dictionary-agent";
import { RootWord } from "@/lib/db/models/RootWord";

export async function POST(req: Request) {
  try {
    const { word } = await req.json();
    const normalized = word.trim().toLowerCase();

    // word == any existing form
    const cachedByForm = await RootWord.findOne({
      "forms.form": normalized,
    }).lean();
    if (cachedByForm) return Response.json(cachedByForm);

    // word == root
    const cachedByRoot = await RootWord.findOne({ root: normalized }).lean();
    if (cachedByRoot) return Response.json(cachedByRoot);

    // word doesn't exist yet in storage, so create it with AI agent
    const aiResponse = await analyzeWord(word);
    const saved = await RootWord.create(aiResponse);
    return Response.json(saved);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
