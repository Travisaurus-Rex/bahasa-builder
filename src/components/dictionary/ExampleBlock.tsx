interface ExampleBlockProps {
  indo: string;
  english: string;
  color: string;
}

export default function ExampleBlock({
  indo,
  english,
  color,
}: ExampleBlockProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--example-bg)",
        borderLeft: `3px solid ${color}`,
      }}
      className="px-4 py-3"
    >
      <p
        className="text-[15px] mb-1 text-foreground"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {indo}
      </p>
      <p
        className="text-[13px] text-muted-foreground"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {english}
      </p>
    </div>
  );
}
