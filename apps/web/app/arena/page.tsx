import type { Metadata } from "next";
import { getMatches } from "@/server/cricket";
import { ArenaDashboardClient } from "@/components/arena-dashboard-client";

export const metadata: Metadata = {
  title: "CricketMind Fan Arena | Live Second-Screen Play",
  description: "Join the active CricketMind Fan Arena. Participate in real-time second-screen predictions and match events.",
};

// Force dynamic rendering to always query fresh live API inputs in production
export const dynamic = "force-dynamic";

export default async function ArenaPage() {
  // Query live IPL fixtures & status from server layer
  const matches = await getMatches();

  return <ArenaDashboardClient initialMatches={matches} />;
}
