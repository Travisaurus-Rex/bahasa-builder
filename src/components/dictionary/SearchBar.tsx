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
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Type any Indonesian word..."
        disabled={loading}
        className="flex-1 px-4 py-3 rounded-xl text-base outline-none transition-colors
          bg-white dark:bg-[#13131f]
          border border-gray-200 dark:border-white/10
          text-gray-800 dark:text-white
          placeholder-gray-400 dark:placeholder-white/30
          focus:border-purple-400 dark:focus:border-purple-500
          disabled:opacity-50"
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !input.trim()}
        className="px-6 py-3 rounded-xl font-medium text-sm transition-colors
          bg-purple-600 hover:bg-purple-700
          text-white
          disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
}
