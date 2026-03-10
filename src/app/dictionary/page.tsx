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
    } catch (err) {
      setError("Failed to look up word. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0D0D14] transition-colors">
      <Header />
      <div className="max-w-[760px] mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {result && (
          <div>
            <RootCard entry={result} />
            <div className="flex flex-col gap-2 mt-2">
              {result.forms
                .filter((form) => form.affix !== "none")
                .map((form, i) => (
                  <FormCard key={i} form={form} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
