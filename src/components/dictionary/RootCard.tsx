import { RootWordEntry } from "@/lib/ai/validation";

interface RootCardProps {
  entry: RootWordEntry;
}

export default function RootCard({ entry }: RootCardProps) {
  return (
    <div
      className="rounded-2xl p-6 mb-3"
      style={{
        background: "var(--root-card-bg)",
        border: "1px solid var(--root-card-border)",
      }}
    >
      <div className="flex items-baseline gap-3 mb-2">
        <h1
          className="font-serif text-[42px] leading-none"
          style={{
            color: "var(--root-card-word)",
            fontFamily: "Georgia, serif",
          }}
        >
          {entry.root}
        </h1>
        <span
          className="italic text-sm"
          style={{ color: "var(--root-card-pos)" }}
        >
          {entry.partOfSpeech}
        </span>
      </div>

      <p
        className="text-base mb-3"
        style={{ color: "var(--root-card-meaning)" }}
      >
        {entry.meaning}
      </p>

      {entry.etymology && (
        <p
          className="italic text-sm"
          style={{ color: "var(--root-card-etymology)" }}
        >
          {entry.etymology}
        </p>
      )}
    </div>
  );
}
