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
  isLocalDB?: boolean;
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
  isLocalDB?: boolean;
}
