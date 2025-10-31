import React, { useState } from "react";
import { ImageIcon } from "lucide-react";

function CharacterCard({ c }: { c: any }) {
  const [loaded, setLoaded] = useState(false);
  const imgSrc =
    c.character.images?.webp?.image_url || c.character.images?.jpg?.image_url;

  return (
    <div className="bg-tab-hover rounded-xl p-3 flex flex-col items-center relative">
      {/* Image container (fixed size) */}
      <div className="relative w-24 h-24 mb-2">
        {/* Placeholder (same size as image) */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
            <ImageIcon className="w-10 h-10 text-gray-400 dark:text-gray-500 animate-pulse" />
          </div>
        )}

        {/* Actual Image */}
        <img
          src={imgSrc}
          alt={c.character.name}
          className={`w-full h-full rounded-lg object-cover shadow-md transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Character Info (always visible) */}
      <p className="font-medium text-sm text-center">{c.character.name}</p>
      <p className="text-xs text-muted-foreground">{c.role}</p>
    </div>
  );
}

export default CharacterCard;
