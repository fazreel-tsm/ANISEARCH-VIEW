# Anime Search App

Vite + React 18 + TypeScript SPA using Jikan API (MyAnimeList).

## Quickstart

1. Install dependencies (use npm):

```bash
npm install
```

2. Start dev server (runs on port 4000):

```bash
npm run dev
```

3. Open http://localhost:4000

## Notes
- API base: `VITE_API_BASE` in .env (defaults to https://api.jikan.moe/v4)
- Debounce is set to 250ms and uses AbortController to cancel in-flight requests.
- Dates are converted to Asia/Kuala_Lumpur (DD/MM/YYYY) format.
