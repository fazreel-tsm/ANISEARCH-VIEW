import React, { useState } from "react";
import { ImageIcon } from "lucide-react";

function StaffCard({ s }: { s: any }) {
  const [loaded, setLoaded] = useState(false);
  const imgSrc =
    s.person?.images?.webp?.image_url || s.person?.images?.jpg?.image_url;

  return (
    <div className="bg-tab-hover rounded-xl p-3 flex items-center gap-3 relative overflow-hidden">
      {/* Image container */}
      <div className="relative w-16 h-16 flex-shrink-0">
        {/* Placeholder */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md">
            <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500 animate-pulse" />
          </div>
        )}

        {/* Actual Image */}
        <img
          src={imgSrc}
          alt={s.person.name}
          className={`w-full h-full rounded-md object-cover shadow transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Info (always visible) */}
      <div>
        <p className="font-medium">{s.person.name}</p>
        <p className="text-xs text-muted-foreground">
          {s.positions?.join(", ")}
        </p>
      </div>
    </div>
  );
}

export default StaffCard;
