import React from "react";
import { ratingColor } from "../utils/ratingColor";
import { Star } from "lucide-react";

export const RatingBadge: React.FC<{ score?: number | null }> = ({ score }) => {

  return (
    <div
      className={`flex items-center gap-1 text-xs font-bold ${ratingColor(score)}`}
    >
      <Star className="h-3 w-3" />
      <span>{score ? score.toFixed(1) : "N/A"}</span>
    </div>
  );
};
