const fs = require('fs');
const path = require('path');

const API_KEY = "cd27d04de7msh3e379ead78b20d0p12726djsn931539bd9988";
const API_HOST = "cricbuzz-cricket.p.rapidapi.com";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchCricbuzz(endpoint) {
  console.log(`Fetching: ${endpoint}`);
  const res = await fetch(`https://${API_HOST}/${endpoint}`, {
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

function parseMatchList(data) {
  const matches = [];
  if (data && Array.isArray(data.typeMatches)) {
    data.typeMatches.forEach((typeMatch) => {
      if (Array.isArray(typeMatch.seriesMatches)) {
        typeMatch.seriesMatches.forEach((seriesMatch) => {
          const wrapper = seriesMatch.seriesAdWrapper;
          if (wrapper && Array.isArray(wrapper.matches)) {
            wrapper.matches.forEach((matchItem) => {
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
}

async function run() {
  try {
    console.log("Starting script to fetch real matches and update fallback database...");

    const liveData = await fetchCricbuzz("matches/v1/live");
    await delay(1200);
    const upcomingData = await fetchCricbuzz("matches/v1/upcoming");
    await delay(1200);
    const recentData = await fetchCricbuzz("matches/v1/recent");

    const liveMatches = parseMatchList(liveData);
    const upcomingMatches = parseMatchList(upcomingData);
    const recentMatches = parseMatchList(recentData);

    const allMatches = [...liveMatches, ...upcomingMatches, ...recentMatches];
    const uniqueMatches = Array.from(new Map(allMatches.map(m => [m.id, m])).values());

    console.log(`Found ${uniqueMatches.length} total matches. Fetching details for first 5 matches...`);
    const finalMatches = uniqueMatches.slice(0, 8); // Select top 8 matches for the fallback database

    const fallbackMatchDetails = {};

    for (let i = 0; i < Math.min(finalMatches.length, 5); i++) {
      const match = finalMatches[i];
      await delay(1200);
      try {
        const commData = await fetchCricbuzz(`mcenter/v1/${match.id}/comm`).catch(() => null);
        await delay(1200);
        const scardData = await fetchCricbuzz(`mcenter/v1/${match.id}/scard`).catch(() => null);
        await delay(1200);
        const hscardData = await fetchCricbuzz(`mcenter/v1/${match.id}/hscard`).catch(() => null);

        const activeBatters = [];
        const activeBowlers = [];
        const fullScorecard = [];
        const playingXI_A = [];
        const playingXI_B = [];

        const team1Squad = scardData?.matchHeader?.team1?.players || hscardData?.matchHeader?.team1?.players || [];
        const team2Squad = scardData?.matchHeader?.team2?.players || hscardData?.matchHeader?.team2?.players || [];
        
        if (Array.isArray(team1Squad)) {
           team1Squad.forEach((p) => playingXI_A.push(p.name || p.fullName || ""));
        }
        if (Array.isArray(team2Squad)) {
           team2Squad.forEach((p) => playingXI_B.push(p.name || p.fullName || ""));
        }

        const rawScorecard = (scardData && (scardData.scorecard || scardData.scoreCard)) || [];
        if (Array.isArray(rawScorecard)) {
           rawScorecard.forEach((innings) => {
              const batsmenList = [];
              const bowlersList = [];
              
              if (Array.isArray(innings.batsman)) {
                 innings.batsman.forEach((b) => {
                    const p = {
                       name: b.name || b.nickname || "",
                       runs: b.runs,
                       ballsFaced: b.balls,
                       fours: b.fours,
                       sixes: b.sixes,
                       outDec: b.outdec || "",
                       strikeRate: parseFloat(b.strkrate || "0")
                    };
                    batsmenList.push(p);
                    const isBatting = b.outdec && b.outdec.toLowerCase().includes("batting");
                    if (isBatting) {
                       activeBatters.push(p);
                    }
                 });
              }
              
              if (Array.isArray(innings.bowler)) {
                 innings.bowler.forEach((bw) => {
                    const p = {
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

        let crr, rrr, target, partnershipInfo;
        let timeline = [];
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
              timeline = ms.curovsstats.split(" ").filter((s) => s.trim() !== "");
           }
           if (activeBatters.length === 0) {
              if (ms.batsmanstriker) activeBatters.push({ name: ms.batsmanstriker.name, runs: ms.batsmanstriker.runs, ballsFaced: ms.batsmanstriker.balls, strikeRate: parseFloat(ms.batsmanstriker.strkrate || "0") });
              if (ms.batsmannonstriker) activeBatters.push({ name: ms.batsmannonstriker.name, runs: ms.batsmannonstriker.runs, ballsFaced: ms.batsmannonstriker.balls, strikeRate: parseFloat(ms.batsmannonstriker.strkrate || "0") });
           }
           if (activeBowlers.length === 0) {
              if (ms.bowlerstriker) activeBowlers.push({ name: ms.bowlerstriker.name, overs: parseFloat(ms.bowlerstriker.overs || "0"), wickets: ms.bowlerstriker.wickets, economy: parseFloat(ms.bowlerstriker.economy || "0") });
              if (ms.bowlernonstriker) activeBowlers.push({ name: ms.bowlernonstriker.name, overs: parseFloat(ms.bowlernonstriker.overs || "0"), wickets: ms.bowlernonstriker.wickets, economy: parseFloat(ms.bowlernonstriker.economy || "0") });
           }
        }

        const matchHeader = hscardData?.matchHeader || scardData?.matchHeader || commData?.matchHeader || {};
        
        let tossWinnerName, tossDecision;
        const tossObj = matchHeader.toss || matchHeader.tossResult;
        if (tossObj) {
          if (typeof tossObj === "object") {
            tossWinnerName = tossObj.winnerName || tossObj.winnerTeamName || "";
            tossDecision = tossObj.decision || "";
          } else {
            tossWinnerName = String(tossObj);
          }
        }

        let playerOfTheMatch;
        const pomObj = matchHeader.playersOfTheMatch || matchHeader.playerOfMatch || matchHeader.playerOfTheMatch;
        if (pomObj) {
          if (Array.isArray(pomObj)) {
            playerOfTheMatch = pomObj.map((p) => p.name || p.fullName).join(", ");
          } else if (typeof pomObj === "object") {
            playerOfTheMatch = pomObj.name || pomObj.fullName;
          } else {
            playerOfTheMatch = String(pomObj);
          }
        }

        let umpires, thirdUmpire, referee;
        const officialsObj = matchHeader.officials || matchHeader.matchOfficials;
        if (Array.isArray(officialsObj)) {
          const umps = officialsObj.filter((o) => (o.role || "").toLowerCase().includes("umpire"));
          umpires = umps.filter((o) => (o.role || "").toLowerCase().includes("ground") || (o.role || "").toLowerCase() === "umpire").map((o) => o.name || o.fullName).filter(Boolean).join(", ");
          thirdUmpire = officialsObj.find((o) => (o.role || "").toLowerCase().includes("third"))?.name;
          referee = officialsObj.find((o) => (o.role || "").toLowerCase().includes("referee") || (o.role || "").toLowerCase().includes("manager"))?.name;
        }

        let venueGround, venueCity, venueCountry, timezone;
        const venueObj = matchHeader.venueInfo || matchHeader.venue;
        if (venueObj) {
          if (typeof venueObj === "object") {
            venueGround = venueObj.ground || venueObj.name || "";
            venueCity = venueObj.city || "";
            venueCountry = venueObj.country || "";
            timezone = venueObj.timezone || "";
          }
        }

        fallbackMatchDetails[match.id] = {
          ...match,
          playingXI_A,
          playingXI_B,
          activeBatters,
          activeBowlers,
          partnershipInfo,
          timeline,
          scorecard: fullScorecard,
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
          matchType: matchHeader.matchType || "",
          statusDescription: matchHeader.status || ""
        };

        console.log(`Successfully fetched details for Match ID: ${match.id}`);
      } catch (err) {
        console.error(`Failed to fetch details for Match ID: ${match.id}`, err);
        // Put standard default detail
        fallbackMatchDetails[match.id] = {
          ...match,
          playingXI_A: [],
          playingXI_B: [],
          activeBatters: [],
          activeBowlers: [],
          timeline: [],
          scorecard: [],
          statusDescription: match.result
        };
      }
    }

    // Now construct the final fallback-db.ts content
    let fileContent = `import { Match, MatchDetail } from "./cricket";\n\n`;
    fileContent += `export const FALLBACK_MATCHES: Match[] = ${JSON.stringify(finalMatches, null, 2)};\n\n`;
    fileContent += `export const FALLBACK_MATCH_DETAILS: Record<string, MatchDetail> = ${JSON.stringify(fallbackMatchDetails, null, 2)};\n`;

    fs.writeFileSync(path.join(__dirname, '../server/fallback-db.ts'), fileContent, 'utf-8');
    console.log("Successfully generated apps/web/server/fallback-db.ts with live API data!");
  } catch (error) {
    console.error("Execution failed:", error);
  }
}

run();
