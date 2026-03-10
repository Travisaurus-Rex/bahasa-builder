"use client";

import AffixPill from "@/components/dictionary/AffixPill";
import FormCard from "@/components/dictionary/FormCard";
import RootCard from "@/components/dictionary/RootCard";
import ModeToggle from "@/components/ui/ModeToggle";
import { useEffect, useState } from "react";

const mockEntry = {
  root: "ubah",
  meaning: "change, alter, transform",
  partOfSpeech: "verb root",
  etymology: "From Old Malay, related to shifting or altering state",
  forms: [],
};

const mockForm = {
  form: "berubah",
  affix: "ber-",
  role: "Intransitive verb",
  meaning: "To change by itself, to undergo change",
  note: "No object. The subject changes on its own.",
  examples: [
    {
      indo: "Cuaca berubah dengan cepat.",
      english: "The weather changed quickly.",
    },
    {
      indo: "Dia sudah berubah sejak dulu.",
      english: "He has changed since before.",
    },
  ],
};

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D0D14] p-8">
      <div className="mb-8">
        <ModeToggle />
      </div>
      <div className="mt-8 max-w-2xl">
        <RootCard entry={mockEntry} />
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
      <div className="mt-4 max-w-2xl">
        <FormCard form={mockForm} />
      </div>
    </div>
  );
}
