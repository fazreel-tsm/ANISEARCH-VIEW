import { api } from './axios'
import type { AnimeSearchResponse } from '../types'

export type RecommendedType ='popular' | 'rated'

const recommendedMap: Record<RecommendedType, { order_by: string; sort: 'asc' | 'desc' }> = {
  popular: { order_by: 'popularity', sort: 'desc' },
  rated: { order_by: 'score', sort: 'desc' }
}

export const searchAnime = async (
  q: string,
  page = 1,
  limit = 16,
  signal?: AbortSignal,
  recommended?: RecommendedType,
) => {
  const params: Record<string, string | number | boolean> = {
    sfw: true,
    page,
    limit
  }

  if (q) {
    params.q = encodeURIComponent(q)
    // params.order_by = 'score'
    // params.sort = 'desc'
  } else if (recommended) {
    params.order_by = recommendedMap[recommended].order_by
    params.sort = recommendedMap[recommended].sort
  }
  
  const res = await api.get<AnimeSearchResponse>('/anime', {
    params,
    signal
  })
  return res.data
}

export const getAnimeById = async (id: number) => {
  const res = await api.get(`/anime/${id}`)
  return res.data
}
