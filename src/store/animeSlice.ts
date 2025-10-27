import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RecommendedType, searchAnime } from '../api/jikan'
import type { AnimeCardAPI } from '../types'

export interface AnimeState {
  query: string
  page: number
  results: AnimeCardAPI[]
  loading: boolean
  error?: string | null
  pagination?: any
}

const initialState: AnimeState = {
  query: '',
  page: 1,
  results: [],
  loading: false,
  error: null
}

export const fetchAnime = createAsyncThunk(
  'anime/fetch',
  async (
    { q, page, order_by, signal }: { q: string; page: number; order_by?: string; signal?: AbortSignal },
    thunkAPI
  ) => {
    const resp = await searchAnime(q, page, 12, signal, order_by as RecommendedType)
    return resp
  }
)

const slice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnime.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAnime.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(fetchAnime.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch'
      })
  }
})

export const { setQuery, setPage } = slice.actions
export default slice.reducer
