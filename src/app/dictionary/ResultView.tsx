"use client";

import { RootWordEntry } from "@/lib/ai/validation";
import RootCard from "@/components/dictionary/RootCard";
import FormCard from "@/components/dictionary/FormCard";
import { sortForms } from "@/lib/affixSort";
import ShareButton from "./ShareButton";

export default function ResultView({ entry }: { entry: RootWordEntry }) {
  return (
    <div>
      <div className="flex justify-end mb-2">
        <ShareButton root={entry.root} />
      </div>
      <RootCard entry={entry} />
      <div className="flex flex-col mt-2">
        {sortForms(entry.forms)
          .filter((form) => form.affix !== "none")
          .map((form, i) => (
            <FormCard key={i} form={form} />
          ))}
      </div>
    </div>
  );
}
