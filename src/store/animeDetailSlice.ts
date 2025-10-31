import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAnimeById } from "../api/jikan";

interface AnimeDetailState {
  details: Record<number, any>;
  characters: Record<number, any[]>;
  staff: Record<number, any[]>;
  loading: boolean;
  error?: string | null;
}

const initialState: AnimeDetailState = {
  details: {},
  characters: {},
  staff: {},
  loading: false,
  error: null,
};

// fetch detail full
export const fetchAnimeDetail = createAsyncThunk(
  "animeDetail/fetch",
  async (id: number) => {
    const res = await getAnimeById(id);
    return res.data; // your jikan.ts returns { data: { ... } }
  }
);

// fetch characters
export const fetchAnimeCharacters = createAsyncThunk(
  "animeDetail/fetchCharacters",
  async (id: number) => {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
    const data = await res.json();
    return { id, data: data.data || [] };
  }
);

// fetch staff
export const fetchAnimeStaff = createAsyncThunk(
  "animeDetail/fetchStaff",
  async (id: number) => {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/staff`);
    const data = await res.json();
    return { id, data: data.data || [] };
  }
);

const animeDetailSlice = createSlice({
  name: "animeDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // detail full
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.details[action.payload.mal_id] = action.payload;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch anime detail";
      })

      // characters
      .addCase(fetchAnimeCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimeCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters[action.payload.id] = action.payload.data;
      })
      .addCase(fetchAnimeCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch characters";
      })

      // staff
      .addCase(fetchAnimeStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimeStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff[action.payload.id] = action.payload.data;
      })
      .addCase(fetchAnimeStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch staff";
      });
  },
});

export default animeDetailSlice.reducer;
