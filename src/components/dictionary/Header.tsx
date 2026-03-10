import ModeToggle from "@/components/ui/ModeToggle";

export default function Header() {
  return (
    <div
      className="relative text-center py-12 px-4 mb-8 rounded-2xl overflow-hidden"
      style={{ background: "var(--header-bg)" }}
    >
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <p
        className="text-xs font-mono uppercase tracking-[0.3em] mb-4"
        style={{ color: "var(--header-subtitle)" }}
      >
        Kamus Bahasa Indonesia
      </p>

      <h1
        className="font-serif font-bold text-5xl mb-3"
        style={{ color: "var(--header-title)", fontFamily: "Georgia, serif" }}
      >
        Indonesian Dictionary
      </h1>

      <p className="text-base" style={{ color: "var(--header-descriptor)" }}>
        Root words, affixes, and real example sentences
      </p>
    </div>
  );
}
