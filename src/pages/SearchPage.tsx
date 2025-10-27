import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Header from "../components/Header";
import SkeletonCard from "../components/SkeletonCard";
import Pagination from "../components/Pagination";
import { setQuery, setPage, fetchAnime } from "../store/animeSlice";
import { useDebouncedEffect } from "../hooks/useDebouncedSearch";
import SearchInput from "../components/SearchInput";
import { AnimeCard } from "../components/AnimeCard";
import { RecommendedType, searchAnime } from "../api/jikan";

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { query, page, results, loading, error, pagination } = useAppSelector(
    (s) => s.anime
  );

  // Recommended anime state
  const [recommendedType, setRecommendedType] =
    useState<RecommendedType>("rated");
  const [recommendedResults, setRecommendedResults] = useState<any[]>([]);

  // Fetch recommended anime when query empty or type changes
  useEffect(() => {
    if (!query) {
      const fetchRecommended = async () => {
        
        const data = await searchAnime("", 1, 16, undefined, recommendedType);
        setRecommendedResults(data.data);
      };
      fetchRecommended();
    }
  }, [query, recommendedType]);

  // search when query or page changes with debounce
  useDebouncedEffect(
    (signal) => {
      if (query) {
        dispatch(fetchAnime({ q: query, page, signal }));
      }
    },
    [query, page],
    250
  );

  return (
    <div className="min-h-screen font-headline">
      <Header />
      <main className="relative p-4 max-w-6xl mx-auto">
        {/* Frosted background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="w-full h-full bg-bg/30 backdrop-blur-[200px] rounded-xl shadow-inner" />
        </div>
        {/* Search input */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl sm:max-w-xl lg:max-w-2xl transition-all duration-200 focus-within:max-w-3xl">
            <SearchInput
              value={query}
              onChange={(val) => dispatch(setQuery(val))}
              placeholder="Search anime..."
            />
          </div>
        </div>

        {/* Recommended type buttons */}
        {!query && (
          <div className="flex justify-center gap-4 mb-4">
            {["popular", "rated"].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-full font-semibold ${
                  recommendedType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
                onClick={() => setRecommendedType(type as RecommendedType)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* {error && <div className="text-red-600">Error: {error}</div>} */}

        {/* Anime Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
          {loading &&
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}

          {/* Show recommended anime if query empty */}
          {!query &&
            recommendedResults.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}

          {/* Show search results if query */}
          {query &&
            results.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}

          {/* No results */}
          {!loading && query && results.length === 0 && (
            <div className="col-span-full p-6 text-center text-gray-500">
              No results. Try a different query.
            </div>
          )}
        </div>

        <div className="flex justify-center">
          {pagination && (
            <Pagination
              current={pagination.current_page}
              last={pagination.last_visible_page}
              onPage={(p) => dispatch(setPage(p))}
            />
          )}
        </div>
      </main>
    </div>
  );
}
