import { RootWordEntry } from "@/lib/ai/validation";

interface RootCardProps {
  entry: RootWordEntry;
}

export default function RootCard({ entry }: RootCardProps) {
  return (
    <div
      className="p-6 mb-2 bg-card"
      style={{
        borderLeft: "4px solid var(--border-strong)",
        borderBottom: "2px solid var(--border-strong)",
      }}
    >
      <div className="flex items-baseline gap-3 mb-2">
        <h1
          className="text-[42px] leading-none text-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {entry.root}
        </h1>
        <span
          className="italic text-sm text-muted-foreground"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {entry.partOfSpeech}
        </span>
      </div>

      <p
        className="text-base mb-3 text-foreground"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {entry.meaning}
      </p>

      {entry.etymology && (
        <p
          className="italic text-sm text-muted-foreground"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {entry.etymology}
        </p>
      )}
    </div>
  );
}
