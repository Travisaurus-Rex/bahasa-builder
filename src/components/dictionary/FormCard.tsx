"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormEntry } from "@/lib/ai/validation";
import AffixPill from "./AffixPill";
import ExampleBlock from "./ExampleBlock";
import { getAffixColor } from "@/lib/affixColors";
import { useTheme } from "next-themes";

interface FormCardProps {
  form: FormEntry;
}

export default function FormCard({ form }: FormCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { resolvedTheme } = useTheme();
  const color = getAffixColor(form.affix, resolvedTheme === "dark");

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="rounded-xl p-4 cursor-pointer transition-colors"
      style={{
        backgroundColor: "var(--form-card-bg)",
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div className="flex items-center gap-3 mb-1">
        <span
          className="font-serif text-[22px]"
          style={{
            color: "var(--form-card-word)",
            fontFamily: "Georgia, serif",
          }}
        >
          {form.form}
        </span>
        <AffixPill affix={form.affix} />
        <span
          className="italic text-sm"
          style={{ color: "var(--form-card-role)" }}
        >
          {form.role}
        </span>
        <motion.span
          className="ml-auto text-xl"
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "var(--form-card-role)", display: "inline-block" }}
        >
          +
        </motion.span>
      </div>

      <p className="text-sm" style={{ color: "var(--form-card-meaning)" }}>
        {form.meaning}
      </p>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-4">
              {form.note && (
                <div
                  className="rounded-lg px-3 py-2 mb-3 text-sm"
                  style={{
                    backgroundColor: "var(--form-card-note-bg)",
                    color: "var(--form-card-note-text)",
                  }}
                >
                  💡 {form.note}
                </div>
              )}
              <div className="flex flex-col gap-2">
                {form.examples.map((ex, i) => (
                  <ExampleBlock
                    key={i}
                    indo={ex.indo}
                    english={ex.english}
                    color={color}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
