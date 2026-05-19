"use server";

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
  fours?: number;
  sixes?: number;
  outDec?: string;
  overs?: number;
  maidens?: number;
  economy?: number;
  wickets?: number;
  runsConceded?: number;
}

export interface InningsScorecard {
  inningsId: number;
  batTeamName: string;
  runs: string;
  wickets: string;
  overs: string;
  batsmen: PlayerStats[];
  bowlers: PlayerStats[];
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
  isIPL?: boolean;
}

export interface MatchDetail extends Match {
  playingXI_A: string[];
  playingXI_B: string[];
  activeBatters: PlayerStats[];
  activeBowlers: PlayerStats[];
  partnershipInfo?: string;
  timeline: string[];
  scorecard?: InningsScorecard[];

  // New premium fields for ultimate match summary depth
  tossWinnerName?: string;
  tossDecision?: string;
  playerOfTheMatch?: string;
  umpires?: string;
  thirdUmpire?: string;
  referee?: string;
  venueGround?: string;
  venueCity?: string;
  venueCountry?: string;
  timezone?: string;
  matchType?: string;
  statusDescription?: string;
}

// --- RapidAPI Data Fetch Layer ---

function getRequestHeaders() {
  const key = process.env.RAPIDAPI_KEY || process.env.RAPID_API_KEY || "";
  const host = process.env.RAPIDAPI_HOST || process.env.RAPID_API_HOST || "cricbuzz-cricket.p.rapidapi.com";

  if (!key) {
    console.error("CRITICAL ERROR: 'RAPIDAPI_KEY' (or 'RAPID_API_KEY') is not set in environment variables! Please configure it in your Google Cloud Run variables.");
  }

  return {
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": host,
    },
    host,
  };
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchMatchList(endpoint: string): Promise<Match[]> {
  const { headers, host } = getRequestHeaders();
  try {
    const res = await fetch(`https://${host}/matches/v1/${endpoint}`, {
      headers,
      cache: "no-store"
    });
    
    if (!res.ok) {
      const errText = await res.text();
      console.error(`RapidAPI Error on ${endpoint}: ${res.status}`, errText);
      return [];
    }
    
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

                const seriesName = (info.seriesName || "").toLowerCase();
                const isIPL = seriesName.includes("ipl") || seriesName.includes("indian premier league");
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
                  runsA, wicketsA, oversA, runsB, wicketsB, oversB,
                  isIPL
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
  const { headers } = getRequestHeaders();
  if (!headers["X-RapidAPI-Key"]) return [];

  const liveMatches = await fetchMatchList("live");
  await delay(1100);
  const upcomingMatches = await fetchMatchList("upcoming");
  await delay(1100);
  const recentMatches = await fetchMatchList("recent");

  const allMatches = [...liveMatches, ...upcomingMatches, ...recentMatches];
  const uniqueMatches = Array.from(new Map(allMatches.map(m => [m.id, m])).values());

  const iplMatches = uniqueMatches.filter(m => m.isIPL);
  if (iplMatches.length > 0) {
    return iplMatches;
  }

  return uniqueMatches;
}

export async function getMatchDetail(matchId: string): Promise<MatchDetail | null> {
  const { headers, host } = getRequestHeaders();
  if (!headers["X-RapidAPI-Key"]) return null;

  try {
    const commRes = await fetch(`https://${host}/mcenter/v1/${matchId}/comm`, {
      headers,
      cache: "no-store"
    });
    
    await delay(1100);
    
    const scardRes = await fetch(`https://${host}/mcenter/v1/${matchId}/scard`, {
      headers,
      cache: "no-store"
    });

    await delay(1100);

    let hscardData: any = null;
    try {
      const hscardRes = await fetch(`https://${host}/mcenter/v1/${matchId}/hscard`, {
        headers,
        cache: "no-store"
      });
      if (hscardRes.ok) {
        hscardData = await hscardRes.json();
      }
    } catch (e) {
      console.warn("hscard fetch failed, falling back to commentary/scorecard headers", e);
    }

    let commData: any = null;
    let scardData: any = null;

    if (commRes.ok) commData = await commRes.json();
    if (scardRes.ok) scardData = await scardRes.json();
    
    if (!commData && !scardData && !hscardData) {
       return null;
    }

    const activeBatters: PlayerStats[] = [];
    const activeBowlers: PlayerStats[] = [];
    const fullScorecard: InningsScorecard[] = [];
    
    const playingXI_A: string[] = [];
    const playingXI_B: string[] = [];

    // Parse squads (playing XIs)
    const team1Squad = scardData?.matchHeader?.team1?.players || hscardData?.matchHeader?.team1?.players || [];
    const team2Squad = scardData?.matchHeader?.team2?.players || hscardData?.matchHeader?.team2?.players || [];
    
    if (Array.isArray(team1Squad)) {
       team1Squad.forEach((p: any) => playingXI_A.push(p.name || p.fullName || ""));
    }
    if (Array.isArray(team2Squad)) {
       team2Squad.forEach((p: any) => playingXI_B.push(p.name || p.fullName || ""));
    }
    
    // Parse complete scorecard & squads (supports Cricbuzz real `/scard` schema)
    const rawScorecard = (scardData && (scardData.scorecard || scardData.scoreCard)) || [];
    if (Array.isArray(rawScorecard)) {
       rawScorecard.forEach((innings: any) => {
          const batsmenList: PlayerStats[] = [];
          const bowlersList: PlayerStats[] = [];
          
          if (Array.isArray(innings.batsman)) {
             innings.batsman.forEach((b: any) => {
                const p: PlayerStats = {
                   name: b.name || b.nickname || "",
                   runs: b.runs,
                   ballsFaced: b.balls,
                   fours: b.fours,
                   sixes: b.sixes,
                   outDec: b.outdec || "",
                   strikeRate: parseFloat(b.strkrate || "0")
                };
                batsmenList.push(p);
                
                // Track active batters if live
                const isBatting = b.outdec && b.outdec.toLowerCase().includes("batting");
                if (isBatting) {
                   activeBatters.push(p);
                }
             });
          }
          
          if (Array.isArray(innings.bowler)) {
             innings.bowler.forEach((bw: any) => {
                const p: PlayerStats = {
                   name: bw.name || bw.nickname || "",
                   overs: parseFloat(bw.overs || "0"),
                   maidens: bw.maidens,
                   runsConceded: bw.runs,
                   wickets: bw.wickets,
                   economy: parseFloat(bw.economy || "0")
                };
                bowlersList.push(p);
             });
          }
          
          fullScorecard.push({
             inningsId: innings.inningsid || 1,
             batTeamName: innings.batteamname || "",
             runs: String(innings.score ?? "0"),
             wickets: String(innings.wickets ?? "0"),
             overs: String(innings.overs ?? "0"),
             batsmen: batsmenList,
             bowlers: bowlersList
          });
       });
    }

    // 2. Process Commentary for Live Mini-Score fallback details
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
          const currentInnings = ms.inningsscores.inningsscore[0];
          if (currentInnings && currentInnings.target) {
              target = String(currentInnings.target);
          }
       }
       
       if (ms.partnership) partnershipInfo = ms.partnership;
       
       if (ms.curovsstats) {
          timeline = ms.curovsstats.split(" ").filter((s: string) => s.trim() !== "");
       }

       // Live batsman/bowler fallback if scorecard has not populated active lists
       if (activeBatters.length === 0) {
          if (ms.batsmanstriker) activeBatters.push({ name: ms.batsmanstriker.name, runs: ms.batsmanstriker.runs, ballsFaced: ms.batsmanstriker.balls, strikeRate: parseFloat(ms.batsmanstriker.strkrate || "0") });
          if (ms.batsmannonstriker) activeBatters.push({ name: ms.batsmannonstriker.name, runs: ms.batsmannonstriker.runs, ballsFaced: ms.batsmannonstriker.balls, strikeRate: parseFloat(ms.batsmannonstriker.strkrate || "0") });
       }
       
       if (activeBowlers.length === 0) {
          if (ms.bowlerstriker) activeBowlers.push({ name: ms.bowlerstriker.name, overs: parseFloat(ms.bowlerstriker.overs || "0"), wickets: ms.bowlerstriker.wickets, economy: parseFloat(ms.bowlerstriker.economy || "0") });
          if (ms.bowlernonstriker) activeBowlers.push({ name: ms.bowlernonstriker.name, overs: parseFloat(ms.bowlernonstriker.overs || "0"), wickets: ms.bowlernonstriker.wickets, economy: parseFloat(ms.bowlernonstriker.economy || "0") });
       }
    }

    const matchHeader = hscardData?.matchHeader || commData?.matchheaders || scardData?.matchHeader;
    const seriesName = matchHeader?.seriesname || matchHeader?.seriesName || "";

    // Parse Toss Details
    let tossWinnerName: string | undefined = undefined;
    let tossDecision: string | undefined = undefined;
    if (matchHeader?.toss) {
      tossWinnerName = matchHeader.toss.winnerName || matchHeader.toss.winnerTeamName || "";
      tossDecision = matchHeader.toss.decision || "";
    }

    // Parse Player of the Match
    let playerOfTheMatch: string | undefined = undefined;
    if (Array.isArray(matchHeader?.playersOfTheMatch)) {
      playerOfTheMatch = matchHeader.playersOfTheMatch.map((p: any) => p.name || p.fullName).join(", ");
    } else if (Array.isArray(matchHeader?.playerOfMatch)) {
      playerOfTheMatch = matchHeader.playerOfMatch.map((p: any) => p.name || p.fullName).join(", ");
    } else if (matchHeader?.playerOfMatch) {
      playerOfTheMatch = matchHeader.playerOfMatch.name || matchHeader.playerOfMatch.fullName || "";
    }

    // Parse Officials
    let umpires: string | undefined = undefined;
    let thirdUmpire: string | undefined = undefined;
    let referee: string | undefined = undefined;
    if (Array.isArray(matchHeader?.officials)) {
      const umps = matchHeader.officials.filter((o: any) => (o.role || "").toLowerCase().includes("umpire"));
      umpires = umps.filter((o: any) => (o.role || "").toLowerCase() === "umpire").map((o: any) => o.name).join(", ");
      thirdUmpire = matchHeader.officials.find((o: any) => (o.role || "").toLowerCase().includes("third"))?.name;
      referee = matchHeader.officials.find((o: any) => (o.role || "").toLowerCase().includes("referee") || (o.role || "").toLowerCase().includes("manager"))?.name;
    }

    // Parse Venue details
    let venueGround: string | undefined = undefined;
    let venueCity: string | undefined = undefined;
    let venueCountry: string | undefined = undefined;
    let timezone: string | undefined = undefined;
    if (matchHeader?.venueInfo) {
      venueGround = matchHeader.venueInfo.ground || matchHeader.venueInfo.name || "";
      venueCity = matchHeader.venueInfo.city || "";
      venueCountry = matchHeader.venueInfo.country || "";
      timezone = matchHeader.venueInfo.timezone || "";
    }

    const matchType = matchHeader?.matchType || matchHeader?.matchFormat || "";
    const statusDescription = matchHeader?.status || "";
    const venueFull = venueGround && venueCity ? `${venueGround}, ${venueCity}` : matchHeader?.venueInfo?.ground || "";

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
      venue: venueFull,
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
      timeline,
      scorecard: fullScorecard,
      
      // Inject new premium match metadata
      tossWinnerName,
      tossDecision,
      playerOfTheMatch,
      umpires,
      thirdUmpire,
      referee,
      venueGround,
      venueCity,
      venueCountry,
      timezone,
      matchType,
      statusDescription
    };
  } catch (error) {
    console.error("Match Detail fetch failed.", error);
    return null;
  }
}
