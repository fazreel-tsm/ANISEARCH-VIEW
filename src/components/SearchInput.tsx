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
          font-normal border border-0 ring-0 font-headline
          bg-transparent rounded-full px-12 py-2 w-full
          [background-image:linear-gradient(0deg,rgba(72,174,222,0.1)_0%,rgba(56,148,221,0)_50%,rgba(163,51,255,0.1)_100%)]
          shadow-[0_0_3.5px_#2574DD]
          transition-all duration-150 ease-in-out
          outline-none focus:outline-none focus-visible:outline-none
          hover:shadow-[0_0_6px_#2574DD]
          focus:shadow-[0_0_9px_#2574DD]
          ${className}
        `}
      />
    </div>
  );
}
