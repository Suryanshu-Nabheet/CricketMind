# CricketMind - Web Application Console

This directory contains the main Next.js Next 16 web application for **CricketMind**, a premium real-time sports dashboard and second-screen companion, presented in association with Google Developer Groups (GDG).

---

## Getting Started

1. **Configure Environment:**
   Create an `.env.local` file in this directory and configure your RapidAPI keys:
   ```env
   RAPIDAPI_KEY=your_rapidapi_key_here
   RAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com
   ```
   *For details on obtaining a key, consult the master [README.md](../../README.md) at the root.*

2. **Run Development Server:**
   From the repository root, execute:
   ```bash
   pnpm --filter=web dev
   ```
   Or run directly inside this folder:
   ```bash
   pnpm dev
   ```

3. **Access Application:**
   Open [http://localhost:3000/arena](http://localhost:3000/arena).

---

## Key Modules

- **`app/`**: App router layouts, page components, and viewport configurations.
- **`components/`**: UI building blocks styled using TailwindCSS and shadcn/ui primitives.
- **`server/`**: Server-side controllers and data fetchers (`cricket.ts`) responsible for fetching and parsing the Cricbuzz live feed sequentially.
- **`public/logos`**: Folder containing the high-resolution logos for all official IPL teams.
- **`public/GDG.png`**: Symmetrical watermark banner logo presented in association with Google Developer Groups.

---

## Technical Considerations

- **1 RPS Limit:** The backend sequentially executes fetches with a 1.1s delay to comply with the 1 RPS limit of standard RapidAPI tiers.
- **90s Cache Lifetime:** Background poll updates execute every 90 seconds to prevent rapid monthly quota exhaustion.
