import Link from "next/link";
import ModeToggle from "@/components/ui/ModeToggle";

export default function Header() {
  return (
    <nav
      className="flex items-center justify-between px-6 py-4 bg-background text-foreground"
      style={{ borderBottom: "2px solid var(--border-strong)" }}
    >
      <Link
        href="/"
        className="text-sm font-bold uppercase tracking-widest text-foreground"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Bahasa Builder
      </Link>
      <div className="flex items-center gap-6">
        <span
          className="text-xs uppercase tracking-widest hidden md:block text-muted-foreground"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Kamus Bahasa Indonesia
        </span>
        <ModeToggle />
      </div>
    </nav>
  );
}
