import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Header from "../components/Header";
import SkeletonCard from "../components/SkeletonCard";
import Pagination from "../components/Pagination";
import { setQuery, setPage, fetchAnime } from "../store/animeSlice";
import { useDebouncedEffect } from "../hooks/useDebouncedSearch";
import SearchInput from "../components/ui/SearchInput";
import { AnimeCard } from "../components/AnimeCard";
import { RecommendedType, searchAnime } from "../api/jikan";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import { TabButton } from "../components/ui/TabButton";
import { FrostedBackground } from "../components/FrostedBackground";

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { query, page, results, loading, error, pagination } = useAppSelector(
    (s) => s.anime
  );

  // Recommended anime state
  const [recommendedType, setRecommendedType] =
    useState<RecommendedType>("popular");

  const prevQuery = useRef(query);

  // Fetch recommended anime when query empty or type changes
  useEffect(() => {
    if (!query) {
      dispatch(
        fetchAnime({ q: "", page: page || 1, order_by: recommendedType })
      );
    }
  }, [query, recommendedType, dispatch, page]);

  // search when query or page changes with debounce
  useDebouncedEffect(
    (signal) => {
      if (query) {
        const isNewQuery = prevQuery.current !== query;
        if(isNewQuery) dispatch(setPage(1))

        dispatch(fetchAnime({ q: query, page: isNewQuery ? 1 : page, signal }));

        prevQuery.current = query;
      }
    },
    [query, page],
    250
  );

  return (
    <div className="relative min-h-screen font-headline">
      <Header />
      <FrostedBackground />
      <main className="relative p-4 max-w-6xl mx-auto">
        {/* Search input */}
        <div className="flex justify-center">
          <div className="w-full max-w-xs transition-all duration-200 focus-within:max-w-md">
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
              <TabButton 
                label={`Most ${type.charAt(0).toUpperCase() + type.slice(1)}`} 
                active={recommendedType === type}
                onClick={() => setRecommendedType(type as RecommendedType)}
              />
            ))}
          </div>
        )}

        {/* {error && <div className="text-red-600">Error: {error}</div>} */}

        {/* Anime Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
          {loading &&
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}

          {!loading &&
            results.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}

          {!loading && results.length === 0 && (
            <div className="col-span-full p-6 text-center text-gray-500">
              No results. Try a different keyword.
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

      <ScrollToTopButton />
    </div>
  );
}
