"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const morphForms = [
  { word: "ubah", affix: "ROOT", color: "#000000" },
  { word: "berubah", affix: "BER-", color: "#00B4D8" },
  { word: "mengubah", affix: "MENG-", color: "#9D4EDD" },
  { word: "diubah", affix: "DI-", color: "#2DC653" },
  { word: "perubahan", affix: "PER-...-AN", color: "#F4A261" },
  { word: "pengubahan", affix: "PENG-...-AN", color: "#E63946" },
  { word: "terubah", affix: "TER-", color: "#FFD166" },
];

const features = [
  {
    number: "001",
    title: "Any form. Any entry point.",
    body: "Type mengubah, perubahan, or diubah. The engine resolves it to the root ubah and returns every valid grammatical form. No guessing required.",
  },
  {
    number: "002",
    title: "Grammar made visible.",
    body: "Each affix type has a fixed color. Intransitive is cyan. Active transitive is purple. Passive is green. You learn to read the color before you read the word.",
  },
  {
    number: "003",
    title: "AI on the miss. Cache on the hit.",
    body: "First lookup calls the AI engine. Every subsequent lookup is a direct MongoDB read. Fast by default, intelligent when needed.",
  },
];

export default function LandingPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % morphForms.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  const active = morphForms[current];

  return (
    <main
      className="min-h-screen bg-[#F2F0EB] text-black overflow-x-hidden"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <nav className="flex items-center justify-between px-6 py-4 border-b-2 border-black">
        <span className="text-sm font-bold uppercase tracking-widest">
          Bahasa Builder
        </span>
        <div className="flex items-center gap-6">
          <span className="text-xs text-black/40 uppercase tracking-widest hidden md:block">
            Kamus Bahasa Indonesia
          </span>
          <Link
            href="/dictionary"
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest border-2 border-black hover:bg-black hover:text-[#F2F0EB] transition-colors duration-100"
          >
            Open Dictionary →
          </Link>
        </div>
      </nav>

      <section className="border-b-2 border-black">
        <div className="grid md:grid-cols-2 min-h-[90vh]">
          <div
            className="flex flex-col justify-between p-8 md:p-12 border-r-2 min-h-[50vh]"
            style={{
              borderRightColor:
                active.color === "#000000" ? "#000" : active.color,
            }}
          >
            <div className="flex items-start justify-between">
              <span className="text-xs uppercase tracking-widest text-black/40">
                Root: ubah
              </span>
              <span
                className="text-xs font-bold px-2 py-1 border"
                style={{
                  borderColor:
                    active.color === "#000000" ? "#000" : active.color,
                  color: active.color === "#000000" ? "#000" : active.color,
                }}
              >
                {active.affix}
              </span>
            </div>

            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.word}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className="block leading-none py-4"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(3.5rem, 10vw, 7rem)",
                      fontWeight: 700,
                      color:
                        active.color === "#000000" ? "#000000" : active.color,
                    }}
                  >
                    {active.word}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-end justify-between">
              <span className="text-xs text-black/40 uppercase tracking-widest">
                {current + 1} / {morphForms.length} forms
              </span>
              <div className="flex gap-1">
                {morphForms.map((f, i) => (
                  <div
                    key={i}
                    className="h-1 w-6 transition-all duration-300"
                    style={{
                      backgroundColor:
                        i === current
                          ? f.color === "#000000"
                            ? "#000"
                            : f.color
                          : "#00000020",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between p-8 md:p-12">
            <div />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-6">
                v1.0 — AI-powered morphology
              </p>
              <h1
                className="text-4xl md:text-5xl font-bold leading-tight mb-8 uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "-0.02em",
                }}
              >
                Type any
                <br />
                Indonesian
                <br />
                word.
                <br />
                <span className="text-black/20">Understand</span>
                <br />
                <span className="text-black/20">all of it.</span>
              </h1>
              <p className="text-sm text-black/50 max-w-xs leading-relaxed mb-10">
                Indonesian is agglutinative. One root word generates dozens of
                forms. Bahasa Builder maps every single one — with grammar,
                usage notes, and real example sentences.
              </p>
              <Link
                href="/dictionary"
                className="inline-block px-6 py-3 text-sm font-bold uppercase tracking-widest bg-black text-[#F2F0EB] hover:bg-black/80 transition-colors duration-100 border-2 border-black"
              >
                Try it now →
              </Link>
            </div>
            <div className="flex items-center gap-4 text-xs text-black/30 uppercase tracking-widest">
              <span>Next.js 16</span>
              <span>·</span>
              <span>MongoDB</span>
              <span>·</span>
              <span>Groq AI</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black">
        <div className="px-6 py-4 border-b border-black/20">
          <span className="text-xs uppercase tracking-widest text-black/40">
            The affix color system
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {morphForms.map((f, i) => (
            <div
              key={f.affix}
              className="px-5 py-6 border-r border-black/10 last:border-r-0 hover:bg-black/5 transition-colors duration-100"
            >
              <div
                className="w-3 h-3 mb-3"
                style={{
                  backgroundColor: f.color === "#000000" ? "#333" : f.color,
                }}
              />
              <p
                className="text-xs font-bold mb-1"
                style={{ color: f.color === "#000000" ? "#333" : f.color }}
              >
                {f.affix}
              </p>
              <p className="text-xs text-black/40">{f.word}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-black">
        <div className="px-6 py-4 border-b border-black/20">
          <span className="text-xs uppercase tracking-widest text-black/40">
            How it works
          </span>
        </div>
        <div className="grid md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.number}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-8 border-r-2 border-black last:border-r-0 flex flex-col gap-4"
            >
              <span className="text-xs text-black/20">{f.number}</span>
              <h3 className="text-sm font-bold uppercase tracking-wide">
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed text-black/50">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="grid md:grid-cols-2 border-b-2 border-black">
        <div className="p-12 border-r-2 border-black flex flex-col justify-between min-h-[300px]">
          <span className="text-xs uppercase tracking-widest text-black/40">
            Built by CodedByTravis
          </span>
          <div>
            <p className="text-xs text-black/40 uppercase tracking-widest mb-2">
              Open source
            </p>
            <p className="text-sm text-black/50 max-w-xs leading-relaxed">
              Part of a broader Indonesian language learning platform.
              Dictionary is the core feature. Sentence decomposer, spaced
              repetition, and audio coming next.
            </p>
          </div>
        </div>
        <div className="p-12 flex flex-col justify-end">
          <p
            className="text-4xl font-bold uppercase leading-tight mb-8"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Start with
            <br />
            any word.
          </p>
          <Link
            href="/dictionary"
            className="inline-block px-6 py-4 text-sm font-bold uppercase tracking-widest bg-black text-[#F2F0EB] hover:bg-black/80 transition-colors w-fit border-2 border-black"
          >
            Open Dictionary →
          </Link>
        </div>
      </section>

      <footer className="px-6 py-4 flex items-center justify-between">
        <span className="text-xs text-black/30 uppercase tracking-widest">
          Bahasa Builder — {new Date().getFullYear()}
        </span>
        <span className="text-xs text-black/30 uppercase tracking-widest">
          Kamus Bahasa Indonesia
        </span>
      </footer>
    </main>
  );
}
