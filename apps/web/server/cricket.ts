"use server";

import { FALLBACK_MATCHES, FALLBACK_MATCH_DETAILS } from "./fallback-db";
import { Match, MatchDetail, PlayerStats, InningsScorecard } from "./types";



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
                const status = ((s) => s === "complete" ? "finished" : (s === "upcoming" || s === "preview") ? "upcoming" : "live")((info.state || "").toLowerCase());
                
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
  if (!headers["X-RapidAPI-Key"]) {
    console.log("No API key found. Returning local fallback matches database.");
    return FALLBACK_MATCHES;
  }

  try {
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
    return uniqueMatches.length > 0 ? uniqueMatches : FALLBACK_MATCHES;
  } catch (error) {
    console.error("RapidAPI match list fetch failed, falling back to local matches.", error);
    return FALLBACK_MATCHES;
  }
}

export async function getMatchDetail(matchId: string): Promise<MatchDetail | null> {
  // Check local fallback DB first if the ID is a fallback ID or matches fallback DB records
  if (matchId.startsWith("ipl2026-") || FALLBACK_MATCH_DETAILS[matchId]) {
    console.log(`Returning local fallback match details for ID: ${matchId}`);
    const details = FALLBACK_MATCH_DETAILS[matchId];
    // Cast details to any to bypass circular import type definition constraints during compilation
    return details ? { ...(details as any), isLocalDB: true } as MatchDetail : null;
  }

  const { headers, host } = getRequestHeaders();
  if (!headers["X-RapidAPI-Key"]) {
    console.log(`No API key found. Returning local fallback match details if available for ID: ${matchId}`);
    const details = FALLBACK_MATCH_DETAILS[matchId];
    // Cast details to any to bypass circular import type definition constraints during compilation
    return details ? { ...(details as any), isLocalDB: true } as MatchDetail : null;
  }

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
       console.log(`No data returned from RapidAPI. Returning local fallback details if available for ID: ${matchId}`);
       return FALLBACK_MATCH_DETAILS[matchId] || null;
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

    // Symmetrically resolve matchHeader across all potential endpoints and casing variants
    const matchHeader = 
      hscardData?.matchHeader || 
      hscardData?.matchInfo || 
      hscardData?.matchheaders ||
      scardData?.matchHeader || 
      scardData?.matchInfo || 
      scardData?.matchheaders ||
      commData?.matchHeader || 
      commData?.matchInfo || 
      commData?.matchheaders;

    const seriesName = matchHeader?.seriesname || matchHeader?.seriesName || "";

    // Parse Toss Details with comprehensive nested field discovery
    let tossWinnerName: string | undefined = undefined;
    let tossDecision: string | undefined = undefined;
    const tossObj = matchHeader?.toss || matchHeader?.tossResult || matchHeader?.tossResults;
    if (tossObj) {
      if (typeof tossObj === "object") {
        tossWinnerName = tossObj.winnerName || tossObj.winnerTeamName || tossObj.tossWinnerName || "";
        tossDecision = tossObj.decision || tossObj.tossDecision || "";
      } else if (typeof tossObj === "string") {
        tossWinnerName = tossObj;
      }
    }
    // Deep fallback to status or result text analysis for toss details
    if (!tossWinnerName && (matchHeader?.status || matchHeader?.result)) {
      const statusText = matchHeader?.status || matchHeader?.result || "";
      if (statusText.toLowerCase().includes("won the toss") || statusText.toLowerCase().includes("opted to")) {
        tossWinnerName = statusText;
      }
    }

    // Parse Player of the Match MVP
    let playerOfTheMatch: string | undefined = undefined;
    const pomObj = matchHeader?.playersOfTheMatch || matchHeader?.playerOfMatch || matchHeader?.playerOfTheMatch || matchHeader?.playersOfMatch;
    if (pomObj) {
      if (Array.isArray(pomObj)) {
        playerOfTheMatch = pomObj.map((p: any) => p.name || p.fullName || p).join(", ");
      } else if (typeof pomObj === "object") {
        playerOfTheMatch = pomObj.name || pomObj.fullName || "";
      } else if (typeof pomObj === "string") {
        playerOfTheMatch = pomObj;
      }
    }

    // Parse Officials with robust role filtering
    let umpires: string | undefined = undefined;
    let thirdUmpire: string | undefined = undefined;
    let referee: string | undefined = undefined;
    const officialsObj = matchHeader?.officials || matchHeader?.matchOfficials;
    if (Array.isArray(officialsObj)) {
      const umps = officialsObj.filter((o: any) => (o.role || "").toLowerCase().includes("umpire"));
      umpires = umps.filter((o: any) => (o.role || "").toLowerCase().includes("ground") || (o.role || "").toLowerCase() === "umpire").map((o: any) => o.name || o.fullName).filter(Boolean).join(", ");
      if (!umpires && umps.length > 0) {
        umpires = umps.slice(0, 2).map((o: any) => o.name || o.fullName).filter(Boolean).join(", ");
      }
      thirdUmpire = officialsObj.find((o: any) => (o.role || "").toLowerCase().includes("third"))?.name;
      referee = officialsObj.find((o: any) => (o.role || "").toLowerCase().includes("referee") || (o.role || "").toLowerCase().includes("manager") || (o.role || "").toLowerCase().includes("match referee"))?.name;
    }

    // Parse Venue details with multi-property fallbacks
    let venueGround: string | undefined = undefined;
    let venueCity: string | undefined = undefined;
    let venueCountry: string | undefined = undefined;
    let timezone: string | undefined = undefined;
    const venueObj = matchHeader?.venueInfo || matchHeader?.venue || matchHeader?.venueDetails;
    if (venueObj) {
      if (typeof venueObj === "object") {
        venueGround = venueObj.ground || venueObj.name || venueObj.venueName || "";
        venueCity = venueObj.city || venueObj.venueCity || "";
        venueCountry = venueObj.country || venueObj.venueCountry || "";
        timezone = venueObj.timezone || venueObj.timeZone || "";
      } else if (typeof venueObj === "string") {
        venueGround = venueObj;
      }
    }

    const matchType = matchHeader?.matchType || matchHeader?.matchFormat || "";
    const statusDescription = matchHeader?.status || "";
    const venueFull = venueGround && venueCity ? `${venueGround}, ${venueCity}` : venueGround || matchHeader?.venueInfo?.ground || "";

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
      status: (() => {
        const matchState = (matchHeader?.state || "").toLowerCase();
        return (matchState === "complete") ? "finished" : (matchState === "upcoming" || matchState === "preview") ? "upcoming" : "live";
      })(),
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
      statusDescription,
      isLocalDB: false
    };
  } catch (error) {
    console.error("Match Detail fetch failed. Returning local fallback details if available.", error);
    const details = FALLBACK_MATCH_DETAILS[matchId];
    // Cast details to any to bypass circular import type definition constraints during compilation
    return details ? { ...(details as any), isLocalDB: true } as MatchDetail : null;
  }
}

