# CricketMind - Fan Arena Dashboard

CricketMind is a highly-polished, real-time sports dashboard and second-screen companion application designed for cricket enthusiasts. Formally presented in association with Google Developer Groups (GDG), this application integrates live Cricbuzz data streams into a sleek, minimal, and premium interface built with Next.js, TypeScript, TailwindCSS, and shadcn/ui.

---

## Key Features

- **Live Match Insights:** Real-time score summaries, wickets, overs, current run rates (CRR), required run rates (RRR), targets, active partnerships, and over-by-over ball timelines.
- **Completed Match Scorecards:** Interactive scorecards detailing batsmen runs, balls, 4s, 6s, strike rates, dismissals, bowlers overs, maidens, runs conceded, wickets, and economy rates.
- **Strict IPL Filtering:** Prioritizes Indian Premier League (IPL) fixtures with real, official high-resolution team logo resolution, with graceful fallbacks to international fixtures when no IPL matches are active.
- **Sequential API Delay Pipeline:** Tailored 1.1-second sequential fetch delay engine to strictly respect the 1 Request Per Second (RPS) rate limits of the Cricbuzz Cricket API BASIC subscription tier, preventing "Too Many Requests" errors.
- **Conservative Polling Engine:** Background polling interval configured to 90 seconds (90000ms) to prevent monthly quota exhaustion, accompanied by an instant "Sync Now" manual sync action for on-demand refreshes.
- **Minimal, Professional UI:** Sleek, accessible design complying with shadcn/ui design tokens, without gratuitous animations or unnecessary elements.

---

## Workspace Structure

```text
CricketMind/
├── apps/
│   ├── web/                     # Next.js 16 Application (Main App Console)
│   │   ├── app/                 # Next.js Page & Routing Layer
│   │   ├── components/          # Reusable UI & shadcn Primitives
│   │   ├── public/              # Static Assets (Team Logos, GDG Branding)
│   │   ├── server/              # Server Actions & RapidAPI Scraping Controllers
│   │   └── lib/                 # Shared Configs & Variables
│   └── docs/                    # Technical documentation static site
├── packages/
│   ├── typescript-config/       # Shared TypeScript strict configuration files
│   ├── eslint-config/           # Monorepo linting configurations
│   └── ui/                      # Shared design system components
├── LICENSE                      # MIT Open Source License
└── README.md                    # System documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- pnpm (v8.x or later)
- RapidAPI Account

---

### Step-by-Step API Setup Guide

This application pulls data in real-time from the **Cricbuzz Cricket API** hosted on RapidAPI. To obtain your API credentials:

1. **Sign Up:** Go to [RapidAPI](https://rapidapi.com/) and create a free account.
2. **Subscribe:** Navigate to the [Cricbuzz Cricket API](https://rapidapi.com/cricketapilive/api/cricbuzz-cricket) page.
3. **Choose Plan:** Select the **BASIC** plan (Free, 1 Request Per Second limit).
4. **Get Credentials:** Go to the API Console or dashboard for your application. Copy your custom API credentials:
   - `x-rapidapi-key` (Your unique RapidAPI developer token)
   - `x-rapidapi-host` (The API gateway host: `cricbuzz-cricket.p.rapidapi.com`)

---

### Local Installation

1. **Clone the Repository:**
   ```bash
   cd CricketMind
   ```

2. **Install Dependencies:**
   Install the monorepo dependencies using `pnpm`:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create an `.env.local` configuration file inside `apps/web/`:
   ```bash
   touch apps/web/.env.local
   ```
   Add the following environment variables using your custom RapidAPI credentials:
   ```env
   RAPIDAPI_KEY=your_rapidapi_key_here
   RAPIDAPI_HOST=cricbuzz-cricket.p.rapidapi.com
   ```

4. **Launch Development Server:**
   Start all applications inside the monorepo concurrently:
   ```bash
   pnpm dev
   ```
   Alternatively, run the web application directly:
   ```bash
   pnpm --filter=web dev
   ```

5. **Access the App:**
   Open [http://localhost:3000/arena](http://localhost:3000/arena) in your web browser.

---

## Development Guidelines

All updates must strictly adhere to the following coding guidelines:

- **TypeScript Strict Mode:** Ensure all variables are fully typed. Implicit `any` is strictly prohibited.
- **Surgical Edits:** Only touch directories and files containing features you are explicitly modifying.
- **Performance First:** Keep cache and fetch actions optimized. Server Actions are implemented with `cache: "no-store"` to guarantee live data updates.
- **Zero Mock Fallbacks:** Do not inject fake or simulated scores when the API returns real-time data. Provide a fallback to alternative matches instead.

---

## Watermark & GDPR Compliance

This project is officially presented in association with Google Developer Groups (GDG). The GDG watermark is symmetrically integrated at the bottom of the arena dashboard at:
`/public/GDG.png`

No user-sensitive cookies or trackers are embedded.

---

## License

This project is licensed under the terms of the MIT License. See [LICENSE](LICENSE) for full details.
