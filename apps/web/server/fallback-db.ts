import { Match, MatchDetail } from "./cricket";

export const FALLBACK_MATCHES: Match[] = [
  {
    id: "ipl2026-m01",
    seriesName: "Indian Premier League 2026",
    teamA: {
      id: "rcb-01",
      name: "Royal Challengers Bengaluru",
      shortName: "RCB"
    },
    teamB: {
      id: "csk-02",
      name: "Chennai Super Kings",
      shortName: "CSK"
    },
    status: "live",
    date: new Date().toISOString(),
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    tossResult: "Chennai Super Kings won the toss & elected to bowl",
    runsA: "218",
    wicketsA: "5",
    oversA: "20.0",
    runsB: "162",
    wicketsB: "4",
    oversB: "15.4",
    crr: "10.34",
    rrr: "13.38",
    target: "219",
    result: "CSK needs 57 runs in 26 balls",
    isIPL: true
  },
  {
    id: "ipl2026-m02",
    seriesName: "Indian Premier League 2026",
    teamA: {
      id: "mi-03",
      name: "Mumbai Indians",
      shortName: "MI"
    },
    teamB: {
      id: "kkr-04",
      name: "Kolkata Knight Riders",
      shortName: "KKR"
    },
    status: "upcoming",
    date: new Date(Date.now() + 86400000).toISOString(),
    venue: "Wankhede Stadium, Mumbai",
    tossResult: "Match begins tomorrow at 19:30 IST",
    result: "Upcoming Match",
    isIPL: true
  },
  {
    id: "ipl2026-m03",
    seriesName: "Indian Premier League 2026",
    teamA: {
      id: "rr-05",
      name: "Rajasthan Royals",
      shortName: "RR"
    },
    teamB: {
      id: "srh-06",
      name: "Sunrisers Hyderabad",
      shortName: "SRH"
    },
    status: "finished",
    date: new Date(Date.now() - 86400000).toISOString(),
    venue: "Narendra Modi Stadium, Ahmedabad",
    tossResult: "Rajasthan Royals won the toss & elected to bat",
    runsA: "201",
    wicketsA: "4",
    oversA: "20.0",
    runsB: "186",
    wicketsB: "8",
    oversB: "20.0",
    result: "RR won by 15 runs",
    isIPL: true
  },
  {
    id: "ipl2026-m04",
    seriesName: "Indian Premier League 2026",
    teamA: {
      id: "dc-07",
      name: "Delhi Capitals",
      shortName: "DC"
    },
    teamB: {
      id: "gt-08",
      name: "Gujarat Titans",
      shortName: "GT"
    },
    status: "live",
    date: new Date().toISOString(),
    venue: "Arun Jaitley Stadium, Delhi",
    tossResult: "Gujarat Titans won the toss & elected to bowl",
    runsA: "184",
    wicketsA: "6",
    oversA: "18.2",
    crr: "10.04",
    result: "Delhi Capitals batting first",
    isIPL: true
  }
];

