import { Search, X } from "lucide-react";

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md mx-auto sm:mx-0">
      
      {/* 🔍 Search Icon */}
      <Search
        className="
          absolute left-4 top-1/2 -translate-y-1/2
          w-5 h-5 text-gray-400
          pointer-events-none
        "
      />

      {/* 🔎 Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search songs, artists..."
        className="
          w-full
          h-12 sm:h-11
          pl-12 pr-10
          rounded-full
          bg-gray-800
          border border-gray-700
          focus:border-blue-500
          focus:ring-1 focus:ring-blue-500/20
          outline-none
          transition-all
          text-sm sm:text-base
          text-white
          placeholder:text-gray-400
        "
      />

      {/* ❌ Clear Button */}
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-gray-400
            hover:text-white
            transition-colors
          "
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}