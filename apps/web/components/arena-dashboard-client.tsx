"use client";

import React, { useState, useEffect } from "react";
import { Match, MatchDetail, getMatchDetail, PlayerStats } from "@/server/cricket";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function getTeamLogo(name: string, shortName: string): string {
  const n = (name || "").toLowerCase();
  const sn = (shortName || "").toLowerCase();

  if (sn.includes("csk") || n.includes("chennai") || n.includes("super kings")) return "/logos/CSK.png";
  if (sn.includes("dc") || n.includes("delhi") || n.includes("capitals")) return "/logos/DC.png";
  if (sn.includes("gt") || n.includes("gujarat") || n.includes("titans")) return "/logos/GT.png";
  if (sn.includes("kkr") || n.includes("kolkata") || n.includes("knight riders")) return "/logos/KKR.png";
  if (sn.includes("lsg") || n.includes("lucknow") || n.includes("super giants")) return "/logos/LSG.png";
  if (sn.includes("mi") || n.includes("mumbai") || n.includes("indians")) return "/logos/MI.png";
  if (sn.includes("pbks") || n.includes("punjab") || n.includes("kings")) return "/logos/PBKS.png";
  if (sn.includes("rcb") || n.includes("bangalore") || n.includes("bengaluru") || n.includes("royal challengers")) return "/logos/RCB.png";
  if (sn.includes("rr") || n.includes("rajasthan") || n.includes("royals")) return "/logos/RR.png";
  if (sn.includes("srh") || n.includes("hyderabad") || n.includes("sunrisers")) return "/logos/SRH.png";

  return "";
}

interface ArenaDashboardClientProps {
  initialMatches: Match[];
}

