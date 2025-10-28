import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RatingBadge } from "./RatingBadge";
import { createSlug } from "../utils/createSlug";
import { Image as ImageIcon } from "lucide-react";

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
  const [loaded, setLoaded] = useState(false);

  const slug = createSlug(anime.title);
  const image =
    anime.images.webp?.large_image_url || anime.images.jpg?.large_image_url;
  const year =
    anime.year ||
    (anime.aired?.from && new Date(anime.aired.from).getFullYear()) ||
    null;

  return (
    <Link
      to={`/anime/${anime.mal_id}-${slug}`}
      className="group block rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <ImageIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        <img
          src={image}
          alt={anime.title}
          className={`object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
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
          <p className="text-xs text-gray-500 dark:text-gray-400">{year}</p>
          {<RatingBadge score={anime.score} />}
        </div>
      </div>
    </Link>
  );
};
