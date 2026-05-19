"use client";

import React, { useState, useEffect, useRef } from "react";
import { Match, MatchDetail, getMatchDetail, PlayerStats } from "@/server/cricket";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  Sparkles,
  Bot,
  User,
  ArrowUp
} from "lucide-react";

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
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [activeScreen, setActiveScreen] = useState<"fixtures" | "details">("fixtures");
  const [fixturesTab, setFixturesTab] = useState<"all" | "live" | "upcoming" | "finished">("all");
  const [detail, setDetail] = useState<MatchDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // AI Chat Assistant State
  const [chatMessages, setChatMessages] = useState<{ id: string; role: "user" | "assistant"; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatMessages, aiLoading]);

  // Seed welcome message when match changes
  useEffect(() => {
    if (detail) {
      setChatMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Hey! I'm your live IPL Fan Arena AI Assistant. I'm fully synchronized with the live database for this clash between **${detail.teamA.name}** and **${detail.teamB.name}**. Ask me anything about scores, batters, active partnerships, match officials, or detailed scorecard statistics!`
        }
      ]);
    }
  }, [selectedMatchId, detail?.id]);

  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || aiLoading || !detail) return;

    const userText = chatInput.trim();
    setChatInput("");
    setAiLoading(true);

    const newMsg = {
      id: Math.random().toString(),
      role: "user" as const,
      content: userText
    };

    const updatedHistory = [...chatMessages, newMsg];
    setChatMessages(updatedHistory);

    try {
      const { askMatchAI } = await import("@/server/cricket");
      const reply = await askMatchAI(detail, userText, updatedHistory.map(m => ({ role: m.role, content: m.content })));

      setChatMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant" as const,
          content: reply
        }
      ]);
    } catch (err) {
      console.error("AI Chat error:", err);
      setChatMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant" as const,
          content: "I had a minor issue connecting to my commentary engine. Let's try again!"
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

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




  const filteredMatches = matches.filter((m) => {
    if (fixturesTab === "live") return m.status === "live";
    if (fixturesTab === "upcoming") return m.status === "upcoming";
    if (fixturesTab === "finished") return m.status === "finished";
    return true;
  });

  const countLive = matches.filter(m => m.status === "live").length;
  const countUpcoming = matches.filter(m => m.status === "upcoming").length;
  const countFinished = matches.filter(m => m.status === "finished").length;
  const matchSummary = matches.find(m => m.id === selectedMatchId);

  // High-fidelity fallback computation for premium dashboard fields
  const displayStatus = detail?.status || matchSummary?.status || "live";

  const displayVenue = (detail?.venueGround && detail.venueGround !== "Unknown Ground" && detail.venueGround.trim() !== "")
    ? detail.venueGround
    : (detail?.venue && detail.venue.trim() !== "")
      ? detail.venue
      : (matchSummary?.venue && matchSummary.venue.trim() !== "")
        ? matchSummary.venue
        : "IPL Venue";

  const displayVenueCity = detail?.venueCity || matchSummary?.venue?.split(",")?.[1]?.trim() || "";
  const displayVenueCountry = detail?.venueCountry || "";

  const displayToss = detail?.tossWinnerName
    ? (detail.tossDecision
      ? `${detail.tossWinnerName} elected to ${detail.tossDecision.toLowerCase()} first`
      : detail.tossWinnerName
    )
    : "";

  const displayResult = detail?.result || matchSummary?.result || "";
  const displayFormat = detail?.matchType || matchSummary?.seriesName || "";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary relative pb-6">
      {/* Symmetrical Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 select-none">
          <Logo />
          <span className="text-muted-foreground/35 font-mono text-sm">×</span>
          <img
            src="/GDG.png"
            alt="Google Developer Group Logo"
            className="h-8 md:h-9 w-auto object-contain brightness-100 contrast-100 transition-transform duration-300 hover:scale-105"
          />
          <span className="text-[9px] font-mono font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
            Fan Arena
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Button asChild size="sm" variant="outline" className="rounded-full text-foreground border-border bg-background">
            <a href="/">Exit Arena</a>
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-6 py-6 flex-1 flex flex-col">

        {/* SCREEN 1: IPL FIXTURES GRID PANEL */}
        {activeScreen === "fixtures" && (
          <div className="space-y-6 flex flex-col">
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                IPL Fixtures & Live Inputs
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Select a match from the fixtures below to open the dedicated second-screen Fan Arena console and track match parameters, detailed summaries, and live scorecard inputs.
              </p>
            </div>

            {/* TAB SELECTORS */}
            <div className="flex flex-wrap gap-2 border-b border-border/60 pb-4">
              <button
                onClick={() => setFixturesTab("all")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${fixturesTab === "all"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted"
                  }`}
              >
                All Fixtures ({matches.length})
              </button>
              <button
                onClick={() => setFixturesTab("live")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${fixturesTab === "live"
                  ? "bg-red-600 text-white shadow-xs"
                  : "bg-red-50/60 text-red-600 border border-red-100 hover:bg-red-50"
                  }`}
              >
                <span className="size-1.5 rounded-full bg-current animate-pulse" />
                Live ({countLive})
              </button>
              <button
                onClick={() => setFixturesTab("upcoming")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${fixturesTab === "upcoming"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted"
                  }`}
              >
                Upcoming ({countUpcoming})
              </button>
              <button
                onClick={() => setFixturesTab("finished")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${fixturesTab === "finished"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted"
                  }`}
              >
                Completed ({countFinished})
              </button>
            </div>

            {/* FIXTURES SPACIOUS GRID */}
            {filteredMatches.length === 0 ? (
              <div className="border border-dashed border-border rounded-2xl p-12 bg-card/20 text-center text-muted-foreground font-mono text-xs max-w-md mx-auto">
                No fixtures match the selected filter.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMatches.map((match) => (
                    <div
                      key={match.id}
                      onClick={() => {
                        setSelectedMatchId(match.id);
                        setActiveScreen("details");
                      }}
                      className="border border-border bg-background hover:border-primary/40 hover:shadow-lg hover:shadow-primary/[0.02] transition-all duration-300 rounded-2xl p-6 cursor-pointer text-left flex flex-col justify-between group relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-transparent group-hover:bg-primary transition-colors duration-300" />

                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded-sm">
                            IPL 2026
                          </span>
                          {match.status === "live" && (
                            <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 text-[9px] font-bold px-2.5 py-0.5 rounded-md animate-pulse">
                              <span className="size-1 rounded-full bg-red-600" /> LIVE
                            </span>
                          )}
                          {match.status === "upcoming" && (
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider border border-border px-2 py-0.5 rounded-md">
                              UPCOMING
                            </span>
                          )}
                          {match.status === "finished" && (
                            <span className="text-[9px] font-bold text-sky-600 bg-sky-50 border border-sky-100 uppercase tracking-wider px-2 py-0.5 rounded-md">
                              FINISHED
                            </span>
                          )}
                        </div>

                        {/* Team Scores Block */}
                        <div className="space-y-3.5 my-4">
                          <div className="flex justify-between items-center text-sm font-extrabold text-foreground">
                            <div className="flex items-center gap-2.5">
                              {getTeamLogo(match.teamA.name, match.teamA.shortName) ? (
                                <img
                                  src={getTeamLogo(match.teamA.name, match.teamA.shortName)}
                                  className="size-6 object-contain select-none"
                                  alt={`${match.teamA.name} logo`}
                                />
                              ) : (
                                <div className="size-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-[10px] select-none">
                                  {match.teamA.shortName[0]}
                                </div>
                              )}
                              <span className="tracking-tight text-base font-black">{match.teamA.name}</span>
                            </div>
                            {match.runsA && (
                              <span className="font-mono font-black text-base">{match.runsA}/{match.wicketsA}</span>
                            )}
                          </div>

                          <div className="flex justify-between items-center text-sm font-extrabold text-foreground">
                            <div className="flex items-center gap-2.5">
                              {getTeamLogo(match.teamB.name, match.teamB.shortName) ? (
                                <img
                                  src={getTeamLogo(match.teamB.name, match.teamB.shortName)}
                                  className="size-6 object-contain select-none"
                                  alt={`${match.teamB.name} logo`}
                                />
                              ) : (
                                <div className="size-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-[10px] select-none">
                                  {match.teamB.shortName[0]}
                                </div>
                              )}
                              <span className="tracking-tight text-base font-black">{match.teamB.name}</span>
                            </div>
                            {match.runsB && (
                              <span className="font-mono font-black text-base">{match.runsB}/{match.wicketsB}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-border/60 mt-4 pt-4 flex flex-col gap-3">
                        <div className="text-[10px] text-muted-foreground flex justify-between font-mono">
                          <span className="truncate max-w-[150px]">{match.venue.split(",")[0]}</span>
                          {match.oversA && <span>{match.oversA} Overs</span>}
                        </div>

                        {/* Dynamic sleek CTA buttons */}
                        <div className="w-full">
                          {match.status === "live" && (
                            <div className="w-full text-center bg-red-600 hover:bg-red-700 text-white text-xs font-black py-2 rounded-xl transition-all flex items-center justify-center gap-1">
                              Join Fan Arena
                              <svg className="size-3.5 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </div>
                          )}
                          {match.status === "upcoming" && (
                            <div className="w-full text-center bg-muted/60 text-foreground border border-border group-hover:border-primary/30 group-hover:bg-primary/[0.02] text-xs font-bold py-2 rounded-xl transition-all">
                              Pre-Match Console
                            </div>
                          )}
                          {match.status === "finished" && (
                            <div className="w-full text-center bg-sky-550 border border-sky-200 text-sky-700 bg-sky-50/50 group-hover:bg-sky-50 text-xs font-black py-2 rounded-xl transition-all">
                              View Match Summary
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
                
                {/* Symmetrical Inline Developer Credit Block */}
                <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border/40 pt-8 mt-12 mb-6 text-xs md:text-sm text-muted-foreground select-none font-medium gap-4">
                  <span className="font-mono text-[11px] md:text-xs">Organized by Google Developer Groups</span>
                  <div className="flex items-center gap-4">
                    <span>Developed by <strong className="font-bold text-foreground">Suryanshu Nabheet</strong></span>
                    <span className="text-muted-foreground/30">•</span>
                    <a
                      href="https://github.com/Suryanshu-Nabheet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center"
                      title="GitHub Profile"
                    >
                      <svg className="size-4 md:size-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                    <a
                      href="https://x.com/SuryanshuXDev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center"
                      title="Twitter Profile"
                    >
                      <svg className="size-4 md:size-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* SCREEN 2: FOCUSED MATCH DETAIL PANEL */}
        {activeScreen === "details" && (
          <div className="space-y-6 flex flex-col">

            {/* Nav Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/60">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setActiveScreen("fixtures");
                  setDetail(null);
                }}
                className="rounded-full text-foreground border border-border bg-background flex items-center gap-2 cursor-pointer"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Fixtures
              </Button>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">
                  {detail?.seriesName || "IPL 2026"}
                </span>
                {detail && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={triggerRefresh}
                    disabled={refreshing}
                    className="h-8 rounded-lg px-3 text-xs font-bold border border-border text-foreground hover:bg-muted cursor-pointer flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 select-none"
                  >
                    {refreshing ? (
                      <>
                        <svg className="size-3 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span className="text-muted-foreground font-medium">Syncing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="size-3 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4" />
                        </svg>
                        <span>Sync Now</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {loadingDetail ? (
              <div className="border border-border rounded-2xl p-16 bg-card/40 backdrop-blur-md text-center text-muted-foreground min-h-[450px] flex items-center justify-center font-mono text-xs">
                Synchronizing live match feeds from RapidAPI...
              </div>
            ) : detail ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* 1. Left Match Details Console (8 Cols) */}
                <div className="lg:col-span-8 space-y-6">

                  {/* Scoreboard block */}
                  <div className="border border-border rounded-2xl p-6 bg-background shadow-xs">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded-sm">
                        {displayStatus === "finished" ? "Match Complete" : displayStatus === "upcoming" ? "Pre-Match Info" : "Live Feed"}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground truncate max-w-[200px]" title={displayVenue}>
                        {displayVenue}
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
                            {detail.runsA ? (
                              <span className="font-mono font-black text-2xl text-foreground">
                                {detail.runsA}/{detail.wicketsA} <span className="text-xs text-muted-foreground font-normal">({detail.oversA} Ov)</span>
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground font-semibold font-mono">Yet to Bat</span>
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
                            {detail.runsB ? (
                              <span className="font-mono font-black text-2xl text-foreground">
                                {detail.runsB}/{detail.wicketsB} <span className="text-xs text-muted-foreground font-normal">({detail.oversB} Ov)</span>
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground font-semibold font-mono">Yet to Bat</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-end md:items-end space-y-2 text-xs text-muted-foreground">
                        {displayStatus === "live" && detail.crr && (
                          <div>
                            <span className="font-medium mr-1.5">Current Run Rate:</span>
                            <strong className="font-mono text-foreground font-extrabold">{detail.crr}</strong>
                          </div>
                        )}
                        {displayStatus === "live" && detail.rrr && (
                          <div>
                            <span className="font-medium mr-1.5">Required Run Rate:</span>
                            <strong className="font-mono text-foreground font-extrabold">{detail.rrr}</strong>
                          </div>
                        )}
                        {displayStatus === "live" && detail.target && (
                          <div>
                            <span className="font-medium mr-1.5">Target Score:</span>
                            <strong className="font-mono text-primary font-black">{detail.target} Runs</strong>
                          </div>
                        )}
                        {detail.statusDescription && (
                          <div className="text-xs font-black text-primary text-left md:text-right mt-2 bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-lg">
                            {detail.statusDescription}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Compact Premium Match Information Card */}
                    <div className="py-4 border-t border-b border-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                          Venue
                        </span>
                        <p className="text-xs font-bold text-foreground leading-snug">
                          {displayVenue}
                        </p>
                        {(displayVenueCity || displayVenueCountry) && (
                          <p className="text-[10px] text-muted-foreground leading-tight">
                            {displayVenueCity}{displayVenueCity && displayVenueCountry ? ", " : ""}{displayVenueCountry}
                          </p>
                        )}
                        {detail.timezone && (
                          <span className="text-[9px] font-mono text-muted-foreground/80 block mt-0.5">
                            TZ: {detail.timezone}
                          </span>
                        )}
                      </div>

                      {displayToss && (
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                            Toss Results
                          </span>
                          <p className="text-xs font-bold text-foreground leading-snug">
                            {displayToss}
                          </p>
                        </div>
                      )}

                      {displayFormat && (
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                            Format
                          </span>
                          <p className="text-xs font-bold text-primary font-mono uppercase tracking-wider">
                            {displayFormat}
                          </p>
                        </div>
                      )}

                      {detail.playerOfTheMatch && (
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                            Player Of The Match
                          </span>
                          <p className="text-xs font-bold text-foreground leading-snug bg-primary/5 px-2 py-1 rounded-md border border-primary/10 inline-block">
                            ★ {detail.playerOfTheMatch}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Sleek Officials Row */}
                    {(detail.umpires || detail.thirdUmpire || detail.referee) && (
                      <div className="py-2.5 border-b border-border/40 flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-muted-foreground text-left">
                        {detail.umpires && (
                          <span>
                            <strong className="font-bold text-foreground">Umpires:</strong> {detail.umpires}
                          </span>
                        )}
                        {detail.thirdUmpire && (
                          <span>
                            <strong className="font-bold text-foreground">Third Umpire:</strong> {detail.thirdUmpire}
                          </span>
                        )}
                        {detail.referee && (
                          <span>
                            <strong className="font-bold text-foreground">Match Referee:</strong> {detail.referee}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Partnership details (Live) */}
                    {displayStatus === "live" && detail.partnershipInfo && (
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

                  {/* 2. Active Batsmen Stats (Live Only) */}
                  {displayStatus === "live" && detail.activeBatters.length > 0 && (
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

                  {/* 3. Active Bowlers Stats (Live Only) */}
                  {displayStatus === "live" && detail.activeBowlers.length > 0 && (
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

                  {/* 4. Complete Innings Scorecards (Finished Matches / Live Scorecards) */}
                  {detail.scorecard && detail.scorecard.length > 0 && (
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

                          {/* Batsmen score table */}
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

                          {/* Bowlers score table */}
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
                  )}

                  {/* 5. Squad Playing XIs (Side by Side) */}
                  {detail.playingXI_A.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                      <div className="border border-border rounded-2xl p-5 bg-background shadow-xs">
                        <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                          {detail.teamA.shortName} Playing XI
                        </span>
                        <ul className="space-y-2.5 font-medium text-left">
                          {detail.playingXI_A.map((player, idx) => (
                            <li key={idx} className="flex justify-between items-center py-1 border-b border-border/30 last:border-b-0">
                              <span className="text-foreground font-bold">{player}</span>
                              <span className="text-[9px] font-mono text-muted-foreground">#{(idx + 1).toString().padStart(2, "0")}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border border-border rounded-2xl p-5 bg-background shadow-xs">
                        <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                          {detail.teamB.shortName} Playing XI
                        </span>
                        <ul className="space-y-2.5 font-medium text-left">
                          {detail.playingXI_B.map((player, idx) => (
                            <li key={idx} className="flex justify-between items-center py-1 border-b border-border/30 last:border-b-0">
                              <span className="text-foreground font-bold">{player}</span>
                              <span className="text-[9px] font-mono text-muted-foreground">#{(idx + 1).toString().padStart(2, "0")}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Symmetrical Inline Developer Credit Block */}
                  <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border/40 pt-8 mt-12 mb-6 text-xs md:text-sm text-muted-foreground select-none font-medium gap-4">
                    <span className="font-mono text-[11px] md:text-xs">Organized by Google Developer Groups</span>
                    <div className="flex items-center gap-4">
                      <span>Developed by <strong className="font-bold text-foreground">Suryanshu Nabheet</strong></span>
                      <span className="text-muted-foreground/30">•</span>
                      <a
                        href="https://github.com/Suryanshu-Nabheet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center"
                        title="GitHub Profile"
                      >
                        <svg className="size-4 md:size-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </a>
                      <a
                        href="https://x.com/SuryanshuXDev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center"
                        title="Twitter Profile"
                      >
                        <svg className="size-4 md:size-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                </div>

                {/* 2. State-of-the-Art Match AI Assistant Chat Sidebar (4 Cols) */}
                <div className="lg:col-span-4 lg:sticky lg:top-24 h-[600px] flex flex-col border border-border rounded-2xl bg-card shadow-xs overflow-hidden">

                  {/* AI Sidebar Header */}
                  <div className="px-5 py-4 border-b border-border bg-background flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Sparkles className="size-4 animate-pulse" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-sm font-bold text-foreground tracking-tight">Match AI Assistant</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="relative flex size-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                          </span>
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest font-mono">Live Match Context Synced</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Sidebar Messages Viewport */}
                  <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-border">
                    {chatMessages.map((msg) => {
                      const isAssistant = msg.role === "assistant";
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col gap-1.5 ${isAssistant ? "items-start" : "items-end"}`}
                        >
                          <div className={`flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground uppercase font-mono tracking-wider ${isAssistant ? "pl-1" : "pr-1"}`}>
                            {isAssistant ? (
                              <>
                                <Bot className="size-3 text-primary" />
                                <span>Match AI</span>
                              </>
                            ) : (
                              <>
                                <span>You</span>
                                <User className="size-3 text-muted-foreground" />
                              </>
                            )}
                          </div>

                          <div
                            className={`text-xs px-4 py-2.5 rounded-2xl leading-relaxed text-left border ${isAssistant
                              ? "bg-muted/40 text-foreground border-border/40 rounded-tl-xs max-w-[90%]"
                              : "bg-primary text-primary-foreground border-primary rounded-tr-xs max-w-[85%]"
                              }`}
                          >
                            {msg.content.split("\n").map((para, i) => (
                              <p key={i} className={i > 0 ? "mt-1.5" : ""}>
                                {para.split("**").map((chunk, idx) =>
                                  idx % 2 === 1 ? <strong key={idx} className="font-extrabold">{chunk}</strong> : chunk
                                )}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    {aiLoading && (
                      <div className="flex flex-col gap-1.5 items-start">
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground uppercase font-mono tracking-wider pl-1">
                          <Bot className="size-3 text-primary" />
                          <span>Match AI is typing...</span>
                        </div>
                        <div className="bg-muted/40 border border-border/40 text-muted-foreground text-xs px-4 py-3 rounded-2xl rounded-tl-xs max-w-[90%] flex items-center gap-2">
                          <svg className="size-3.5 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span className="font-mono text-[10px]">Analyzing live match scorecard database...</span>
                        </div>
                      </div>
                    )}
                    {/* Scroll anchor controlled by parent scrollTo */}
                  </div>

                  {/* AI Sidebar Input Footer (Symmetrical Prompt Input Style) */}
                  <div className="p-4 border-t border-border bg-background">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendChatMessage();
                      }}
                      className="border border-border bg-popover rounded-2xl shadow-xs p-1 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all duration-200"
                    >
                      <textarea
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendChatMessage();
                          }
                        }}
                        placeholder="Ask anything about this match..."
                        rows={2}
                        className="w-full text-xs bg-transparent border-0 ring-0 outline-hidden resize-none px-3 py-2 text-foreground placeholder:text-muted-foreground"
                      />

                      <div className="flex items-center justify-end px-2 pb-2">
                        {/* Submit Button */}
                        <Button
                          type="submit"
                          size="icon"
                          disabled={!chatInput.trim() || aiLoading}
                          className="size-7 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-95"
                        >
                          {aiLoading ? (
                            <span className="size-2 bg-primary-foreground rounded-xs animate-pulse" />
                          ) : (
                            <ArrowUp className="size-3.5" />
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>

                </div>

              </div>
            ) : (
              <div className="border border-border rounded-2xl p-16 bg-background text-center text-muted-foreground min-h-[300px] flex items-center justify-center font-mono text-xs">
                Could not fetch match information. Please check credentials and try again.
              </div>
            )}
          </div>
        )}

      </main>

    </div>
  );
}
