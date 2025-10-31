import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAnimeStaff } from "../../store/animeDetailSlice";
import SearchInput from "../ui/SearchInput";
import StaffCard from "../StaffCard";

export default function StaffTab({ animeId }: { animeId: number }) {
  const dispatch = useAppDispatch();
  const staff = useAppSelector((s) => s.animeDetail.staff[animeId]);
  const loading = useAppSelector((s) => s.animeDetail.loading);
  
  useEffect(() => {
    if (!staff) {
      dispatch(fetchAnimeStaff(animeId));
    }
  }, [animeId, dispatch]);
  
  // Filtered staff
  const [search, setSearch] = useState("");
  const filteredStaff = useMemo(() => {
    if (!staff) return [];
    const query = search.toLowerCase();
    return staff.filter((s) => {
      const name = s.person?.name?.toLowerCase() || "";
      const positions = (s.positions || []).join(", ").toLowerCase();
      return name.includes(query) || positions.includes(query);
    });
  }, [staff, search]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-tab-hover rounded-xl h-28" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Search Input */}
      <div className="flex justify-center">
        <div className="w-full max-w-xs transition-all duration-200 focus-within:max-w-md">
          <SearchInput
            value={search}
            onChange={(val) => setSearch(val)}
            placeholder="Search staff or position..."
          />
        </div>
      </div>

      {/* Staff List */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredStaff.length === 0 ? (
          <p className="col-span-full text-center text-sm mt-10">
            No staff found
          </p>
        ) : (
          filteredStaff?.map((s) => ( <StaffCard key={s.person.mal_id} s={s} /> ))
        )}
      </div>
    </div>
  );
}
