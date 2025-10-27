import axios from 'axios'

const baseURL = 'https://api.jikan.moe/v4'

export const api = axios.create({
  baseURL,
  timeout: 15000
})

export default api
