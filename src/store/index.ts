import { configureStore } from '@reduxjs/toolkit'
import animeReducer from './animeSlice'
import animeDetailReducer from './animeDetailSlice'

export const store = configureStore({
  reducer: {
    anime: animeReducer,
    animeDetail: animeDetailReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
