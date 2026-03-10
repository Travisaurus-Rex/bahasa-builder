"use client";

import { useTheme } from "next-themes";
import { getAffixColor } from "@/lib/affixColors";

interface AffixPillProps {
  affix: string;
}

export default function AffixPill({ affix }: AffixPillProps) {
  const { resolvedTheme } = useTheme();
  const color = getAffixColor(affix, resolvedTheme === "dark");

  return (
    <span
      style={{
        backgroundColor: `${color}22`,
        border: `1px solid ${color}45`,
        color: color,
      }}
      className="inline-block px-2 py-0.5 rounded-full font-mono text-xs uppercase tracking-wide"
    >
      {affix}
    </span>
  );
}
