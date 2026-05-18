"use server";

import { config } from "@/lib/config";

// --- TypeScript Interfaces ---

export interface TeamDetails {
  id: string;
  name: string;
  shortName: string;
}

export interface PlayerStats {
  name: string;
  runs?: number;
  ballsFaced?: number;
  strikeRate?: number;
  overs?: number;
  economy?: number;
  wickets?: number;
}

export interface Match {
  id: string;
  seriesName: string;
  teamA: TeamDetails;
  teamB: TeamDetails;
  status: "live" | "upcoming" | "finished";
  date: string;
  venue: string;
  tossResult?: string;
  runsA?: string;
  wicketsA?: string;
  oversA?: string;
  runsB?: string;
  wicketsB?: string;
  oversB?: string;
  crr?: string;
  rrr?: string;
  target?: string;
  result?: string;
}

export interface MatchDetail extends Match {
  playingXI_A: string[];
  playingXI_B: string[];
  activeBatters: PlayerStats[];
  activeBowlers: PlayerStats[];
  partnershipInfo?: string;
  timeline: string[];
}

// --- RapidAPI Data Fetch Layer ---

const headers = {
  "X-RapidAPI-Key": config.rapidApiKey,
  "X-RapidAPI-Host": config.rapidApiHost,
};

async function fetchMatchList(endpoint: string): Promise<Match[]> {
  try {
    const res = await fetch(`https://${config.rapidApiHost}/matches/v1/${endpoint}`, {
      headers,
      cache: "no-store"
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    const matches: Match[] = [];

    if (data && Array.isArray(data.typeMatches)) {
      data.typeMatches.forEach((typeMatch: any) => {
        if (Array.isArray(typeMatch.seriesMatches)) {
          typeMatch.seriesMatches.forEach((seriesMatch: any) => {
            const wrapper = seriesMatch.seriesAdWrapper;
            if (wrapper && Array.isArray(wrapper.matches)) {
              wrapper.matches.forEach((matchItem: any) => {
                const info = matchItem.matchInfo;
                const score = matchItem.matchScore;
                if (!info) return;

                // STRICT FILTER FOR IPL:
                const seriesName = (info.seriesName || "").toLowerCase();
                if (!seriesName.includes("ipl") && !seriesName.includes("indian premier league")) {
                  return; // Skip non-IPL matches
                }

                const status = info.state === "Complete" ? "finished" : info.state === "Upcoming" || info.state === "Preview" ? "upcoming" : "live";
                
                let runsA, wicketsA, oversA, runsB, wicketsB, oversB;
                if (score) {
                   if (score.team1Score && score.team1Score.inngs1) {
                     runsA = String(score.team1Score.inngs1.runs ?? "");
                     wicketsA = String(score.team1Score.inngs1.wickets ?? "");
                     oversA = String(score.team1Score.inngs1.overs ?? "");
                   }
                   if (score.team2Score && score.team2Score.inngs1) {
                     runsB = String(score.team2Score.inngs1.runs ?? "");
                     wicketsB = String(score.team2Score.inngs1.wickets ?? "");
                     oversB = String(score.team2Score.inngs1.overs ?? "");
                   }
                }

                matches.push({
                  id: String(info.matchId),
                  seriesName: info.seriesName || "",
                  teamA: {
                    id: String(info.team1?.teamId || ""),
                    name: info.team1?.teamName || "",
                    shortName: info.team1?.teamSName || ""
                  },
                  teamB: {
                    id: String(info.team2?.teamId || ""),
                    name: info.team2?.teamName || "",
                    shortName: info.team2?.teamSName || ""
                  },
                  status,
                  date: info.startDate ? new Date(Number(info.startDate)).toISOString() : new Date().toISOString(),
                  venue: info.venueInfo ? `${info.venueInfo.ground}, ${info.venueInfo.city}` : "",
                  tossResult: info.status || "",
                  result: info.status || "",
                  runsA, wicketsA, oversA, runsB, wicketsB, oversB
                });
              });
            }
          });
        }
      });
    }
    return matches;
  } catch (error) {
    console.error(`RapidAPI Failure on ${endpoint}.`, error);
    return [];
  }
}

export async function getMatches(): Promise<Match[]> {
  if (!config.rapidApiKey) return [];

  const [liveMatches, upcomingMatches, recentMatches] = await Promise.all([
    fetchMatchList("live"),
    fetchMatchList("upcoming"),
    fetchMatchList("recent")
  ]);

  const allMatches = [...liveMatches, ...upcomingMatches, ...recentMatches];
  const uniqueMatches = Array.from(new Map(allMatches.map(m => [m.id, m])).values());

  return uniqueMatches;
}

export async function getMatchDetail(matchId: string): Promise<MatchDetail | null> {
  if (!config.rapidApiKey) return null;

  try {
    // Fetch Commentary and Scorecard simultaneously for super-fast real-time accurate info!
    const [commRes, scardRes] = await Promise.all([
       fetch(`https://${config.rapidApiHost}/mcenter/v1/${matchId}/comm`, {
         headers,
         cache: "no-store"
       }),
       fetch(`https://${config.rapidApiHost}/mcenter/v1/${matchId}/scard`, {
         headers,
         cache: "no-store"
       })
    ]);

    let commData: any = null;
    let scardData: any = null;

    if (commRes.ok) commData = await commRes.json();
    if (scardRes.ok) scardData = await scardRes.json();
    
    if (!commData && !scardData) {
       return null;
    }

    const activeBatters: PlayerStats[] = [];
    const activeBowlers: PlayerStats[] = [];
    
    const playingXI_A: string[] = [];
    const playingXI_B: string[] = [];
    
    // 1. Process Scorecard for Full Active Rosters & Squads
    if (scardData && Array.isArray(scardData.scoreCard)) {
       scardData.scoreCard.forEach((innings: any) => {
          if (innings.batTeamDetails && innings.batTeamDetails.batsmenData) {
             Object.values(innings.batTeamDetails.batsmenData).forEach((batter: any) => {
                if (batter.outDesc && batter.outDesc.toLowerCase() === "batting") {
                   activeBatters.push({
                      name: batter.batName,
                      runs: batter.runs,
                      ballsFaced: batter.balls,
                      strikeRate: parseFloat(batter.strikeRate || "0")
                   });
                }
             });
          }
          if (innings.bowlTeamDetails && innings.bowlTeamDetails.bowlersData) {
             Object.values(innings.bowlTeamDetails.bowlersData).forEach((bowler: any) => {
                 activeBowlers.push({
                    name: bowler.bowlName,
                    overs: parseFloat(bowler.overs || "0"),
                    wickets: bowler.wickets,
                    economy: parseFloat(bowler.economy || "0")
                 });
             });
          }
       });
    }

    // 2. Process Commentary for Ultra Real-Time Match State (CRR, RRR, Timeline, Targets)
    let crr: string | undefined = undefined;
    let rrr: string | undefined = undefined;
    let target: string | undefined = undefined;
    let partnershipInfo: string | undefined = undefined;
    let timeline: string[] = [];
    
    if (commData && commData.miniscore) {
       const ms = commData.miniscore;
       
       if (ms.crr) crr = String(ms.crr);
       if (ms.rrr) rrr = String(ms.rrr);
       
       if (ms.inningsscores && Array.isArray(ms.inningsscores.inningsscore)) {
          const currentInnings = ms.inningsscores.inningsscore[0]; // Usually the most recent
          if (currentInnings && currentInnings.target) {
              target = String(currentInnings.target);
          }
       }
       
       if (ms.partnership) partnershipInfo = ms.partnership;
       
       if (ms.curovsstats) {
          // curovsstats is usually a string like "1 0 4 . . | W"
          timeline = ms.curovsstats.split(" ").filter((s: string) => s.trim() !== "");
       }

       // If scard didn't catch the live batters/bowlers, merge them directly from the live mini-score:
       if (activeBatters.length === 0) {
          if (ms.batsmanstriker) activeBatters.push({ name: ms.batsmanstriker.name, runs: ms.batsmanstriker.runs, ballsFaced: ms.batsmanstriker.balls, strikeRate: parseFloat(ms.batsmanstriker.strkrate || "0") });
          if (ms.batsmannonstriker) activeBatters.push({ name: ms.batsmannonstriker.name, runs: ms.batsmannonstriker.runs, ballsFaced: ms.batsmannonstriker.balls, strikeRate: parseFloat(ms.batsmannonstriker.strkrate || "0") });
       }
       
       if (activeBowlers.length === 0) {
          if (ms.bowlerstriker) activeBowlers.push({ name: ms.bowlerstriker.name, overs: parseFloat(ms.bowlerstriker.overs || "0"), wickets: ms.bowlerstriker.wickets, economy: parseFloat(ms.bowlerstriker.economy || "0") });
          if (ms.bowlernonstriker) activeBowlers.push({ name: ms.bowlernonstriker.name, overs: parseFloat(ms.bowlernonstriker.overs || "0"), wickets: ms.bowlernonstriker.wickets, economy: parseFloat(ms.bowlernonstriker.economy || "0") });
       }
    }

    const matchHeader = (commData && commData.matchheaders) || (scardData && scardData.matchHeader);
    const seriesName = matchHeader?.seriesname || matchHeader?.seriesName || "";

    return {
      id: matchId,
      seriesName,
      teamA: {
        id: String(matchHeader?.team1?.id || matchHeader?.team1?.teamid || ""),
        name: matchHeader?.team1?.name || matchHeader?.team1?.teamname || "",
        shortName: matchHeader?.team1?.shortName || matchHeader?.team1?.teamsname || ""
      },
      teamB: {
        id: String(matchHeader?.team2?.id || matchHeader?.team2?.teamid || ""),
        name: matchHeader?.team2?.name || matchHeader?.team2?.teamname || "",
        shortName: matchHeader?.team2?.shortName || matchHeader?.team2?.teamsname || ""
      },
      status: matchHeader?.state === "Complete" ? "finished" : matchHeader?.state === "Upcoming" ? "upcoming" : "live",
      date: new Date().toISOString(),
      venue: "",
      tossResult: matchHeader?.status || "",
      result: matchHeader?.status || "",
      playingXI_A,
      playingXI_B,
      activeBatters,
      activeBowlers,
      crr,
      rrr,
      target,
      partnershipInfo,
      timeline
    };
  } catch (error) {
    console.error("Match Detail fetch failed.", error);
    return null;
  }
}
