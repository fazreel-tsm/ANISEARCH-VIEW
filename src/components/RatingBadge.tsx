import React from "react";
import { ratingColor } from "../utils/ratingColor";
import { Star } from "lucide-react";

export const RatingBadge: React.FC<{ score?: number | null }> = ({ score }) => {

  return (
    // <span
    //   className={`px-2 py-0.5 text-xs font-semibold text-white rounded-full ${ratingColor(score)}`}
    // >
    //   <Star className="h-3 w-3" />
    //   {score.toFixed(1)}
    // </span>
    <div
      className={`flex items-center gap-1 text-xs font-bold ${ratingColor(score)}`}
    >
      <Star className="h-3 w-3" />
      <span>{score ? score.toFixed(1) : "N/A"}</span>
    </div>
  );
};
