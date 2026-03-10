"use client";

import { useState } from "react";
import { RootWordEntry } from "@/lib/ai/validation";
import SearchBar from "@/components/dictionary/SearchBar";
import RootCard from "@/components/dictionary/RootCard";
import FormCard from "@/components/dictionary/FormCard";
import Header from "@/components/dictionary/Header";

export default function DictionaryPage() {
  const [result, setResult] = useState<RootWordEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (word: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/dictionary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      });
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Lookup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-background"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <Header />

      <div className="px-6 py-4">
        <div className="max-w-[760px] mx-auto">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-6 py-6">
        {error && (
          <p className="text-sm font-mono text-red-600 mb-4 uppercase tracking-widest">
            {error}
          </p>
        )}

        {result && (
          <div>
            <RootCard entry={result} />
            <div className="flex flex-col mt-2">
              {result.forms
                .filter((form) => form.affix !== "none")
                .map((form, i) => (
                  <FormCard key={i} form={form} />
                ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
