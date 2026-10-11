import Link from "next/link";
import type { Metadata } from "next";
import { RootWord } from "@/lib/db/models/RootWord";
import { connectDB } from "@/lib/db/mongoose";
import { RootWordEntry } from "@/lib/ai/validation";
import Header from "@/components/dictionary/Header";
import ResultView from "../ResultView";

// Always read fresh from the database, so a word that wasn't found earlier
// isn't stuck as "not found" after someone searches it.
export const dynamic = "force-dynamic";

function cleanWord(raw: string): string {
  let word = raw;
  try {
    word = decodeURIComponent(raw);
  } catch {
    // keep the raw value if it isn't valid URL encoding
  }
  return word.trim().toLowerCase();
}

async function getEntry(raw: string): Promise<RootWordEntry | null> {
  const word = cleanWord(raw);
  await connectDB();

  // Shared links use the root, so check the root first, then any form
  const doc =
    (await RootWord.findOne({ root: word }).lean()) ??
    (await RootWord.findOne({ "forms.form": word }).lean());

  // Convert Mongo-specific values (like _id) into plain JSON for the client component
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ word: string }>;
}): Promise<Metadata> {
  const { word } = await params;
  return { title: `${cleanWord(word)} | Bahasa Builder` };
}

export default async function WordPage({
  params,
}: {
  params: Promise<{ word: string }>;
}) {
  const { word } = await params;
  const entry = await getEntry(word);

  return (
    <main
      className="min-h-screen bg-background"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <Header />

      <div className="max-w-[760px] mx-auto px-6 py-6">
        {entry ? (
          <ResultView entry={entry} />
        ) : (
          <div>
            <p className="text-sm uppercase tracking-widest mb-4">
              No entry for &ldquo;{cleanWord(word)}&rdquo; yet.
            </p>
            <Link
              href="/dictionary"
              className="text-sm uppercase tracking-widest underline"
            >
              Search the dictionary
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
