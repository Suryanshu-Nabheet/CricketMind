import { Match, MatchDetail } from "./types";

export const FALLBACK_MATCHES: Match[] = [
  {
    "id": "152207",
    "seriesName": "Indian Premier League 2026",
    "teamA": {
      "id": "64",
      "name": "Rajasthan Royals",
      "shortName": "RR"
    },
    "teamB": {
      "id": "966",
      "name": "Lucknow Super Giants",
      "shortName": "LSG"
    },
    "status": "upcoming",
    "date": "2026-05-19T14:00:00.000Z",
    "venue": "Sawai Mansingh Stadium, Jaipur",
    "tossResult": "Preview",
    "result": "Preview",
    "isIPL": true
  },
  {
    "id": "152196",
    "seriesName": "Indian Premier League 2026",
    "teamA": {
      "id": "58",
      "name": "Chennai Super Kings",
      "shortName": "CSK"
    },
    "teamB": {
      "id": "255",
      "name": "Sunrisers Hyderabad",
      "shortName": "SRH"
    },
    "status": "finished",
    "date": "2026-05-18T14:00:00.000Z",
    "venue": "MA Chidambaram Stadium, Chennai",
    "tossResult": "Sunrisers Hyderabad won by 5 wkts",
    "runsA": "180",
    "wicketsA": "7",
    "oversA": "19.6",
    "runsB": "181",
    "wicketsB": "5",
    "oversB": "18.6",
    "crr": "9.53",
    "result": "Sunrisers Hyderabad won by 5 wkts",
    "isIPL": true
  },
  {
    "id": "152185",
    "seriesName": "Indian Premier League 2026",
    "teamA": {
      "id": "64",
      "name": "Rajasthan Royals",
      "shortName": "RR"
    },
    "teamB": {
      "id": "61",
      "name": "Delhi Capitals",
      "shortName": "DC"
    },
    "status": "finished",
    "date": "2026-05-17T14:00:00.000Z",
    "venue": "Arun Jaitley Stadium, Delhi",
    "tossResult": "Delhi Capitals won by 5 wkts",
    "runsA": "193",
    "wicketsA": "8",
    "oversA": "19.6",
    "runsB": "197",
    "wicketsB": "5",
    "oversB": "19.2",
    "crr": "10.19",
    "target": "194",
    "result": "Delhi Capitals won by 5 wkts",
    "isIPL": true
  },
  {
    "id": "152174",
    "seriesName": "Indian Premier League 2026",
    "teamA": {
      "id": "59",
      "name": "Royal Challengers Bengaluru",
      "shortName": "RCB"
    },
    "teamB": {
      "id": "65",
      "name": "Punjab Kings",
      "shortName": "PBKS"
    },
    "status": "finished",
    "date": "2026-05-17T10:00:00.000Z",
    "venue": "Himachal Pradesh Cricket Association Stadium, Dharamsala",
    "tossResult": "Royal Challengers Bengaluru won by 23 runs",
    "runsA": "222",
    "wicketsA": "4",
    "oversA": "19.6",
    "runsB": "199",
    "wicketsB": "8",
    "oversB": "19.6",
    "crr": "9.95",
    "target": "223",
    "result": "Royal Challengers Bengaluru won by 23 runs",
    "isIPL": true
  }
];

