"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormEntry } from "@/lib/ai/validation";
import AffixPill from "./AffixPill";
import ExampleBlock from "./ExampleBlock";
import { affixColorsDark, affixColorsLight } from "@/lib/affixColors";
import { useTheme } from "next-themes";
import { useEffect } from "react";

interface FormCardProps {
  form: FormEntry;
}

export default function FormCard({ form }: FormCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const colors = resolvedTheme === "light" ? affixColorsLight : affixColorsDark;
  const color = mounted
    ? (colors[form.affix] ?? colors["none"])
    : (affixColorsDark[form.affix] ?? affixColorsDark["none"]);

  return (
    <div
      className="bg-card cursor-pointer mb-2"
      style={{
        borderLeft: `4px solid ${color}`,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <span
          className="text-[22px] text-foreground"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {form.form}
        </span>
        <AffixPill affix={form.affix} affixSurface={form.affixSurface} />
        <span
          className="italic text-sm text-muted-foreground"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {form.role}
        </span>
        <motion.span
          className="ml-auto text-xl text-muted-foreground"
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: "inline-block", fontFamily: "var(--font-mono)" }}
        >
          +
        </motion.span>
      </div>

      <p
        className="px-5 pb-4 text-sm text-foreground"
        style={{ fontFamily: "var(--font-mono)" }}
      >
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
            <div className="px-5 pb-5">
              {form.note && (
                <div
                  className="px-3 py-2 mb-3 text-sm text-muted-foreground"
                  style={{
                    fontFamily: "var(--font-mono)",
                    borderLeft: `2px solid ${color}`,
                    backgroundColor: "var(--form-card-note-bg)",
                    color: "var(--form-card-note-text)",
                  }}
                >
                  {form.note}
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
