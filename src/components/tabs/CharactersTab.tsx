import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAnimeCharacters } from "../../store/animeDetailSlice";
import SearchInput from "../ui/SearchInput";
import CharacterCard from "../CharacterCard";

export default function CharactersTab({ animeId }: { animeId: number }) {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((s) => s.animeDetail.characters[animeId]);
  const loading = useAppSelector((s) => s.animeDetail.loading);

  useEffect(() => {
    if (!characters) {
      dispatch(fetchAnimeCharacters(animeId));
    }
  }, [animeId, dispatch]);

  // Filtered characters
  const [search, setSearch] = useState("");
  const filteredCharacters = useMemo(() => {
    if (!characters) return [];
    const query = search.toLowerCase();
    return characters.filter((c) => {
      const name = c.character.name?.toLowerCase() || "";
      return name.includes(query);
    });
  }, [characters, search]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-tab-hover rounded-xl h-40" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Search Input */}
      <div className="flex justify-center">
        <div className="w-full max-w-xs transition-all duration-200 focus-within:max-w-sm">
          <SearchInput
            value={search}
            onChange={(val) => setSearch(val)}
            placeholder="Search character..."
          />
        </div>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredCharacters.length === 0 ? (
          <p className="col-span-full text-center text-sm mt-10">
            No character found
          </p>
        ) : (
          filteredCharacters?.map((c) => (
            <CharacterCard key={c.character.mal_id} c={c} />
          ))
        )}
      </div>
    </div>
  );
}

