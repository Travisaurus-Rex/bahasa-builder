"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (word: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <div className="flex" style={{ border: "2px solid var(--border-strong)" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Type any Indonesian word..."
        disabled={loading}
        className="flex-1 px-4 py-4 text-base outline-none bg-background text-foreground placeholder:text-muted-foreground disabled:opacity-50"
        style={{
          fontFamily: "var(--font-mono)",
          borderRight: "2px solid var(--border-strong)",
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !input.trim()}
        className="px-8 py-4 text-sm font-bold uppercase tracking-widest bg-foreground text-background hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
}
