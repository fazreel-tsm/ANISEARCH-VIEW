import React from "react";
import { Link } from "react-router-dom";
import { RatingBadge } from "./RatingBadge";
import { createSlug } from "../utils/createSlug";

interface Anime {
  mal_id: number;
  title: string;
  year?: number;
  score?: number;
  aired?: { from?: string };
  images: {
    jpg: { large_image_url?: string };
    webp: { large_image_url?: string };
  };
}

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const slug = createSlug(anime.title);
  const image = anime.images.webp?.large_image_url || anime.images.jpg?.large_image_url;
  const year = anime.year || (anime.aired?.from && new Date(anime.aired.from).getFullYear() || null);

  return (
    <Link
      to={`/anime/${anime.mal_id}-${slug}`}
      className="group block rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={image}
          alt={anime.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3
          className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100"
          title={anime.title}
        >
          {anime.title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {year}
          </p>
          {<RatingBadge score={anime.score} />}
        </div>
      </div>
    </Link>
  );
};