export async function checkDatabaseSource(): Promise<{ isLocal: boolean }> {
  "use server";
  const key = process.env.RAPIDAPI_KEY || process.env.RAPID_API_KEY || "";
  return { isLocal: !key };
}

export async function askMatchAI(
  matchDetail: any,
  userMessage: string,
  history: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  "use server";

  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
  
  // Format the detailed match state into a robust context system prompt
  const matchContext = `
You are the Official Fan Arena AI Assistant, a world-class IPL expert, expert cricket coach, and human commentator.
You have access to the COMPLETE, LIVE end-to-end match context from the Cricbuzz API database.
Respond as a highly engaging, knowledgeable, friendly human fan. Keep your responses precise, conversational, and direct (do not use dry JSON, markdown headers, or excessive lists). Use a highly engaging commentary voice.

MATCH DATABASE STATE:
- Series: ${matchDetail.seriesName || "IPL 2026"}
- Match Type: ${matchDetail.matchType || "T20"}
- Venue: ${matchDetail.venue || "IPL Venue"} (Ground: ${matchDetail.venueGround || "N/A"}, City: ${matchDetail.venueCity || "N/A"}, Country: ${matchDetail.venueCountry || "N/A"})
- Timezone: ${matchDetail.timezone || "N/A"}
- Status: ${matchDetail.statusDescription || matchDetail.result || "Live Match"}
- Toss Decision: ${matchDetail.tossWinnerName ? `${matchDetail.tossWinnerName} elected to ${matchDetail.tossDecision || "bat"} first` : "N/A"}
- Match Result: ${matchDetail.result || "Active Match"}
- Player of the Match: ${matchDetail.playerOfTheMatch || "Not announced yet"}

TEAMS & CURRENT SCORE:
- Team A: ${matchDetail.teamA.name} (${matchDetail.teamA.shortName})
  Score: ${matchDetail.runsA ? `${matchDetail.runsA}/${matchDetail.wicketsA} in ${matchDetail.oversA} overs` : "Yet to bat"}
- Team B: ${matchDetail.teamB.name} (${matchDetail.teamB.shortName})
  Score: ${matchDetail.runsB ? `${matchDetail.runsB}/${matchDetail.wicketsB} in ${matchDetail.oversB} overs` : "Yet to bat"}

LIVE STATS (If active):
- Current Run Rate (CRR): ${matchDetail.crr || "N/A"}
- Required Run Rate (RRR): ${matchDetail.rrr || "N/A"}
- Target: ${matchDetail.target || "N/A"}
- Active Partnership: ${matchDetail.partnershipInfo || "N/A"}
- Recent Timeline: ${matchDetail.timeline?.join(" -> ") || "N/A"}

OFFICIALS:
- Umpires: ${matchDetail.umpires || "N/A"}
- Third Umpire: ${matchDetail.thirdUmpire || "N/A"}
- Match Referee: ${matchDetail.referee || "N/A"}

ACTIVE BATTERS & BOWLERS:
- Batting: ${matchDetail.activeBatters?.map((b: any) => `${b.name} (${b.runs} off ${b.ballsFaced || b.balls || 0} balls, ${b.fours || 0}x4, ${b.sixes || 0}x6, SR: ${b.strikeRate})`).join(", ") || "None"}
- Bowling: ${matchDetail.activeBowlers?.map((bw: any) => `${bw.name} (${bw.overs} overs, ${bw.wickets} wickets, econ: ${bw.economy})`).join(", ") || "None"}

INNINGS SCORECARD DETAIL:
${matchDetail.scorecard?.map((inn: any) => `
* Innings #${inn.inningsId}: ${inn.batTeamName || "Unknown Team"} (Score: ${inn.runs}/${inn.wickets} in ${inn.overs} overs)
  - Batsmen:
    ${inn.batsmen?.map((b: any) => `  • ${b.name}: ${b.runs ?? 0} runs off ${b.ballsFaced ?? 0} balls (${b.fours ?? 0}x4, ${b.sixes ?? 0}x6, SR: ${b.strikeRate ?? 0}) - Dismissal: ${b.outDec || "not out"}`).join("\n")}
  - Bowlers:
    ${inn.bowlers?.map((bw: any) => `  • ${bw.name}: ${bw.overs ?? 0} overs, ${bw.maidens ?? 0} maidens, ${bw.runsConceded ?? 0} runs, ${bw.wickets ?? 0} wickets (Econ: ${bw.economy ?? 0})`).join("\n")}
`).join("\n") || "No scorecard details registered."}
`;

  // If no Gemini key is provided, perform highly realistic local mock answering!
  if (!geminiKey) {
    return getLocalFallbackAnswer(matchDetail, userMessage);
  }

  try {
    const geminiHistory = history.map((h) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            ...geminiHistory,
            {
              role: "user",
              parts: [{ text: `User Question: ${userMessage}\n\nAnswer using the live database details context naturally like a human.` }]
            }
          ],
          systemInstruction: {
            parts: [{ text: matchContext }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini API call failed, falling back to local cognitive engine. Error:", err);
      return getLocalFallbackAnswer(matchDetail, userMessage);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "I'm watching the game closely, but couldn't formulate a response. Ask me anything about the players or scores!";
  } catch (error) {
    console.error("Gemini askMatchAI error, falling back to local cognitive engine. Error:", error);
    return getLocalFallbackAnswer(matchDetail, userMessage);
  }
}

function getLocalFallbackAnswer(matchDetail: any, userMessage: string): string {
  const query = userMessage.toLowerCase();
  
  if (query.includes("who won") || query.includes("result") || query.includes("winner") || query.includes("outcome")) {
    if (matchDetail.result) {
      let explanation = `Match result: **${matchDetail.result}**! What an absolute classic match it was between ${matchDetail.teamA.shortName} and ${matchDetail.teamB.shortName}.`;
      if (matchDetail.playerOfTheMatch) {
        explanation += ` **${matchDetail.playerOfTheMatch}** was crowned the Player of the Match for a phenomenal performance that secured the win!`;
      }
      if (matchDetail.tossWinnerName) {
        explanation += ` Earlier, ${matchDetail.tossWinnerName} won the toss and elected to ${matchDetail.tossDecision || "bat"} first.`;
      }
      return explanation;
    }
    return `The match is still active or status is: **${matchDetail.statusDescription || "Live play"}**. No final winner has been declared yet!`;
  }
  if (query.includes("who is batting") || query.includes("batter") || query.includes("batsman")) {
    if (matchDetail.activeBatters && matchDetail.activeBatters.length > 0) {
      return `Right now in the middle, we have ${matchDetail.activeBatters.map((b: any) => `**${b.name}** batting on **${b.runs}** runs off ${b.ballsFaced || b.balls || 0} balls`).join(" and ")}. They are looking to push the scoring rate under pressure!`;
    }
    return `There are no active batters registered on the pitch right now. The innings might be completed, or the teams are in between sessions!`;
  }
  if (query.includes("who is bowling") || query.includes("bowler")) {
    if (matchDetail.activeBowlers && matchDetail.activeBowlers.length > 0) {
      return `Operating with the ball right now is ${matchDetail.activeBowlers.map((b: any) => `**${b.name}** who has bowled **${b.overs}** overs with a clean economy of **${b.economy}**`).join(" and ")}.`;
    }
    return `No active bowlers are registered right now. The game might be paused or in between innings!`;
  }
  if (query.includes("score") || query.includes("runs") || query.includes("wicket")) {
    const scoreStr = [];
    if (matchDetail.runsA) scoreStr.push(`${matchDetail.teamA.name}: **${matchDetail.runsA}/${matchDetail.wicketsA}** (${matchDetail.oversA} Ov)`);
    if (matchDetail.runsB) scoreStr.push(`${matchDetail.teamB.name}: **${matchDetail.runsB}/${matchDetail.wicketsB}** (${matchDetail.oversB} Ov)`);
    return `The current scoreboard reads:\n${scoreStr.join("\n")}\n\n*Status: ${matchDetail.statusDescription || matchDetail.result || "Active play"}.*`;
  }
  if (query.includes("toss")) {
    return matchDetail.tossWinnerName 
      ? `Toss update: **${matchDetail.tossWinnerName}** won the toss and elected to **${matchDetail.tossDecision?.toLowerCase() || "bat"}** first at ${matchDetail.venueGround || "the venue"}.`
      : `Toss results are not available or haven't been resolved yet for this fixture.`;
  }
  if (query.includes("venue") || query.includes("stadium") || query.includes("ground")) {
    return `This IPL match is being played at **${matchDetail.venueGround || matchDetail.venue || "IPL Stadium"}** located in **${matchDetail.venueCity || "India"}**.`;
  }
  if (query.includes("umpire") || query.includes("referee") || query.includes("official")) {
    const ops = [];
    if (matchDetail.umpires) ops.push(`Field Umpires: **${matchDetail.umpires}**`);
    if (matchDetail.thirdUmpire) ops.push(`Third Umpire: **${matchDetail.thirdUmpire}**`);
    if (matchDetail.referee) ops.push(`Match Referee: **${matchDetail.referee}**`);
    return ops.length > 0 
      ? `Here are the match officials for this clash:\n${ops.join("\n")}`
      : `No official listings are currently resolved for this fixture.`;
  }
  if (query.includes("mvp") || query.includes("player of the match") || query.includes("pom")) {
    return matchDetail.playerOfTheMatch
      ? `The Player of the Match honors belong to **${matchDetail.playerOfTheMatch}** for an outstanding game-changing display!`
      : `Player of the Match (MVP) honors haven't been decided yet as the game is still active or details are pending!`;
  }
  if (query.includes("playing xi") || query.includes("squad") || query.includes("players") || query.includes("lineup")) {
    const xiA = matchDetail.playingXI_A?.length > 0 ? `\n* **${matchDetail.teamA.shortName}:** ${matchDetail.playingXI_A.join(", ")}` : "";
    const xiB = matchDetail.playingXI_B?.length > 0 ? `\n* **${matchDetail.teamB.shortName}:** ${matchDetail.playingXI_B.join(", ")}` : "";
    if (xiA || xiB) {
      return `Here are the playing XIs for both sides:\n${xiA}${xiB}`;
    }
    return `Squad listings or playing XIs are not announced/available yet for this match.`;
  }
  if (query.includes("scorecard") || query.includes("stats") || query.includes("batsmen") || query.includes("bowlers")) {
    if (matchDetail.scorecard && matchDetail.scorecard.length > 0) {
      const scSummary = matchDetail.scorecard.map((inn: any) => {
        const topBatsman = inn.batsmen?.reduce((max: any, b: any) => ((b.runs ?? 0) > (max?.runs ?? 0) ? b : max), null);
        const topBowler = inn.bowlers?.reduce((max: any, bw: any) => ((bw.wickets ?? 0) > (max?.wickets ?? 0) ? bw : max), null);
        
        let text = `* **Innings #${inn.inningsId} (${inn.batTeamName}):** ${inn.runs}/${inn.wickets} in ${inn.overs} overs.`;
        if (topBatsman && topBatsman.runs > 0) {
          text += ` Top Batter: **${topBatsman.name}** (${topBatsman.runs} runs off ${topBatsman.ballsFaced} balls).`;
        }
        if (topBowler && topBowler.wickets > 0) {
          text += ` Top Bowler: **${topBowler.name}** (${topBowler.wickets}/${topBowler.runsConceded}).`;
        }
        return text;
      }).join("\n");
      return `Here is a summary of the scorecard:\n\n${scSummary}\n\nFor the full ball-by-ball details, scroll down to the Innings Scorecards section below!`;
    }
    return `Full scorecard details are not registered yet for this match.`;
  }

  return `Hey! I have full visibility of this fixture. Here's a quick summary:\n\n* **Score:** ${matchDetail.teamA.shortName} (${matchDetail.runsA || 0}/${matchDetail.wicketsA || 0}) vs ${matchDetail.teamB.shortName} (${matchDetail.runsB || 0}/${matchDetail.wicketsB || 0})\n* **Venue:** ${matchDetail.venue}\n* **Status:** ${matchDetail.statusDescription || "Live play"}`;
}
