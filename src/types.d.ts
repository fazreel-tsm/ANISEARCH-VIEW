export interface AnimeCardAPI {
  mal_id: number
  url: string
  title: string
  title_english?: string
  title_japanese?: string
  images: any
  type: string
  score?: number
  aired?: any
  year?: number
}

export interface AnimeSearchResponse {
  data: AnimeCardAPI[]
  pagination: any
}
