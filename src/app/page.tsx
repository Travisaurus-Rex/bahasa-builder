"use client";

import AffixPill from "@/components/dictionary/AffixPill";
import ModeToggle from "@/components/ui/ModeToggle";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D0D14] p-8">
      <div className="mb-8">
        <ModeToggle />
      </div>
      <div className="flex flex-wrap gap-4">
        <AffixPill affix="none" />
        <AffixPill affix="ber-" />
        <AffixPill affix="meng-" />
        <AffixPill affix="di-" />
        <AffixPill affix="per-...-an" />
        <AffixPill affix="peng-...-an" />
        <AffixPill affix="ter-" />
      </div>
    </div>
  );
}
