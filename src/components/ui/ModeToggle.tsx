"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-1 text-sm border border-white/20 rounded-full hover:border-white/40 transition-colors"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
