# Anime Search App Prompts (ChatGPT)

## 1. Global
- Handle anime data fetching with Redux Toolkit and API calls to Jikan API (https://docs.api.jikan.moe) - (getAnimeSearch, getAnimeFullById, getAnimeStaff, getAnimeCharacters) in a React app.
- Create a responsive header component with a dark mode toggle that follows the system theme by default, allowing the user to switch manually. Use Tailwind CSS for styling.
- Set up the app as a Progressive Web App (PWA) using Vite PWA plugin, including a web manifest, service worker with auto-update, and icons. Ensure the app is installable on both desktop and mobile, supports offline usage, and works with light/dark theme.
- Create a reusable ScrollToTop component that appears after the user scrolls down a page. Smoothly scrolls the viewport to the top when clicked. Works on all pages, supports light/dark mode styling, and is responsive.
- Create a debounced search function (250ms) for my fetchAnime.

## 2. Search Page
- Create a responsive grid layout of AnimeCard components with lazy-loaded images, Skeleton loaders for loading states, fully integrated with Redux Toolkit and the Jikan API slice for fetching anime data.
- Create a Pagination component that works with getAnimeSearch via Redux, displays a maximum of 3 middle page buttons, disables Prev/Next buttons at the start/end, and includes a jump-to-page input.

## 3. Detail Page (Overview Tab)
- Create a Stream component that displays available streaming links for an anime, opens them in a new tab, and hide missing or unavailable streams.

## 4. Character Tab
- Create a searchable grid of character cards for an anime, each showing the character's image and name, with search filtering by name only, lazy-loaded images, Skeleton loaders for loading states, and fully integrated with Redux Toolkit and the Jikan API slice for fetching characters.

## 5. Staff Tab
- Create a searchable grid of staff cards for an anime, each showing the staff member's image, name, and positions, with search filtering by name and position, lazy-loaded images, Skeleton loaders for loading states, and fully integrated with Redux Toolkit and the Jikan API slice for fetching staff.

## 6. Error Handling
- Create a full-page error boundary component for React that catches runtime errors, displays a friendly error message with an image, adapts to light/dark mode automatically, and includes a button to navigate back home.

## 7. Loading Screen
- Create a full-page animated loading component with a progress bar and a cycling character animation (image), using Tailwind CSS keyframes for the animation. The component should be reusable for any loading state.
