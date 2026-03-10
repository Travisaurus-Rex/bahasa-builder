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
        backgroundColor: "#ffffff06",
        borderLeft: `3px solid ${color}`,
        borderRadius: "0 8px 8px 0",
      }}
      className="px-4 py-3"
    >
      <p className="font-serif text-[15px] mb-1 text-gray-800 dark:text-[#E0E0E0]">
        {indo}
      </p>
      <p className="text-[13px] text-gray-500 dark:text-[#888888]">{english}</p>
    </div>
  );
}
