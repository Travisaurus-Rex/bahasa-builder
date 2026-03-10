"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getAffixColor } from "@/lib/affixColors";

interface AffixPillProps {
  affix: string; // canonical - for color lookup
  affixSurface: string; // display - what shows in the pill
}

export default function AffixPill({ affix, affixSurface }: AffixPillProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const color = getAffixColor(affix, resolvedTheme === "dark");

  return (
    <span
      style={{
        backgroundColor: `${color}22`,
        border: `1px solid ${color}88`,
        color: color,
      }}
      className="inline-block px-2 py-0.5 font-mono text-xs uppercase tracking-wide"
    >
      {affixSurface}
    </span>
  );
}