export const FALLBACK_MATCH_DETAILS: Record<string, MatchDetail> = {
  "ipl2026-m01": {
    id: "ipl2026-m01",
    seriesName: "Indian Premier League 2026",
    teamA: {
      id: "rcb-01",
      name: "Royal Challengers Bengaluru",
      shortName: "RCB"
    },
    teamB: {
      id: "csk-02",
      name: "Chennai Super Kings",
      shortName: "CSK"
    },
    status: "live",
    date: new Date().toISOString(),
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    tossResult: "Chennai Super Kings won the toss & elected to bowl",
    runsA: "218",
    wicketsA: "5",
    oversA: "20.0",
    runsB: "162",
    wicketsB: "4",
    oversB: "15.4",
    crr: "10.34",
    rrr: "13.38",
    target: "219",
    result: "CSK needs 57 runs in 26 balls",
    isIPL: true,
    playingXI_A: [
      "Virat Kohli",
      "Faf du Plessis (c)",
      "Rajat Patidar",
      "Glenn Maxwell",
      "Cameron Green",
      "Dinesh Karthik (wk)",
      "Mahipal Lomror",
      "Karn Sharma",
      "Mohammed Siraj",
      "Yash Dayal",
      "Swapnil Singh"
    ],
    playingXI_B: [
      "Ruturaj Gaikwad (c)",
      "Rachin Ravindra",
      "Ajinkya Rahane",
      "Daryl Mitchell",
      "Shivam Dube",
      "Ravindra Jadeja",
      "MS Dhoni (wk)",
      "Mitchell Santner",
      "Shardul Thakur",
      "Tushar Deshpande",
      "Maheesh Theekshana"
    ],
    activeBatters: [
      {
        name: "MS Dhoni",
        runs: 28,
        ballsFaced: 11,
        strikeRate: 254.55,
        fours: 2,
        sixes: 3,
        outDec: "batting"
      },
      {
        name: "Ravindra Jadeja",
        runs: 41,
        ballsFaced: 22,
        strikeRate: 186.36,
        fours: 4,
        sixes: 1,
        outDec: "batting"
      }
    ],
    activeBowlers: [
      {
        name: "Yash Dayal",
        overs: 3.4,
        maidens: 0,
        runsConceded: 42,
        wickets: 1,
        economy: 11.45
      },
      {
        name: "Mohammed Siraj",
        overs: 3.0,
        maidens: 0,
        runsConceded: 35,
        wickets: 2,
        economy: 11.67
      }
    ],
    partnershipInfo: "69 runs off 31 balls between MS Dhoni and Ravindra Jadeja",
    timeline: ["6", "Wd", "4", "1", "6", "W"],
    scorecard: [
      {
        inningsId: 1,
        batTeamName: "Royal Challengers Bengaluru",
        runs: "218",
        wickets: "5",
        overs: "20.0",
        batsmen: [
          { name: "Virat Kohli", runs: 47, ballsFaced: 29, strikeRate: 162.07, fours: 3, sixes: 4, outDec: "c Santner b Thakur" },
          { name: "Faf du Plessis", runs: 54, ballsFaced: 39, strikeRate: 138.46, fours: 3, sixes: 3, outDec: "run out (Santner)" },
          { name: "Rajat Patidar", runs: 41, ballsFaced: 23, strikeRate: 178.26, fours: 2, sixes: 4, outDec: "c Mitchell b Thakur" },
          { name: "Glenn Maxwell", runs: 16, ballsFaced: 5, strikeRate: 320.0, fours: 1, sixes: 2, outDec: "c Dhoni b Deshpande" },
          { name: "Cameron Green", runs: 38, ballsFaced: 17, strikeRate: 223.53, fours: 3, sixes: 3, outDec: "not out" },
          { name: "Dinesh Karthik", runs: 14, ballsFaced: 6, strikeRate: 233.33, fours: 1, sixes: 1, outDec: "c Dhoni b Deshpande" }
        ],
        bowlers: [
          { name: "Tushar Deshpande", overs: 4.0, maidens: 0, runsConceded: 49, wickets: 2, economy: 12.25 },
          { name: "Maheesh Theekshana", overs: 4.0, maidens: 0, runsConceded: 25, wickets: 0, economy: 6.25 },
          { name: "Mitchell Santner", overs: 4.0, maidens: 0, runsConceded: 23, wickets: 0, economy: 5.75 },
          { name: "Shardul Thakur", overs: 4.0, maidens: 0, runsConceded: 61, wickets: 2, economy: 15.25 }
        ]
      },
      {
        inningsId: 2,
        batTeamName: "Chennai Super Kings",
        runs: "162",
        wickets: "4",
        overs: "15.4",
        batsmen: [
          { name: "Ruturaj Gaikwad", runs: 0, ballsFaced: 1, strikeRate: 0.0, fours: 0, sixes: 0, outDec: "c Green b Siraj" },
          { name: "Rachin Ravindra", runs: 61, ballsFaced: 37, strikeRate: 164.86, fours: 5, sixes: 3, outDec: "run out (Swapnil)" },
          { name: "Ajinkya Rahane", runs: 33, ballsFaced: 22, strikeRate: 150.0, fours: 3, sixes: 1, outDec: "c du Plessis b Siraj" },
          { name: "Daryl Mitchell", runs: 4, ballsFaced: 6, strikeRate: 66.67, fours: 0, sixes: 0, outDec: "c Kohli b Dayal" },
          { name: "Ravindra Jadeja", runs: 41, ballsFaced: 22, strikeRate: 186.36, fours: 4, sixes: 1, outDec: "batting" },
          { name: "MS Dhoni", runs: 28, ballsFaced: 11, strikeRate: 254.55, fours: 2, sixes: 3, outDec: "batting" }
        ],
        bowlers: [
          { name: "Glenn Maxwell", overs: 4.0, maidens: 0, runsConceded: 25, wickets: 0, economy: 6.25 },
          { name: "Mohammed Siraj", overs: 3.0, maidens: 0, runsConceded: 35, wickets: 2, economy: 11.67 },
          { name: "Yash Dayal", overs: 3.4, maidens: 0, runsConceded: 42, wickets: 1, economy: 11.45 },
          { name: "Karn Sharma", overs: 4.0, maidens: 0, runsConceded: 48, wickets: 0, economy: 12.0 }
        ]
      }
    ],
    tossWinnerName: "Chennai Super Kings",
    tossDecision: "bowl",
    playerOfTheMatch: "Not announced yet",
    umpires: "K.N. Ananthapadmanabhan, Michael Gough",
    thirdUmpire: "Jayaraman Madanagopal",
    referee: "Javagal Srinath",
    venueGround: "M. Chinnaswamy Stadium",
    venueCity: "Bengaluru",
    venueCountry: "India",
    timezone: "IST (UTC+5:30)",
    matchType: "T20 League Match",
    statusDescription: "CSK chasing 219. MS Dhoni and Ravindra Jadeja at the crease."
  },
  "ipl2026-m02": {
    id: "ipl2026-m02",
    seriesName: "Indian Premier League 2026",
    teamA: {
      id: "mi-03",
      name: "Mumbai Indians",
      shortName: "MI"
    },
    teamB: {
      id: "kkr-04",
      name: "Kolkata Knight Riders",
      shortName: "KKR"
    },
    status: "upcoming",
    date: new Date(Date.now() + 86400000).toISOString(),
    venue: "Wankhede Stadium, Mumbai",
    tossResult: "Match begins tomorrow at 19:30 IST",
    result: "Upcoming Match",
    isIPL: true,
    playingXI_A: [
      "Rohit Sharma",
      "Ishan Kishan (wk)",
      "Suryakumar Yadav",
      "Hardik Pandya (c)",
      "Tilak Varma",
      "Tim David",
      "Nehal Wadhera",
      "Gerald Coetzee",
      "Jasprit Bumrah",
      "Piyush Chawla",
      "Nuwan Thushara"
    ],
    playingXI_B: [
      "Phil Salt (wk)",
      "Sunil Narine",
      "Venkatesh Iyer",
      "Shreyas Iyer (c)",
      "Rinku Singh",
      "Andre Russell",
      "Ramandeep Singh",
      "Mitchell Starc",
      "Varun Chakaravarthy",
      "Harshit Rana",
      "Vaibhav Arora"
    ],
    activeBatters: [],
    activeBowlers: [],
    timeline: [],
    scorecard: [],
    tossWinnerName: "Toss pending",
    tossDecision: "Toss pending",
    playerOfTheMatch: "Toss pending",
    umpires: "Anil Chaudhary, Chris Gaffaney",
    thirdUmpire: "Nitin Menon",
    referee: "Manu Nayyar",
    venueGround: "Wankhede Stadium",
    venueCity: "Mumbai",
    venueCountry: "India",
    timezone: "IST (UTC+5:30)",
    matchType: "T20 League Match",
    statusDescription: "Pre-match preparations underway. Toss scheduled at 19:00 IST."
  },
  "ipl2026-m03": {
    id: "ipl2026-m03",
    seriesName: "Indian Premier League 2026",
    teamA: {
      id: "rr-05",
      name: "Rajasthan Royals",
      shortName: "RR"
    },
    teamB: {
      id: "srh-06",
      name: "Sunrisers Hyderabad",
      shortName: "SRH"
    },
    status: "finished",
    date: new Date(Date.now() - 86400000).toISOString(),
    venue: "Narendra Modi Stadium, Ahmedabad",
    tossResult: "Rajasthan Royals won the toss & elected to bat",
    runsA: "201",
    wicketsA: "4",
    oversA: "20.0",
    runsB: "186",
    wicketsB: "8",
    oversB: "20.0",
    result: "RR won by 15 runs",
    isIPL: true,
    playingXI_A: [
      "Yashasvi Jaiswal",
      "Jos Buttler",
      "Sanju Samson (c & wk)",
      "Riyan Parag",
      "Shimron Hetmyer",
      "Dhruv Jurel",
      "Ravichandran Ashwin",
      "Trent Boult",
      "Avesh Khan",
      "Sandeep Sharma",
      "Yuzvendra Chahal"
    ],
    playingXI_B: [
      "Travis Head",
      "Abhishek Sharma",
      "Nitish Reddy",
      "Heinrich Klaasen (wk)",
      "Aiden Markram",
      "Abdul Samad",
      "Shahbaz Ahmed",
      "Pat Cummins (c)",
      "Bhuvneshwar Kumar",
      "Jaydev Unadkat",
      "T. Natarajan"
    ],
    activeBatters: [],
    activeBowlers: [],
    timeline: ["1", "4", "W", "2", "6", "W"],
    scorecard: [
      {
        inningsId: 1,
        batTeamName: "Rajasthan Royals",
        runs: "201",
        wickets: "4",
        overs: "20.0",
        batsmen: [
          { name: "Yashasvi Jaiswal", runs: 82, ballsFaced: 45, strikeRate: 182.22, fours: 8, sixes: 4, outDec: "c Cummins b Natarajan" },
          { name: "Jos Buttler", runs: 30, ballsFaced: 20, strikeRate: 150.0, fours: 4, sixes: 0, outDec: "c Klaasen b Bhuvneshwar" },
          { name: "Sanju Samson", runs: 45, ballsFaced: 28, strikeRate: 160.71, fours: 3, sixes: 2, outDec: "c Markram b Cummins" },
          { name: "Riyan Parag", runs: 36, ballsFaced: 19, strikeRate: 189.47, fours: 2, sixes: 3, outDec: "not out" },
          { name: "Shimron Hetmyer", runs: 8, ballsFaced: 8, strikeRate: 100.0, fours: 0, sixes: 1, outDec: "c Head b Natarajan" }
        ],
        bowlers: [
          { name: "Bhuvneshwar Kumar", overs: 4.0, maidens: 0, runsConceded: 38, wickets: 1, economy: 9.5 },
          { name: "Pat Cummins", overs: 4.0, maidens: 0, runsConceded: 42, wickets: 1, economy: 10.5 },
          { name: "T. Natarajan", overs: 4.0, maidens: 0, runsConceded: 35, wickets: 2, economy: 8.75 },
          { name: "Shahbaz Ahmed", overs: 4.0, maidens: 0, runsConceded: 46, wickets: 0, economy: 11.5 }
        ]
      },
      {
        inningsId: 2,
        batTeamName: "Sunrisers Hyderabad",
        runs: "186",
        wickets: "8",
        overs: "20.0",
        batsmen: [
          { name: "Travis Head", runs: 58, ballsFaced: 32, strikeRate: 181.25, fours: 6, sixes: 3, outDec: "b Chahal" },
          { name: "Abhishek Sharma", runs: 12, ballsFaced: 8, strikeRate: 150.0, fours: 1, sixes: 1, outDec: "c Buttler b Boult" },
          { name: "Nitish Reddy", runs: 24, ballsFaced: 16, strikeRate: 150.0, fours: 2, sixes: 1, outDec: "c Samson b Ashwin" },
          { name: "Heinrich Klaasen", runs: 42, ballsFaced: 24, strikeRate: 175.0, fours: 3, sixes: 2, outDec: "c Samson b Sandeep" },
          { name: "Pat Cummins", runs: 15, ballsFaced: 10, strikeRate: 150.0, fours: 1, sixes: 1, outDec: "c Ashwin b Avesh" }
        ],
        bowlers: [
          { name: "Trent Boult", overs: 4.0, maidens: 0, runsConceded: 28, wickets: 2, economy: 7.0 },
          { name: "Sandeep Sharma", overs: 4.0, maidens: 0, runsConceded: 32, wickets: 2, economy: 8.0 },
          { name: "Yuzvendra Chahal", overs: 4.0, maidens: 0, runsConceded: 41, wickets: 2, economy: 10.25 },
          { name: "Avesh Khan", overs: 4.0, maidens: 0, runsConceded: 43, wickets: 1, economy: 10.75 }
        ]
      }
    ],
    tossWinnerName: "Rajasthan Royals",
    tossDecision: "bat",
    playerOfTheMatch: "Yashasvi Jaiswal",
    umpires: "Rohan Pandit, Tapan Sharma",
    thirdUmpire: "Ulhas Gandhe",
    referee: "Amit Sharma",
    venueGround: "Narendra Modi Stadium",
    venueCity: "Ahmedabad",
    venueCountry: "India",
    timezone: "IST (UTC+5:30)",
    matchType: "T20 League Match",
    statusDescription: "Rajasthan Royals won by 15 runs. Yashasvi Jaiswal named Player of the Match for his blistering 82."
  },
  "ipl2026-m04": {
    id: "ipl2026-m04",
    seriesName: "Indian Premier League 2026",
    teamA: {
      id: "dc-07",
      name: "Delhi Capitals",
      shortName: "DC"
    },
    teamB: {
      id: "gt-08",
      name: "Gujarat Titans",
      shortName: "GT"
    },
    status: "live",
    date: new Date().toISOString(),
    venue: "Arun Jaitley Stadium, Delhi",
    tossResult: "Gujarat Titans won the toss & elected to bowl",
    runsA: "184",
    wicketsA: "6",
    oversA: "18.2",
    crr: "10.04",
    result: "Delhi Capitals batting first",
    isIPL: true,
    playingXI_A: [
      "Prithvi Shaw",
      "Jake Fraser-McGurk",
      "Abishek Porel",
      "Rishabh Pant (c & wk)",
      "Tristan Stubbs",
      "Axar Patel",
      "Kumar Kushagra",
      "Kuldeep Yadav",
      "Khaleel Ahmed",
      "Mukesh Kumar",
      "Rasikh Dar Salam"
    ],
    playingXI_B: [
      "Shubman Gill (c)",
      "Sai Sudharsan",
      "David Miller",
      "Azmatullah Omarzai",
      "Rahul Tewatia",
      "Shahrukh Khan",
      "Rashid Khan",
      "Wridhiman Saha (wk)",
      "Umesh Yadav",
      "Spencer Johnson",
      "Mohit Sharma"
    ],
    activeBatters: [
      {
        name: "Rishabh Pant",
        runs: 54,
        ballsFaced: 31,
        strikeRate: 174.19,
        fours: 4,
        sixes: 3,
        outDec: "batting"
      },
      {
        name: "Tristan Stubbs",
        runs: 22,
        ballsFaced: 10,
        strikeRate: 220.0,
        fours: 2,
        sixes: 1,
        outDec: "batting"
      }
    ],
    activeBowlers: [
      {
        name: "Rashid Khan",
        overs: 3.2,
        maidens: 0,
        runsConceded: 28,
        wickets: 2,
        economy: 8.4
      },
      {
        name: "Mohit Sharma",
        overs: 4.0,
        maidens: 0,
        runsConceded: 48,
        wickets: 1,
        economy: 12.0
      }
    ],
    partnershipInfo: "43 runs off 18 balls between Rishabh Pant and Tristan Stubbs",
    timeline: ["1", "6", "4", "2", "6", "1"],
    scorecard: [
      {
        inningsId: 1,
        batTeamName: "Delhi Capitals",
        runs: "184",
        wickets: "6",
        overs: "18.2",
        batsmen: [
          { name: "Prithvi Shaw", runs: 12, ballsFaced: 9, strikeRate: 133.33, fours: 2, sixes: 0, outDec: "c Gill b Umesh" },
          { name: "Jake Fraser-McGurk", runs: 35, ballsFaced: 14, strikeRate: 250.0, fours: 4, sixes: 3, outDec: "c Miller b Rashid" },
          { name: "Abishek Porel", runs: 8, ballsFaced: 7, strikeRate: 114.29, fours: 1, sixes: 0, outDec: "c Saha b Mohit" },
          { name: "Rishabh Pant", runs: 54, ballsFaced: 31, strikeRate: 174.19, fours: 4, sixes: 3, outDec: "batting" },
          { name: "Axar Patel", runs: 41, ballsFaced: 26, strikeRate: 157.69, fours: 3, sixes: 2, outDec: "c Tewatia b Rashid" },
          { name: "Tristan Stubbs", runs: 22, ballsFaced: 10, strikeRate: 220.0, fours: 2, sixes: 1, outDec: "batting" }
        ],
        bowlers: [
          { name: "Umesh Yadav", overs: 4.0, maidens: 0, runsConceded: 42, wickets: 1, economy: 10.5 },
          { name: "Spencer Johnson", overs: 3.0, maidens: 0, runsConceded: 34, wickets: 0, economy: 11.33 },
          { name: "Rashid Khan", overs: 4.0, maidens: 0, runsConceded: 28, wickets: 2, economy: 7.0 },
          { name: "Mohit Sharma", overs: 4.0, maidens: 0, runsConceded: 48, wickets: 1, economy: 12.0 }
        ]
      }
    ],
    tossWinnerName: "Gujarat Titans",
    tossDecision: "bowl",
    playerOfTheMatch: "Not announced yet",
    umpires: "Niranjan Bangalore, Yeshwant Barde",
    thirdUmpire: "Virender Sharma",
    referee: "Sanjay Verma",
    venueGround: "Arun Jaitley Stadium",
    venueCity: "Delhi",
    venueCountry: "India",
    timezone: "IST (UTC+5:30)",
    matchType: "T20 League Match",
    statusDescription: "Delhi Capitals batting first. Rishabh Pant hitting a masterful fifty."
  }
};