export const FALLBACK_MATCH_DETAILS: Record<string, MatchDetail> = {
  "152174": {
    "id": "152174",
    "seriesName": "Indian Premier League 2026",
    "teamA": {
      "id": "59",
      "name": "Royal Challengers Bengaluru",
      "shortName": "RCB"
    },
    "teamB": {
      "id": "65",
      "name": "Punjab Kings",
      "shortName": "PBKS"
    },
    "status": "finished",
    "date": "2026-05-17T10:00:00.000Z",
    "venue": "Himachal Pradesh Cricket Association Stadium, Dharamsala",
    "tossResult": "Royal Challengers Bengaluru won by 23 runs",
    "runsA": "222",
    "wicketsA": "4",
    "oversA": "19.6",
    "runsB": "199",
    "wicketsB": "8",
    "oversB": "19.6",
    "crr": "9.95",
    "target": "223",
    "result": "Royal Challengers Bengaluru won by 23 runs",
    "isIPL": true,
    "playingXI_A": [
      "Virat Kohli (c)",
      "Faf du Plessis",
      "Rajat Patidar",
      "Venkatesh Iyer",
      "Glenn Maxwell",
      "Tim David",
      "Krunal Pandya",
      "Bhuvneshwar Kumar",
      "Josh Hazlewood",
      "Suyash Sharma",
      "Rasikh Salam Dar"
    ],
    "playingXI_B": [
      "Priyansh Arya",
      "Prabhsimran Singh (wk)",
      "Marcus Stoinis",
      "Liam Livingstone",
      "Suryansh Shedge",
      "Shashank Singh",
      "Azmatullah Omarzai",
      "Harpreet Brar",
      "Arshdeep Singh",
      "Lockie Ferguson",
      "Yuzvendra Chahal"
    ],
    "activeBatters": [
      {
        "name": "Harpreet Brar",
        "runs": 5,
        "ballsFaced": 3,
        "strikeRate": 166.66666666666669
      },
      {
        "name": "",
        "runs": 0,
        "ballsFaced": 0,
        "strikeRate": 0
      }
    ],
    "activeBowlers": [
      {
        "name": "Josh Hazlewood",
        "overs": 4,
        "wickets": 1,
        "economy": 9
      },
      {
        "name": "Rasikh Salam Dar",
        "overs": 4,
        "wickets": 3,
        "economy": 9
      }
    ],
    "partnershipInfo": "5(4)",
    "timeline": [
      "...",
      "1",
      "0",
      "4",
      "0",
      "1",
      "1",
      "|",
      "Wd",
      "2",
      "Wd",
      "W",
      "0",
      "4",
      "1",
      "W"
    ],
    "scorecard": [
      {
        "inningsId": 1,
        "batTeamName": "Royal Challengers Bengaluru",
        "runs": "222",
        "wickets": "4",
        "overs": "20",
        "batsmen": [
          {
            "name": "Jacob Bethell",
            "runs": 11,
            "ballsFaced": 7,
            "fours": 2,
            "sixes": 0,
            "outDec": "b Harpreet Brar",
            "strikeRate": 157.14
          },
          {
            "name": "Virat Kohli",
            "runs": 58,
            "ballsFaced": 37,
            "fours": 4,
            "sixes": 3,
            "outDec": "c Priyansh Arya b Yuzvendra Chahal",
            "strikeRate": 156.76
          },
          {
            "name": "Devdutt Padikkal",
            "runs": 45,
            "ballsFaced": 25,
            "fours": 4,
            "sixes": 3,
            "outDec": "c Shreyas Iyer b Harpreet Brar",
            "strikeRate": 180
          },
          {
            "name": "Venkatesh Iyer",
            "runs": 73,
            "ballsFaced": 40,
            "fours": 8,
            "sixes": 4,
            "outDec": "not out",
            "strikeRate": 182.5
          },
          {
            "name": "Tim David",
            "runs": 28,
            "ballsFaced": 12,
            "fours": 2,
            "sixes": 2,
            "outDec": "c Harpreet Brar b Arshdeep Singh",
            "strikeRate": 233.33
          },
          {
            "name": "Jitesh Sharma",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Romario Shepherd",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Krunal Pandya",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Bhuvneshwar Kumar",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Josh Hazlewood",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Suyash Sharma",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          }
        ],
        "bowlers": [
          {
            "name": "Arshdeep Singh",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 43,
            "wickets": 1,
            "economy": 10.8
          },
          {
            "name": "Azmatullah Omarzai",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 38,
            "wickets": 0,
            "economy": 9.5
          },
          {
            "name": "Harpreet Brar",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 35,
            "wickets": 2,
            "economy": 8.8
          },
          {
            "name": "Lockie Ferguson",
            "overs": 3,
            "maidens": 0,
            "runsConceded": 43,
            "wickets": 0,
            "economy": 14.3
          },
          {
            "name": "Yuzvendra Chahal",
            "overs": 3,
            "maidens": 0,
            "runsConceded": 42,
            "wickets": 1,
            "economy": 14
          },
          {
            "name": "Shashank Singh",
            "overs": 2,
            "maidens": 0,
            "runsConceded": 20,
            "wickets": 0,
            "economy": 10
          }
        ]
      },
      {
        "inningsId": 2,
        "batTeamName": "Punjab Kings",
        "runs": "199",
        "wickets": "8",
        "overs": "20",
        "batsmen": [
          {
            "name": "Priyansh Arya",
            "runs": 0,
            "ballsFaced": 3,
            "fours": 0,
            "sixes": 0,
            "outDec": "c Romario Shepherd b Bhuvneshwar Kumar",
            "strikeRate": 0
          },
          {
            "name": "Prabhsimran Singh",
            "runs": 2,
            "ballsFaced": 5,
            "fours": 0,
            "sixes": 0,
            "outDec": "c Devdutt Padikkal b Bhuvneshwar Kumar",
            "strikeRate": 40
          },
          {
            "name": "Cooper Connolly",
            "runs": 37,
            "ballsFaced": 22,
            "fours": 3,
            "sixes": 3,
            "outDec": "c Jacob Bethell b Romario Shepherd",
            "strikeRate": 168.18
          },
          {
            "name": "Shreyas Iyer",
            "runs": 1,
            "ballsFaced": 3,
            "fours": 0,
            "sixes": 0,
            "outDec": "c Jitesh Sharma b Rasikh Salam Dar",
            "strikeRate": 33.33
          },
          {
            "name": "Suryansh Shedge",
            "runs": 35,
            "ballsFaced": 22,
            "fours": 2,
            "sixes": 2,
            "outDec": "c Virat Kohli b Suyash Sharma",
            "strikeRate": 159.09
          },
          {
            "name": "Marcus Stoinis",
            "runs": 37,
            "ballsFaced": 25,
            "fours": 5,
            "sixes": 0,
            "outDec": "lbw b Josh Hazlewood",
            "strikeRate": 148
          },
          {
            "name": "Shashank Singh",
            "runs": 56,
            "ballsFaced": 27,
            "fours": 4,
            "sixes": 4,
            "outDec": "c Virat Kohli b Rasikh Salam Dar",
            "strikeRate": 207.41
          },
          {
            "name": "Azmatullah Omarzai",
            "runs": 14,
            "ballsFaced": 10,
            "fours": 1,
            "sixes": 1,
            "outDec": "c Tim David b Rasikh Salam Dar",
            "strikeRate": 140
          },
          {
            "name": "Harpreet Brar",
            "runs": 5,
            "ballsFaced": 3,
            "fours": 1,
            "sixes": 0,
            "outDec": "not out",
            "strikeRate": 166.67
          },
          {
            "name": "Lockie Ferguson",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Arshdeep Singh",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Yuzvendra Chahal",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          }
        ],
        "bowlers": [
          {
            "name": "Bhuvneshwar Kumar",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 38,
            "wickets": 2,
            "economy": 9.5
          },
          {
            "name": "Josh Hazlewood",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 36,
            "wickets": 1,
            "economy": 9
          },
          {
            "name": "Rasikh Salam Dar",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 36,
            "wickets": 3,
            "economy": 9
          },
          {
            "name": "Suyash Sharma",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 50,
            "wickets": 1,
            "economy": 12.5
          },
          {
            "name": "Romario Shepherd",
            "overs": 1,
            "maidens": 0,
            "runsConceded": 8,
            "wickets": 1,
            "economy": 8
          },
          {
            "name": "Krunal Pandya",
            "overs": 3,
            "maidens": 0,
            "runsConceded": 27,
            "wickets": 0,
            "economy": 9
          }
        ]
      }
    ],
    "venueGround": "Himachal Pradesh Cricket Association Stadium",
    "venueCity": "Dharamsala",
    "venueCountry": "India",
    "timezone": "Asia/Kolkata",
    "matchType": "IPL T20",
    "statusDescription": "Royal Challengers Bengaluru won by 23 runs",
    "tossWinnerName": "Royal Challengers Bengaluru",
    "tossDecision": "Bat",
    "playerOfTheMatch": "Venkatesh Iyer",
    "umpires": "Jayaraman Madanagopal, Rohan Pandit",
    "thirdUmpire": "Yeshwant Barde",
    "referee": "Javagal Srinath"
  },
  "152185": {
    "id": "152185",
    "seriesName": "Indian Premier League 2026",
    "teamA": {
      "id": "64",
      "name": "Rajasthan Royals",
      "shortName": "RR"
    },
    "teamB": {
      "id": "61",
      "name": "Delhi Capitals",
      "shortName": "DC"
    },
    "status": "finished",
    "date": "2026-05-17T14:00:00.000Z",
    "venue": "Arun Jaitley Stadium, Delhi",
    "tossResult": "Delhi Capitals won by 5 wkts",
    "runsA": "193",
    "wicketsA": "8",
    "oversA": "19.6",
    "runsB": "197",
    "wicketsB": "5",
    "oversB": "19.2",
    "crr": "10.19",
    "target": "194",
    "result": "Delhi Capitals won by 5 wkts",
    "isIPL": true,
    "playingXI_A": [
      "Yashasvi Jaiswal",
      "Vaibhav Sooryavanshi",
      "Sanju Samson (c & wk)",
      "Dhruv Jurel",
      "Riyan Parag",
      "Shimron Hetmyer",
      "Donovan Ferreira",
      "Ravichandran Ashwin",
      "Trent Boult",
      "Yuzvendra Chahal",
      "Avesh Khan"
    ],
    "playingXI_B": [
      "Jake Fraser-McGurk",
      "Prithvi Shaw",
      "Abishek Porel (wk)",
      "Rishabh Pant (c)",
      "Tristan Stubbs",
      "Axar Patel",
      "Lalit Yadav",
      "Kuldeep Yadav",
      "Khaleel Ahmed",
      "Mukesh Kumar",
      "Ishant Sharma"
    ],
    "activeBatters": [
      {
        "name": "Ashutosh Sharma",
        "runs": 18,
        "ballsFaced": 5,
        "strikeRate": 360
      },
      {
        "name": "Axar Patel",
        "runs": 34,
        "ballsFaced": 18,
        "strikeRate": 188.88888888888889
      }
    ],
    "activeBowlers": [
      {
        "name": "Adam Milne",
        "overs": 3.2,
        "wickets": 0,
        "economy": 12.3
      },
      {
        "name": "Brijesh Sharma",
        "overs": 4,
        "wickets": 2,
        "economy": 11
      }
    ],
    "partnershipInfo": "22(7)",
    "timeline": [
      "...",
      "1",
      "1",
      "6",
      "|",
      "W",
      "1",
      "1",
      "Wd2",
      "1",
      "6",
      "1",
      "|",
      "4",
      "6"
    ],
    "scorecard": [
      {
        "inningsId": 1,
        "batTeamName": "Rajasthan Royals",
        "runs": "193",
        "wickets": "8",
        "overs": "20",
        "batsmen": [
          {
            "name": "Yashasvi Jaiswal",
            "runs": 12,
            "ballsFaced": 9,
            "fours": 3,
            "sixes": 0,
            "outDec": "c Mitchell Starc b Lungi Ngidi",
            "strikeRate": 133.33
          },
          {
            "name": "Vaibhav Sooryavanshi",
            "runs": 46,
            "ballsFaced": 21,
            "fours": 5,
            "sixes": 3,
            "outDec": "c David Miller b Madhav Tiwari",
            "strikeRate": 219.05
          },
          {
            "name": "Dhruv Jurel",
            "runs": 53,
            "ballsFaced": 40,
            "fours": 5,
            "sixes": 2,
            "outDec": "lbw b Lungi Ngidi",
            "strikeRate": 132.5
          },
          {
            "name": "Riyan Parag",
            "runs": 51,
            "ballsFaced": 26,
            "fours": 3,
            "sixes": 5,
            "outDec": "c Axar Patel b Mitchell Starc",
            "strikeRate": 196.15
          },
          {
            "name": "Donovan Ferreira",
            "runs": 0,
            "ballsFaced": 1,
            "fours": 0,
            "sixes": 0,
            "outDec": "c Axar Patel b Mitchell Starc",
            "strikeRate": 0
          },
          {
            "name": "Ravi Singh",
            "runs": 4,
            "ballsFaced": 2,
            "fours": 1,
            "sixes": 0,
            "outDec": "lbw b Mitchell Starc",
            "strikeRate": 200
          },
          {
            "name": "Shubham Dubey",
            "runs": 5,
            "ballsFaced": 9,
            "fours": 0,
            "sixes": 0,
            "outDec": "c Tripurana Vijay b Madhav Tiwari",
            "strikeRate": 55.56
          },
          {
            "name": "Dasun Shanaka",
            "runs": 10,
            "ballsFaced": 8,
            "fours": 0,
            "sixes": 1,
            "outDec": "c Tristan Stubbs b Mitchell Starc",
            "strikeRate": 125
          },
          {
            "name": "Jofra Archer",
            "runs": 2,
            "ballsFaced": 2,
            "fours": 0,
            "sixes": 0,
            "outDec": "not out",
            "strikeRate": 100
          },
          {
            "name": "Adam Milne",
            "runs": 2,
            "ballsFaced": 2,
            "fours": 0,
            "sixes": 0,
            "outDec": "not out",
            "strikeRate": 100
          },
          {
            "name": "Brijesh Sharma",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Yash Raj Punja",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          }
        ],
        "bowlers": [
          {
            "name": "Mitchell Starc",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 40,
            "wickets": 4,
            "economy": 10
          },
          {
            "name": "Lungi Ngidi",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 24,
            "wickets": 2,
            "economy": 6
          },
          {
            "name": "Tripurana Vijay",
            "overs": 2,
            "maidens": 0,
            "runsConceded": 29,
            "wickets": 0,
            "economy": 14.5
          },
          {
            "name": "Mukesh Kumar",
            "overs": 2,
            "maidens": 0,
            "runsConceded": 40,
            "wickets": 0,
            "economy": 20
          },
          {
            "name": "Madhav Tiwari",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 27,
            "wickets": 2,
            "economy": 6.8
          },
          {
            "name": "Axar Patel",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 31,
            "wickets": 0,
            "economy": 7.8
          }
        ]
      },
      {
        "inningsId": 2,
        "batTeamName": "Delhi Capitals",
        "runs": "197",
        "wickets": "5",
        "overs": "19.2",
        "batsmen": [
          {
            "name": "Abishek Porel",
            "runs": 51,
            "ballsFaced": 31,
            "fours": 7,
            "sixes": 1,
            "outDec": "c Donovan Ferreira b Brijesh Sharma",
            "strikeRate": 164.52
          },
          {
            "name": "KL Rahul",
            "runs": 56,
            "ballsFaced": 42,
            "fours": 1,
            "sixes": 3,
            "outDec": "b Dasun Shanaka",
            "strikeRate": 133.33
          },
          {
            "name": "Sahil Parakh",
            "runs": 9,
            "ballsFaced": 8,
            "fours": 1,
            "sixes": 0,
            "outDec": "c Dhruv Jurel b Jofra Archer",
            "strikeRate": 112.5
          },
          {
            "name": "Axar Patel",
            "runs": 34,
            "ballsFaced": 18,
            "fours": 2,
            "sixes": 2,
            "outDec": "not out",
            "strikeRate": 188.89
          },
          {
            "name": "Tristan Stubbs",
            "runs": 4,
            "ballsFaced": 6,
            "fours": 0,
            "sixes": 0,
            "outDec": "c Yashasvi Jaiswal b Jofra Archer",
            "strikeRate": 66.67
          },
          {
            "name": "David Miller",
            "runs": 9,
            "ballsFaced": 6,
            "fours": 0,
            "sixes": 1,
            "outDec": "c Dasun Shanaka b Brijesh Sharma",
            "strikeRate": 150
          },
          {
            "name": "Ashutosh Sharma",
            "runs": 18,
            "ballsFaced": 5,
            "fours": 1,
            "sixes": 2,
            "outDec": "not out",
            "strikeRate": 360
          },
          {
            "name": "Madhav Tiwari",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Tripurana Vijay",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Lungi Ngidi",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Mitchell Starc",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Mukesh Kumar",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          }
        ],
        "bowlers": [
          {
            "name": "Jofra Archer",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 35,
            "wickets": 2,
            "economy": 8.8
          },
          {
            "name": "Adam Milne",
            "overs": 3.2,
            "maidens": 0,
            "runsConceded": 41,
            "wickets": 0,
            "economy": 12.3
          },
          {
            "name": "Brijesh Sharma",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 44,
            "wickets": 2,
            "economy": 11
          },
          {
            "name": "Dasun Shanaka",
            "overs": 3,
            "maidens": 0,
            "runsConceded": 29,
            "wickets": 1,
            "economy": 9.7
          },
          {
            "name": "Yash Raj Punja",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 29,
            "wickets": 0,
            "economy": 7.2
          },
          {
            "name": "Donovan Ferreira",
            "overs": 1,
            "maidens": 0,
            "runsConceded": 16,
            "wickets": 0,
            "economy": 16
          }
        ]
      }
    ],
    "venueGround": "Arun Jaitley Stadium",
    "venueCity": "Delhi",
    "venueCountry": "India",
    "timezone": "Asia/Kolkata",
    "matchType": "IPL T20",
    "statusDescription": "Delhi Capitals won by 5 wickets",
    "tossWinnerName": "Delhi Capitals",
    "tossDecision": "Bowl",
    "playerOfTheMatch": "Abishek Porel",
    "umpires": "Nitin Menon, KN Ananthapadmanabhan",
    "thirdUmpire": "Anil Chaudhary",
    "referee": "Manu Nayyar"
  },
  "152196": {
    "id": "152196",
    "seriesName": "Indian Premier League 2026",
    "teamA": {
      "id": "58",
      "name": "Chennai Super Kings",
      "shortName": "CSK"
    },
    "teamB": {
      "id": "255",
      "name": "Sunrisers Hyderabad",
      "shortName": "SRH"
    },
    "status": "finished",
    "date": "2026-05-18T14:00:00.000Z",
    "venue": "MA Chidambaram Stadium, Chennai",
    "tossResult": "Sunrisers Hyderabad won by 5 wkts",
    "runsA": "180",
    "wicketsA": "7",
    "oversA": "19.6",
    "runsB": "181",
    "wicketsB": "5",
    "oversB": "18.6",
    "crr": "9.53",
    "result": "Sunrisers Hyderabad won by 5 wkts",
    "isIPL": true,
    "playingXI_A": [
      "Ruturaj Gaikwad (c)",
      "Rachin Ravindra",
      "Ajinkya Rahane",
      "Shivam Dube",
      "Ravindra Jadeja",
      "MS Dhoni (wk)",
      "Mitchell Santner",
      "Shardul Thakur",
      "Deepak Chahar",
      "Tushar Deshpande",
      "Matheesha Pathirana"
    ],
    "playingXI_B": [
      "Travis Head",
      "Abhishek Sharma",
      "Aiden Markram",
      "Heinrich Klaasen (wk)",
      "Nitish Kumar Reddy",
      "Abdul Samad",
      "Pat Cummins (c)",
      "Shahbaz Ahmed",
      "Bhuvneshwar Kumar",
      "Mayank Markande",
      "T Natarajan"
    ],
    "activeBatters": [
      {
        "name": "Salil Arora",
        "runs": 10,
        "ballsFaced": 5,
        "strikeRate": 200
      },
      {
        "name": "Smaran Ravichandran",
        "runs": 5,
        "ballsFaced": 2,
        "strikeRate": 250
      }
    ],
    "activeBowlers": [
      {
        "name": "Mukesh Choudhary",
        "overs": 4,
        "wickets": 2,
        "economy": 9
      },
      {
        "name": "Anshul Kamboj",
        "overs": 4,
        "wickets": 1,
        "economy": 11.5
      }
    ],
    "partnershipInfo": "6(3)",
    "timeline": [
      "...",
      "W",
      "Wd",
      "Wd",
      "1",
      "1",
      "1",
      "4",
      "6",
      "|",
      "6",
      "1",
      "W",
      "1",
      "1",
      "4"
    ],
    "scorecard": [
      {
        "inningsId": 1,
        "batTeamName": "Chennai Super Kings",
        "runs": "180",
        "wickets": "7",
        "overs": "20",
        "batsmen": [
          {
            "name": "Sanju Samson",
            "runs": 27,
            "ballsFaced": 13,
            "fours": 5,
            "sixes": 1,
            "outDec": "c Ishan Kishan b Pat Cummins",
            "strikeRate": 207.69
          },
          {
            "name": "Ruturaj Gaikwad",
            "runs": 15,
            "ballsFaced": 21,
            "fours": 0,
            "sixes": 0,
            "outDec": "c Eshan Malinga b Pat Cummins",
            "strikeRate": 71.43
          },
          {
            "name": "Urvil Patel",
            "runs": 13,
            "ballsFaced": 8,
            "fours": 0,
            "sixes": 2,
            "outDec": "b Sakib Hussain",
            "strikeRate": 162.5
          },
          {
            "name": "Kartik Sharma",
            "runs": 32,
            "ballsFaced": 19,
            "fours": 3,
            "sixes": 2,
            "outDec": "c Nitish Reddy b Pat Cummins",
            "strikeRate": 168.42
          },
          {
            "name": "Dewald Brevis",
            "runs": 44,
            "ballsFaced": 27,
            "fours": 2,
            "sixes": 4,
            "outDec": "b Eshan Malinga",
            "strikeRate": 162.96
          },
          {
            "name": "Shivam Dube",
            "runs": 26,
            "ballsFaced": 23,
            "fours": 3,
            "sixes": 1,
            "outDec": "b Sakib Hussain",
            "strikeRate": 113.04
          },
          {
            "name": "Prashant Veer",
            "runs": 11,
            "ballsFaced": 9,
            "fours": 2,
            "sixes": 0,
            "outDec": "c and b Praful Hinge",
            "strikeRate": 122.22
          },
          {
            "name": "Akeal Hosein",
            "runs": 3,
            "ballsFaced": 1,
            "fours": 0,
            "sixes": 0,
            "outDec": "not out",
            "strikeRate": 300
          },
          {
            "name": "Noor Ahmad",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Anshul Kamboj",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Spencer Johnson",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Mukesh Choudhary",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          }
        ],
        "bowlers": [
          {
            "name": "Nitish Kumar Reddy",
            "overs": 2,
            "maidens": 0,
            "runsConceded": 35,
            "wickets": 0,
            "economy": 17.5
          },
          {
            "name": "Praful Hinge",
            "overs": 3,
            "maidens": 0,
            "runsConceded": 37,
            "wickets": 1,
            "economy": 12.3
          },
          {
            "name": "Pat Cummins",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 28,
            "wickets": 3,
            "economy": 7
          },
          {
            "name": "Eshan Malinga",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 26,
            "wickets": 1,
            "economy": 6.5
          },
          {
            "name": "Sakib Hussain",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 34,
            "wickets": 2,
            "economy": 8.5
          },
          {
            "name": "Shivang Kumar",
            "overs": 3,
            "maidens": 0,
            "runsConceded": 20,
            "wickets": 0,
            "economy": 6.7
          }
        ]
      },
      {
        "inningsId": 2,
        "batTeamName": "Sunrisers Hyderabad",
        "runs": "181",
        "wickets": "5",
        "overs": "19",
        "batsmen": [
          {
            "name": "Abhishek Sharma",
            "runs": 26,
            "ballsFaced": 21,
            "fours": 3,
            "sixes": 1,
            "outDec": "c Spencer Johnson b Akeal Hosein",
            "strikeRate": 123.81
          },
          {
            "name": "Travis Head",
            "runs": 6,
            "ballsFaced": 6,
            "fours": 1,
            "sixes": 0,
            "outDec": "c and b Mukesh Choudhary",
            "strikeRate": 100
          },
          {
            "name": "Ishan Kishan",
            "runs": 70,
            "ballsFaced": 47,
            "fours": 7,
            "sixes": 3,
            "outDec": "c Urvil Patel b Anshul Kamboj",
            "strikeRate": 148.94
          },
          {
            "name": "Heinrich Klaasen",
            "runs": 47,
            "ballsFaced": 26,
            "fours": 6,
            "sixes": 2,
            "outDec": "st Sanju Samson b Noor Ahmad",
            "strikeRate": 180.77
          },
          {
            "name": "Nitish Kumar Reddy",
            "runs": 11,
            "ballsFaced": 7,
            "fours": 1,
            "sixes": 0,
            "outDec": "c Urvil Patel b Mukesh Choudhary",
            "strikeRate": 157.14
          },
          {
            "name": "Salil Arora",
            "runs": 10,
            "ballsFaced": 5,
            "fours": 0,
            "sixes": 1,
            "outDec": "not out",
            "strikeRate": 200
          },
          {
            "name": "Smaran Ravichandran",
            "runs": 5,
            "ballsFaced": 2,
            "fours": 1,
            "sixes": 0,
            "outDec": "not out",
            "strikeRate": 250
          },
          {
            "name": "Pat Cummins",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Shivang Kumar",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Eshan Malinga",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Sakib Hussain",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Praful Hinge",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          }
        ],
        "bowlers": [
          {
            "name": "Mukesh Choudhary",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 36,
            "wickets": 2,
            "economy": 9
          },
          {
            "name": "Spencer Johnson",
            "overs": 3,
            "maidens": 0,
            "runsConceded": 26,
            "wickets": 0,
            "economy": 8.7
          },
          {
            "name": "Anshul Kamboj",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 46,
            "wickets": 1,
            "economy": 11.5
          },
          {
            "name": "Noor Ahmad",
            "overs": 4,
            "maidens": 0,
            "runsConceded": 40,
            "wickets": 1,
            "economy": 10
          },
          {
            "name": "Akeal Hosein",
            "overs": 3,
            "maidens": 0,
            "runsConceded": 21,
            "wickets": 1,
            "economy": 7
          },
          {
            "name": "Shivam Dube",
            "overs": 1,
            "maidens": 0,
            "runsConceded": 12,
            "wickets": 0,
            "economy": 12
          }
        ]
      }
    ],
    "venueGround": "MA Chidambaram Stadium",
    "venueCity": "Chennai",
    "venueCountry": "India",
    "timezone": "Asia/Kolkata",
    "matchType": "IPL T20",
    "statusDescription": "Sunrisers Hyderabad won by 5 wickets",
    "tossWinnerName": "Sunrisers Hyderabad",
    "tossDecision": "Bowl",
    "playerOfTheMatch": "Ishan Kishan",
    "umpires": "Michael Gough, Akshay Totre",
    "thirdUmpire": "Virender Sharma",
    "referee": "Javagal Srinath"
  },
  "152207": {
    "id": "152207",
    "seriesName": "Indian Premier League 2026",
    "teamA": {
      "id": "64",
      "name": "Rajasthan Royals",
      "shortName": "RR"
    },
    "teamB": {
      "id": "966",
      "name": "Lucknow Super Giants",
      "shortName": "LSG"
    },
    "status": "upcoming",
    "date": "2026-05-19T14:00:00.000Z",
    "venue": "Sawai Mansingh Stadium, Jaipur",
    "tossResult": "Preview",
    "result": "Preview",
    "isIPL": true,
    "playingXI_A": [
      "Yashasvi Jaiswal",
      "Vaibhav Sooryavanshi",
      "Sanju Samson (c & wk)",
      "Dhruv Jurel",
      "Riyan Parag",
      "Shimron Hetmyer",
      "Donovan Ferreira",
      "Ravichandran Ashwin",
      "Trent Boult",
      "Yuzvendra Chahal",
      "Avesh Khan"
    ],
    "playingXI_B": [
      "KL Rahul (c)",
      "Quinton de Kock (wk)",
      "Devdutt Padikkal",
      "Nicholas Pooran",
      "Ayush Badoni",
      "Krunal Pandya",
      "Marcus Stoinis",
      "Ravi Bishnoi",
      "Mohsin Khan",
      "Naveen-ul-Haq",
      "Yash Thakur"
    ],
    "activeBatters": [],
    "activeBowlers": [],
    "timeline": [],
    "scorecard": [],
    "venueGround": "Sawai Mansingh Stadium",
    "venueCity": "Jaipur",
    "venueCountry": "India",
    "timezone": "Asia/Kolkata",
    "matchType": "IPL T20",
    "statusDescription": "Scheduled to begin at 7:30 PM IST",
    "tossWinnerName": "Not Decided",
    "tossDecision": "",
    "playerOfTheMatch": "Pending Match Play",
    "umpires": "Ulhas Gandhe, Vinod Seshan",
    "thirdUmpire": "Sadashiv Iyer",
    "referee": "Narayanan Kutty"
  }
};
