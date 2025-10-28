import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
  className,
}: SearchInputProps) {
  return (
    <div className="relative mb-6 w-full">
      {/* Search Icon */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 pointer-events-none" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className={`
          font-normal border-0 ring-0 font-headline text-sm
          bg-bg-input rounded-full px-12 py-2 w-full
          placeholder:text-placeholder
          [background-image:linear-gradient(0deg,rgba(72,174,222,0.15)_0%,rgba(56,148,221,0)_50%,rgba(163,51,255,0.15)_100%)]
          shadow-[0_0_2px_#2574DD]
          transition-all duration-150 ease-in-out
          outline-none focus:outline-none focus-visible:outline-none
          hover:shadow-[0_0_5px_theme(colors.glow)]
          focus:shadow-[0_0_8px_theme(colors.glow)]
          ${className}
        `}
      />
    </div>
  );
}
