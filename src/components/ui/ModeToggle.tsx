"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-100"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {theme === "light" && (
        <span className="flex items-center gap-1">
          Dark
          <Moon width={14} />
        </span>
      )}

      {theme === "dark" && (
        <span className="flex items-center gap-1">
          Light
          <Sun width={14} />
        </span>
      )}
    </button>
  );
}
