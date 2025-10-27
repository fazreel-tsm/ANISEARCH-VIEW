import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Clapperboard } from "lucide-react";

export default function Header() {
  return (
    <header className="
      sticky top-0 z-30 bg-bg/80 backdrop-blur-md 
      w-full p-4 flex items-center justify-between 
      border-b border-border text-[#A333FF] 
      transition-all
    ">
      <Link to="/" className="flex items-center gap-2">
        <Clapperboard className="h-8 w-8 text-primary" />
        <span className="font-headline text-xl font-bold text-primary">
          AniSearch
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