export function ArenaDashboardClient({ initialMatches }: ArenaDashboardClientProps) {
  const [matches] = useState<Match[]>(initialMatches);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(initialMatches[0]?.id || null);
  const [detail, setDetail] = useState<MatchDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const triggerRefresh = () => {
    if (!selectedMatchId || refreshing) return;
    setRefreshing(true);
    getMatchDetail(selectedMatchId)
      .then((res) => {
        setDetail(res);
      })
      .catch((err) => {
        console.error("Error refreshing match details:", err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  // Fetch match details dynamically whenever selected match changes
  useEffect(() => {
    if (!selectedMatchId) return;

    let isMounted = true;
    setLoadingDetail(true);
    
    const fetchMatch = () => {
      getMatchDetail(selectedMatchId)
        .then((res) => {
          if (isMounted) setDetail(res);
        })
        .catch((err) => {
          console.error("Error fetching match details:", err);
        })
        .finally(() => {
          if (isMounted) setLoadingDetail(false);
        });
    };

    // Initial fetch
    fetchMatch();

    // Poll every 90 seconds (90000ms)
    const intervalId = setInterval(fetchMatch, 90000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [selectedMatchId]);



  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary relative pb-20">
      {/* Symmetrical Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-[10px] font-mono font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">
            Fan Arena
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Button asChild size="sm" variant="outline" className="rounded-full text-foreground border-border bg-background">
            <a href="/">Exit Arena</a>
          </Button>
        </div>
      </header>

      {/* Main Grid Console */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Matches Fixture List (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <h2 className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1">
              IPL Fixtures & Live Inputs
            </h2>
            <div className="space-y-3">
              {matches.map((match) => {
                const isSelected = selectedMatchId === match.id;
                return (
                  <div
                    key={match.id}
                    onClick={() => setSelectedMatchId(match.id)}
                    className={`border transition-all duration-300 rounded-xl p-5 cursor-pointer text-left select-none relative ${
                      isSelected
                        ? "border-primary bg-primary/[0.03] shadow-md shadow-primary/5"
                        : "border-border bg-background hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        IPL 2026
                      </span>
                      {match.status === "live" && (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 text-[9px] font-bold px-2 py-0.5 rounded-md animate-pulse">
                          <span className="size-1 rounded-full bg-red-600" /> LIVE
                        </span>
                      )}
                      {match.status === "upcoming" && (
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider border border-border px-1.5 py-0.5 rounded-sm">
                          UPCOMING
                        </span>
                      )}
                      {match.status === "finished" && (
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider bg-muted px-1.5 py-0.5 rounded-sm">
                          FINISHED
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-extrabold text-foreground">
                        <div className="flex items-center gap-2">
                          {getTeamLogo(match.teamA.name, match.teamA.shortName) ? (
                            <img 
                              src={getTeamLogo(match.teamA.name, match.teamA.shortName)} 
                              className="size-5 object-contain select-none" 
                              alt={`${match.teamA.name} logo`} 
                            />
                          ) : (
                            <div className="size-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-[9px] select-none">
                              {match.teamA.shortName[0]}
                            </div>
                          )}
                          <span>{match.teamA.shortName}</span>
                        </div>
                        {match.runsA && (
                          <span className="font-mono">{match.runsA}/{match.wicketsA}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center text-sm font-extrabold text-foreground">
                        <div className="flex items-center gap-2">
                          {getTeamLogo(match.teamB.name, match.teamB.shortName) ? (
                            <img 
                              src={getTeamLogo(match.teamB.name, match.teamB.shortName)} 
                              className="size-5 object-contain select-none" 
                              alt={`${match.teamB.name} logo`} 
                            />
                          ) : (
                            <div className="size-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-[9px] select-none">
                              {match.teamB.shortName[0]}
                            </div>
                          )}
                          <span>{match.teamB.shortName}</span>
                        </div>
                        {match.runsB && (
                          <span className="font-mono">{match.runsB}/{match.wicketsB}</span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-border/60 mt-4 pt-3 text-[10px] text-muted-foreground flex justify-between font-mono">
                      <span>{match.venue.split(",")[0]}</span>
                      {match.oversA && <span>{match.oversA} Overs</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Play Center & Detail Stats (8 Cols) */}
          <div className="lg:col-span-8">
            {loadingDetail ? (
              <div className="border border-border rounded-2xl p-12 bg-card/40 backdrop-blur-md text-center text-muted-foreground min-h-[400px] flex items-center justify-center font-mono text-xs">
                Synchronizing live match feeds from RapidAPI...
              </div>
            ) : detail ? (
              <div className="space-y-6">
                
                {/* 1. Scorecard Header Console */}
                <div className="border border-border rounded-2xl p-6 bg-background shadow-xs">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                        {detail.status === "finished" ? "Match Summary" : "Live Dashboard"}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={triggerRefresh}
                        className="h-6 px-2 text-[10px] font-bold border border-border text-foreground hover:bg-muted cursor-pointer"
                      >
                        {refreshing ? "Syncing..." : "Sync Now"}
                      </Button>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {detail.venue}
                    </span>
                  </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border/60">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        {getTeamLogo(detail.teamA.name, detail.teamA.shortName) ? (
                          <img 
                            src={getTeamLogo(detail.teamA.name, detail.teamA.shortName)} 
                            className="size-10 object-contain select-none" 
                            alt={`${detail.teamA.name} logo`} 
                          />
                        ) : (
                          <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs select-none">
                            {detail.teamA.shortName[0]}
                          </div>
                        )}
                        <div>
                          <span className="text-base font-extrabold text-foreground tracking-tight block">
                            {detail.teamA.name}
                          </span>
                          {detail.runsA && (
                            <span className="font-mono font-black text-2xl text-foreground">
                              {detail.runsA}/{detail.wicketsA} <span className="text-xs text-muted-foreground font-normal">({detail.oversA} Ov)</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {getTeamLogo(detail.teamB.name, detail.teamB.shortName) ? (
                          <img 
                            src={getTeamLogo(detail.teamB.name, detail.teamB.shortName)} 
                            className="size-10 object-contain select-none" 
                            alt={`${detail.teamB.name} logo`} 
                          />
                        ) : (
                          <div className="size-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs select-none">
                            {detail.teamB.shortName[0]}
                          </div>
                        )}
                        <div>
                          <span className="text-base font-extrabold text-foreground tracking-tight block">
                            {detail.teamB.name}
                          </span>
                          {detail.runsB && (
                            <span className="font-mono font-black text-2xl text-foreground">
                              {detail.runsB}/{detail.wicketsB} <span className="text-xs text-muted-foreground font-normal">({detail.oversB} Ov)</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-end md:items-end space-y-2 text-xs text-muted-foreground">
                      {detail.status === "live" && detail.crr && (
                        <div>
                          <span className="font-medium mr-1.5">Current Run Rate:</span>
                          <strong className="font-mono text-foreground font-extrabold">{detail.crr}</strong>
                        </div>
                      )}
                      {detail.status === "live" && detail.rrr && (
                        <div>
                          <span className="font-medium mr-1.5">Required Run Rate:</span>
                          <strong className="font-mono text-foreground font-extrabold">{detail.rrr}</strong>
                        </div>
                      )}
                      {detail.status === "live" && detail.target && (
                        <div>
                          <span className="font-medium mr-1.5">Target Score:</span>
                          <strong className="font-mono text-primary font-black">{detail.target} Runs</strong>
                        </div>
                      )}
                      {detail.tossResult && (
                        <p className="text-[10px] text-muted-foreground text-left md:text-right italic mt-2">
                          {detail.tossResult}
                        </p>
                      )}
                      {detail.result && (
                        <div className="text-xs font-black text-primary mt-2">
                          {detail.result}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Partnership info */}
                  {detail.status === "live" && detail.partnershipInfo && (
                    <div className="pt-4 text-xs text-muted-foreground flex justify-between items-center">
                      <span>Active Partnership: <strong className="text-foreground">{detail.partnershipInfo}</strong></span>
                      {detail.timeline.length > 0 && (
                        <div className="flex items-center gap-1.5 font-mono text-[10px]">
                          <span className="font-bold">Recent Balls:</span>
                          {detail.timeline.map((ball, i) => (
                            <span key={i} className="bg-muted px-1.5 py-0.5 rounded-sm font-bold text-foreground">
                              {ball}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>



                {/* 3. Player Stats Lists (Live Only) */}
                {detail.status === "live" && detail.activeBatters.length > 0 && (
                  <div className="border border-border rounded-2xl overflow-hidden bg-background shadow-xs">
                    <div className="px-6 py-4 border-b border-border/60">
                      <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest text-left">
                        Active Batsmen Statistics
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-muted/40 font-bold border-b border-border/60 text-muted-foreground select-none">
                            <th className="px-6 py-3">Batter Name</th>
                            <th className="px-6 py-3 font-mono">Runs</th>
                            <th className="px-6 py-3 font-mono">Balls</th>
                            <th className="px-6 py-3 font-mono">Strike Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detail.activeBatters.map((player, idx) => (
                            <tr key={idx} className="border-b border-border/40 hover:bg-muted/10">
                              <td className="px-6 py-3.5 font-extrabold text-foreground">{player.name}</td>
                              <td className="px-6 py-3.5 font-mono text-foreground">{player.runs ?? 0}</td>
                              <td className="px-6 py-3.5 font-mono text-muted-foreground">{player.ballsFaced ?? 0}</td>
                              <td className="px-6 py-3.5 font-mono text-primary font-bold">{player.strikeRate?.toFixed(1) ?? "0.0"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 4. Bowler Stats Lists (Live Only) */}
                {detail.status === "live" && detail.activeBowlers.length > 0 && (
                  <div className="border border-border rounded-2xl overflow-hidden bg-background shadow-xs">
                    <div className="px-6 py-4 border-b border-border/60">
                      <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest text-left">
                        Active Bowlers Statistics
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-muted/40 font-bold border-b border-border/60 text-muted-foreground select-none">
                            <th className="px-6 py-3">Bowler Name</th>
                            <th className="px-6 py-3 font-mono">Overs</th>
                            <th className="px-6 py-3 font-mono">Wickets</th>
                            <th className="px-6 py-3 font-mono">Economy</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detail.activeBowlers.map((player, idx) => (
                            <tr key={idx} className="border-b border-border/40 hover:bg-muted/10">
                              <td className="px-6 py-3.5 font-extrabold text-foreground">{player.name}</td>
                              <td className="px-6 py-3.5 font-mono text-foreground">{player.overs ?? 0.0}</td>
                              <td className="px-6 py-3.5 font-mono text-primary font-bold">{player.wickets ?? 0}</td>
                              <td className="px-6 py-3.5 font-mono text-muted-foreground">{player.economy?.toFixed(2) ?? "0.00"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Completed Match Summary Card & Full Scorecard */}
                {detail.status === "finished" && (
                  <div className="space-y-6">
                    {/* Match Symmetrical Winner Banner */}
                    <div className="bg-sky-50 border border-sky-200/60 rounded-2xl p-5 text-center shadow-2xs select-none">
                      <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest block mb-1">
                        Match Complete
                      </span>
                      <h2 className="text-lg font-black text-foreground">{detail.result || "Match Finished"}</h2>
                      {detail.tossResult && (
                        <p className="text-xs text-muted-foreground mt-1 italic">{detail.tossResult}</p>
                      )}
                    </div>

                    {/* Innings detailed lists */}
                    {detail.scorecard && detail.scorecard.length > 0 ? (
                      <div className="space-y-6">
                        {detail.scorecard.map((innings, idx) => (
                          <div key={idx} className="border border-border rounded-2xl overflow-hidden bg-background shadow-xs">
                            {/* Innings Banner */}
                            <div className="px-6 py-4 bg-muted/40 border-b border-border/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                              <div>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                                  Innings #{innings.inningsId}
                                </span>
                                <h4 className="text-sm font-black text-foreground">
                                  {innings.batTeamName || "Unknown Team"}
                                </h4>
                              </div>
                              <div className="text-left sm:text-right">
                                <span className="font-mono font-black text-lg text-foreground">
                                  {innings.runs}/{innings.wickets}
                                </span>
                                <span className="text-[10px] text-muted-foreground font-semibold block">
                                  ({innings.overs} Overs)
                                </span>
                              </div>
                            </div>

                            {/* Innings Batsmen Scorecard */}
                            {innings.batsmen.length > 0 && (
                              <div className="overflow-x-auto border-b border-border/40">
                                <table className="w-full text-left border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-muted/20 font-bold border-b border-border/40 text-muted-foreground select-none">
                                      <th className="px-6 py-2.5">Batsman</th>
                                      <th className="px-6 py-2.5">Dismissal</th>
                                      <th className="px-6 py-2.5 font-mono text-right">Runs</th>
                                      <th className="px-6 py-2.5 font-mono text-right">Balls</th>
                                      <th className="px-6 py-2.5 font-mono text-right">4s</th>
                                      <th className="px-6 py-2.5 font-mono text-right">6s</th>
                                      <th className="px-6 py-2.5 font-mono text-right">SR</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {innings.batsmen.map((b, bIdx) => (
                                      <tr key={bIdx} className="border-b border-border/10 last:border-b-0 hover:bg-muted/5">
                                        <td className="px-6 py-2.5 font-extrabold text-foreground">{b.name}</td>
                                        <td className="px-6 py-2.5 text-muted-foreground font-medium italic">{b.outDec || "not out"}</td>
                                        <td className="px-6 py-2.5 font-mono text-foreground text-right font-bold">{b.runs ?? 0}</td>
                                        <td className="px-6 py-2.5 font-mono text-muted-foreground text-right">{b.ballsFaced ?? 0}</td>
                                        <td className="px-6 py-2.5 font-mono text-muted-foreground text-right">{b.fours ?? 0}</td>
                                        <td className="px-6 py-2.5 font-mono text-muted-foreground text-right">{b.sixes ?? 0}</td>
                                        <td className="px-6 py-2.5 font-mono text-primary font-bold text-right">{b.strikeRate?.toFixed(1) ?? "0.0"}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {/* Innings Bowlers Scorecard */}
                            {innings.bowlers.length > 0 && (
                              <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-muted/10 font-bold border-b border-border/40 text-muted-foreground select-none">
                                      <th className="px-6 py-2.5">Bowler</th>
                                      <th className="px-6 py-2.5 font-mono text-right">Overs</th>
                                      <th className="px-6 py-2.5 font-mono text-right">Maidens</th>
                                      <th className="px-6 py-2.5 font-mono text-right">Runs</th>
                                      <th className="px-6 py-2.5 font-mono text-right">Wickets</th>
                                      <th className="px-6 py-2.5 font-mono text-right">Econ</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {innings.bowlers.map((bw, bwIdx) => (
                                      <tr key={bwIdx} className="border-b border-border/10 last:border-b-0 hover:bg-muted/5">
                                        <td className="px-6 py-2.5 font-extrabold text-foreground">{bw.name}</td>
                                        <td className="px-6 py-2.5 font-mono text-foreground text-right">{bw.overs ?? 0.0}</td>
                                        <td className="px-6 py-2.5 font-mono text-muted-foreground text-right">{bw.maidens ?? 0}</td>
                                        <td className="px-6 py-2.5 font-mono text-foreground text-right">{bw.runsConceded ?? 0}</td>
                                        <td className="px-6 py-2.5 font-mono text-primary font-bold text-right">{bw.wickets ?? 0}</td>
                                        <td className="px-6 py-2.5 font-mono text-muted-foreground text-right font-bold">{bw.economy?.toFixed(2) ?? "0.00"}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border border-border rounded-2xl p-6 bg-background text-center text-muted-foreground text-xs font-mono">
                        Detailed scorecard is being compiled by API.
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Squad Playing XIs (Live / Upcoming Only) */}
                {detail.status !== "finished" && detail.playingXI_A.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <div className="border border-border rounded-2xl p-5 bg-background shadow-xs">
                      <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                        {detail.teamA.shortName} Squad XI
                      </span>
                      <ul className="space-y-2.5 font-medium text-left">
                        {detail.playingXI_A.map((player, idx) => (
                          <li key={idx} className="flex justify-between items-center py-1 border-b border-border/30 last:border-b-0">
                            <span className="text-foreground">{player}</span>
                            <span className="text-[9px] font-mono text-muted-foreground">#{(idx + 1).toString().padStart(2, "0")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border border-border rounded-2xl p-5 bg-background shadow-xs">
                      <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                        {detail.teamB.shortName} Squad XI
                      </span>
                      <ul className="space-y-2.5 font-medium text-left">
                        {detail.playingXI_B.map((player, idx) => (
                          <li key={idx} className="flex justify-between items-center py-1 border-b border-border/30 last:border-b-0">
                            <span className="text-foreground">{player}</span>
                            <span className="text-[9px] font-mono text-muted-foreground">#{(idx + 1).toString().padStart(2, "0")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="border border-border rounded-2xl p-12 bg-background text-center text-muted-foreground min-h-[300px] flex items-center justify-center font-mono text-xs">
                Select a match from the fixtures panel to join the second-screen arena.
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Symmetrical Google Developer Groups watermark banner at the bottom of the arena! */}
      <div className="flex flex-col items-center justify-center gap-2 mt-20 mb-8 opacity-90 hover:opacity-100 transition-opacity duration-300 select-none">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">Presented in association with</span>
        <img 
          src="/GDG.png" 
          alt="Google Developer Group Logo" 
          className="h-16 md:h-20 w-auto object-contain brightness-100" 
        />
      </div>
    </div>
  );
}
