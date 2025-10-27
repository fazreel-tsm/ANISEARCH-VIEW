import React from "react";

export default function SkeletonAnimeCard() {
  return (
    <div className="animate-pulse group block rounded-xl overflow-hidden shadow-md bg-gray-200 dark:bg-gray-700 transition-all duration-300">
      {/* Image placeholder */}
      <div className="relative aspect-[2/3] bg-gray-300 dark:bg-gray-600" />

      {/* Text placeholder */}
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          <div className="h-5 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
}
