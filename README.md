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

## Tech Stack

- ⚡ **Vite** – blazing fast dev environment  
- ⚛️ **React 18 + TypeScript** – component-based UI  
- 🧠 **Redux Toolkit** – state management (anime data, tabs, etc.)  
- 🎨 **Tailwind CSS** – responsive styling  
- 🧩 **Lucide Icons** – clean icon set  
- 🌐 **Jikan API** – MyAnimeList REST API  
- 📱 **PWA Support** – installable on desktop & mobile  

## Features

### 🧩 System
- ✅ Progressive Web App (PWA)
- 🌙 Light / Dark mode with automatic theme detection
- ⚠️ Error boundary & error page
- 🚫 404 Not Found page

### 🔍 Search Page
- 🔥 Recommended list: Most popular, top rated
- 🔎 Search anime by keyword
- 📄 Pagination with smooth transitions
- ⏩ Jump to specific page

### 📘 Detail Page
- 🎬 Embedded trailer (if available)
- 🌐 External streaming link (opens in new tab)
- 📄 Overview tab
- 👤 Character tab (with search)
- 🧑‍💼 Staff tab (with search)