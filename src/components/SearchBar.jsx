import { Search, X } from "lucide-react";

export function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-wrap">
      <span className="search-icon">
        <Search size={18} />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search songs, artists..."
        className="search-input"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="search-clear-btn"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
