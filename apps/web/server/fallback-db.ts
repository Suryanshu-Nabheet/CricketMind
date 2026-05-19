import { Match, MatchDetail } from "./cricket";

export const FALLBACK_MATCHES: Match[] = [
  {
    "id": "153791",
    "seriesName": "Pakistan tour of Bangladesh, 2026",
    "teamA": {
      "id": "6",
      "name": "Bangladesh",
      "shortName": "BAN"
    },
    "teamB": {
      "id": "3",
      "name": "Pakistan",
      "shortName": "PAK"
    },
    "status": "live",
    "date": "2026-05-16T04:00:00.000Z",
    "venue": "Sylhet International Cricket Stadium, Sylhet",
    "tossResult": "Day 3: Stumps - Pakistan need 437 runs",
    "result": "Day 3: Stumps - Pakistan need 437 runs",
    "runsA": "278",
    "wicketsA": "10",
    "oversA": "76.6",
    "runsB": "232",
    "wicketsB": "10",
    "oversB": "57.4",
    "isIPL": false
  },
  {
    "id": "154905",
    "seriesName": "ICC Men's T20 World Cup Europe Sub Regional Qualifier A 2026",
    "teamA": {
      "id": "1069",
      "name": "Slovenia",
      "shortName": "SLV"
    },
    "teamB": {
      "id": "534",
      "name": "Sweden",
      "shortName": "SWE"
    },
    "status": "upcoming",
    "date": "2026-05-19T07:30:00.000Z",
    "venue": "Happy Valley Ground 2, Episkopi",
    "tossResult": "Match starts at May 19, 07:30 GMT",
    "result": "Match starts at May 19, 07:30 GMT",
    "isIPL": false
  },
  {
    "id": "154916",
    "seriesName": "ICC Men's T20 World Cup Europe Sub Regional Qualifier A 2026",
    "teamA": {
      "id": "1076",
      "name": "Croatia",
      "shortName": "CRT"
    },
    "teamB": {
      "id": "1062",
      "name": "Switzerland",
      "shortName": "SUI"
    },
    "status": "upcoming",
    "date": "2026-05-19T12:30:00.000Z",
    "venue": "Happy Valley Ground, Episkopi",
    "tossResult": "Match starts at May 19, 12:30 GMT",
    "result": "Match starts at May 19, 12:30 GMT",
    "isIPL": false
  },
  {
    "id": "154927",
    "seriesName": "ICC Men's T20 World Cup Europe Sub Regional Qualifier A 2026",
    "teamA": {
      "id": "532",
      "name": "Austria",
      "shortName": "AUT"
    },
    "teamB": {
      "id": "533",
      "name": "Guernsey",
      "shortName": "GGY"
    },
    "status": "upcoming",
    "date": "2026-05-19T12:30:00.000Z",
    "venue": "Happy Valley Ground 2, Episkopi",
    "tossResult": "Match starts at May 19, 12:30 GMT",
    "result": "Match starts at May 19, 12:30 GMT",
    "isIPL": false
  },
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
    "id": "153780",
    "seriesName": "Pakistan tour of Bangladesh, 2026",
    "teamA": {
      "id": "6",
      "name": "Bangladesh",
      "shortName": "BAN"
    },
    "teamB": {
      "id": "3",
      "name": "Pakistan",
      "shortName": "PAK"
    },
    "status": "finished",
    "date": "2026-05-08T04:00:00.000Z",
    "venue": "Shere Bangla National Stadium, Dhaka",
    "tossResult": "Bangladesh won by 104 runs",
    "result": "Bangladesh won by 104 runs",
    "runsA": "413",
    "wicketsA": "10",
    "oversA": "117.1",
    "runsB": "386",
    "wicketsB": "10",
    "oversB": "100.3",
    "isIPL": false
  },
  {
    "id": "153242",
    "seriesName": "ICC Cricket World Cup League Two 2023-27",
    "teamA": {
      "id": "23",
      "name": "Scotland",
      "shortName": "SCO"
    },
    "teamB": {
      "id": "72",
      "name": "Nepal",
      "shortName": "NEP"
    },
    "status": "finished",
    "date": "2026-05-18T03:45:00.000Z",
    "venue": "Tribhuvan University International Cricket Ground, Kirtipur",
    "tossResult": "Nepal won by 6 wkts",
    "result": "Nepal won by 6 wkts",
    "runsA": "194",
    "wicketsA": "10",
    "oversA": "39.1",
    "runsB": "199",
    "wicketsB": "4",
    "oversB": "38.1",
    "isIPL": false
  },
  {
    "id": "153231",
    "seriesName": "ICC Cricket World Cup League Two 2023-27",
    "teamA": {
      "id": "15",
      "name": "United States of America",
      "shortName": "USA"
    },
    "teamB": {
      "id": "72",
      "name": "Nepal",
      "shortName": "NEP"
    },
    "status": "finished",
    "date": "2026-05-16T03:45:00.000Z",
    "venue": "Tribhuvan University International Cricket Ground, Kirtipur",
    "tossResult": "Nepal won by 9 wkts",
    "result": "Nepal won by 9 wkts",
    "runsA": "195",
    "wicketsA": "10",
    "oversA": "43.3",
    "runsB": "199",
    "wicketsB": "1",
    "oversB": "36.4",
    "isIPL": false
  }
];

export const FALLBACK_MATCH_DETAILS: Record<string, MatchDetail> = {
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
    "playingXI_A": [],
    "playingXI_B": [],
    "activeBatters": [],
    "activeBowlers": [],
    "timeline": [],
    "scorecard": [],
    "matchType": "",
    "statusDescription": ""
  },
  "153791": {
    "id": "153791",
    "seriesName": "Pakistan tour of Bangladesh, 2026",
    "teamA": {
      "id": "6",
      "name": "Bangladesh",
      "shortName": "BAN"
    },
    "teamB": {
      "id": "3",
      "name": "Pakistan",
      "shortName": "PAK"
    },
    "status": "live",
    "date": "2026-05-16T04:00:00.000Z",
    "venue": "Sylhet International Cricket Stadium, Sylhet",
    "tossResult": "Day 3: Stumps - Pakistan need 437 runs",
    "result": "Day 3: Stumps - Pakistan need 437 runs",
    "runsA": "278",
    "wicketsA": "10",
    "oversA": "76.6",
    "runsB": "232",
    "wicketsB": "10",
    "oversB": "57.4",
    "isIPL": false,
    "playingXI_A": [],
    "playingXI_B": [],
    "activeBatters": [
      {
        "name": "Azan Awais",
        "runs": 0,
        "ballsFaced": 6,
        "fours": 0,
        "sixes": 0,
        "outDec": "batting",
        "strikeRate": 0
      },
      {
        "name": "Abdullah Fazal",
        "runs": 0,
        "ballsFaced": 6,
        "fours": 0,
        "sixes": 0,
        "outDec": "batting",
        "strikeRate": 0
      }
    ],
    "activeBowlers": [
      {
        "name": "Taskin Ahmed",
        "overs": 1,
        "wickets": 0,
        "economy": 0
      },
      {
        "name": "Shoriful Islam",
        "overs": 1,
        "wickets": 0,
        "economy": 0
      }
    ],
    "partnershipInfo": "0(12)",
    "timeline": [
      "...",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "|",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0"
    ],
    "scorecard": [
      {
        "inningsId": 1,
        "batTeamName": "Bangladesh",
        "runs": "278",
        "wickets": "10",
        "overs": "77",
        "batsmen": [
          {
            "name": "Mahmudul Hasan Joy",
            "runs": 0,
            "ballsFaced": 2,
            "fours": 0,
            "sixes": 0,
            "outDec": "c Salman Agha b Mohammad Abbas",
            "strikeRate": 0
          },
          {
            "name": "Tanzid Hasan Tamim",
            "runs": 26,
            "ballsFaced": 34,
            "fours": 3,
            "sixes": 0,
            "outDec": "c and b Mohammad Abbas",
            "strikeRate": 76.47
          },
          {
            "name": "Mominul Haque",
            "runs": 22,
            "ballsFaced": 41,
            "fours": 3,
            "sixes": 0,
            "outDec": "b Khurram Shahzad",
            "strikeRate": 53.66
          },
          {
            "name": "Najmul Hossain Shanto",
            "runs": 29,
            "ballsFaced": 74,
            "fours": 3,
            "sixes": 0,
            "outDec": "c Mohammad Rizwan b Mohammad Abbas",
            "strikeRate": 39.19
          },
          {
            "name": "Mushfiqur Rahim",
            "runs": 23,
            "ballsFaced": 64,
            "fours": 2,
            "sixes": 0,
            "outDec": "lbw b Khurram Shahzad",
            "strikeRate": 35.94
          },
          {
            "name": "Litton Das",
            "runs": 126,
            "ballsFaced": 159,
            "fours": 16,
            "sixes": 2,
            "outDec": "c Abdullah Fazal b Hasan Ali",
            "strikeRate": 79.25
          },
          {
            "name": "Mehidy Hasan Miraz",
            "runs": 4,
            "ballsFaced": 6,
            "fours": 0,
            "sixes": 0,
            "outDec": "c Hasan Ali b Khurram Shahzad",
            "strikeRate": 66.67
          },
          {
            "name": "Taijul Islam",
            "runs": 16,
            "ballsFaced": 40,
            "fours": 2,
            "sixes": 0,
            "outDec": "b Sajid Khan",
            "strikeRate": 40
          },
          {
            "name": "Taskin Ahmed",
            "runs": 7,
            "ballsFaced": 13,
            "fours": 1,
            "sixes": 0,
            "outDec": "c Salman Agha b Khurram Shahzad",
            "strikeRate": 53.85
          },
          {
            "name": "Shoriful Islam",
            "runs": 12,
            "ballsFaced": 30,
            "fours": 2,
            "sixes": 0,
            "outDec": "not out",
            "strikeRate": 40
          },
          {
            "name": "Nahid Rana",
            "runs": 0,
            "ballsFaced": 4,
            "fours": 0,
            "sixes": 0,
            "outDec": "c Mohammad Rizwan b Hasan Ali",
            "strikeRate": 0
          }
        ],
        "bowlers": [
          {
            "name": "Mohammad Abbas",
            "overs": 16,
            "maidens": 3,
            "runsConceded": 45,
            "wickets": 3,
            "economy": 2.8
          },
          {
            "name": "Khurram Shahzad",
            "overs": 17,
            "maidens": 1,
            "runsConceded": 81,
            "wickets": 4,
            "economy": 4.8
          },
          {
            "name": "Hasan Ali",
            "overs": 11.5,
            "maidens": 1,
            "runsConceded": 49,
            "wickets": 2,
            "economy": 4.1
          },
          {
            "name": "Salman Agha",
            "overs": 1.1,
            "maidens": 0,
            "runsConceded": 1,
            "wickets": 0,
            "economy": 0.9
          },
          {
            "name": "Sajid Khan",
            "overs": 31,
            "maidens": 1,
            "runsConceded": 96,
            "wickets": 1,
            "economy": 3.1
          }
        ]
      },
      {
        "inningsId": 2,
        "batTeamName": "Pakistan",
        "runs": "232",
        "wickets": "10",
        "overs": "57.4",
        "batsmen": [
          {
            "name": "Azan Awais",
            "runs": 13,
            "ballsFaced": 34,
            "fours": 3,
            "sixes": 0,
            "outDec": "c Mominul b Taskin Ahmed",
            "strikeRate": 38.24
          },
          {
            "name": "Abdullah Fazal",
            "runs": 9,
            "ballsFaced": 21,
            "fours": 1,
            "sixes": 0,
            "outDec": "c Litton Das b Taskin Ahmed",
            "strikeRate": 42.86
          },
          {
            "name": "Shan Masood",
            "runs": 21,
            "ballsFaced": 26,
            "fours": 2,
            "sixes": 0,
            "outDec": "c (sub)Nayeem Hasan b Mehidy Hasan Miraz",
            "strikeRate": 80.77
          },
          {
            "name": "Babar Azam",
            "runs": 68,
            "ballsFaced": 84,
            "fours": 10,
            "sixes": 0,
            "outDec": "c Mushfiqur Rahim b Nahid Rana",
            "strikeRate": 80.95
          },
          {
            "name": "Saud Shakeel",
            "runs": 8,
            "ballsFaced": 28,
            "fours": 1,
            "sixes": 0,
            "outDec": "c Litton Das b Mehidy Hasan Miraz",
            "strikeRate": 28.57
          },
          {
            "name": "Salman Agha",
            "runs": 21,
            "ballsFaced": 51,
            "fours": 2,
            "sixes": 0,
            "outDec": "c Mominul b Taijul Islam",
            "strikeRate": 41.18
          },
          {
            "name": "Mohammad Rizwan",
            "runs": 13,
            "ballsFaced": 27,
            "fours": 2,
            "sixes": 0,
            "outDec": "b Taijul Islam",
            "strikeRate": 48.15
          },
          {
            "name": "Hasan Ali",
            "runs": 18,
            "ballsFaced": 37,
            "fours": 3,
            "sixes": 0,
            "outDec": "c Nahid Rana b Taijul Islam",
            "strikeRate": 48.65
          },
          {
            "name": "Sajid Khan",
            "runs": 38,
            "ballsFaced": 28,
            "fours": 2,
            "sixes": 4,
            "outDec": "c Tanzid Hasan Tamim b Nahid Rana",
            "strikeRate": 135.71
          },
          {
            "name": "Khurram Shahzad",
            "runs": 10,
            "ballsFaced": 10,
            "fours": 1,
            "sixes": 1,
            "outDec": "c Mahmudul Hasan Joy b Nahid Rana",
            "strikeRate": 100
          },
          {
            "name": "Mohammad Abbas",
            "runs": 0,
            "ballsFaced": 4,
            "fours": 0,
            "sixes": 0,
            "outDec": "not out",
            "strikeRate": 0
          }
        ],
        "bowlers": [
          {
            "name": "Taskin Ahmed",
            "overs": 11,
            "maidens": 1,
            "runsConceded": 37,
            "wickets": 2,
            "economy": 3.4
          },
          {
            "name": "Shoriful Islam",
            "overs": 11,
            "maidens": 3,
            "runsConceded": 39,
            "wickets": 0,
            "economy": 3.5
          },
          {
            "name": "Mehidy Hasan Miraz",
            "overs": 9,
            "maidens": 3,
            "runsConceded": 21,
            "wickets": 2,
            "economy": 2.3
          },
          {
            "name": "Nahid Rana",
            "overs": 12.4,
            "maidens": 1,
            "runsConceded": 60,
            "wickets": 3,
            "economy": 4.7
          },
          {
            "name": "Taijul Islam",
            "overs": 14,
            "maidens": 4,
            "runsConceded": 67,
            "wickets": 3,
            "economy": 4.8
          }
        ]
      },
      {
        "inningsId": 3,
        "batTeamName": "Bangladesh",
        "runs": "390",
        "wickets": "10",
        "overs": "102.2",
        "batsmen": [
          {
            "name": "Mahmudul Hasan Joy",
            "runs": 52,
            "ballsFaced": 64,
            "fours": 10,
            "sixes": 0,
            "outDec": "c Abdullah Fazal b Mohammad Abbas",
            "strikeRate": 81.25
          },
          {
            "name": "Tanzid Hasan Tamim",
            "runs": 4,
            "ballsFaced": 7,
            "fours": 1,
            "sixes": 0,
            "outDec": "c Saud Shakeel b Khurram Shahzad",
            "strikeRate": 57.14
          },
          {
            "name": "Mominul Haque",
            "runs": 30,
            "ballsFaced": 60,
            "fours": 3,
            "sixes": 0,
            "outDec": "c Mohammad Rizwan b Khurram Shahzad",
            "strikeRate": 50
          },
          {
            "name": "Najmul Hossain Shanto",
            "runs": 15,
            "ballsFaced": 46,
            "fours": 1,
            "sixes": 0,
            "outDec": "lbw b Khurram Shahzad",
            "strikeRate": 32.61
          },
          {
            "name": "Mushfiqur Rahim",
            "runs": 137,
            "ballsFaced": 233,
            "fours": 12,
            "sixes": 1,
            "outDec": "c Mohammad Abbas b Sajid Khan",
            "strikeRate": 58.8
          },
          {
            "name": "Litton Das",
            "runs": 69,
            "ballsFaced": 92,
            "fours": 5,
            "sixes": 0,
            "outDec": "c Saud Shakeel b Hasan Ali",
            "strikeRate": 75
          },
          {
            "name": "Mehidy Hasan Miraz",
            "runs": 19,
            "ballsFaced": 39,
            "fours": 1,
            "sixes": 0,
            "outDec": "b Khurram Shahzad",
            "strikeRate": 48.72
          },
          {
            "name": "Taijul Islam",
            "runs": 22,
            "ballsFaced": 51,
            "fours": 2,
            "sixes": 0,
            "outDec": "c Mohammad Abbas b Sajid Khan",
            "strikeRate": 43.14
          },
          {
            "name": "Taskin Ahmed",
            "runs": 6,
            "ballsFaced": 13,
            "fours": 1,
            "sixes": 0,
            "outDec": "c Salman Agha b Hasan Ali",
            "strikeRate": 46.15
          },
          {
            "name": "Shoriful Islam",
            "runs": 12,
            "ballsFaced": 15,
            "fours": 2,
            "sixes": 0,
            "outDec": "c Hasan Ali b Sajid Khan",
            "strikeRate": 80
          },
          {
            "name": "Nahid Rana",
            "runs": 0,
            "ballsFaced": 5,
            "fours": 0,
            "sixes": 0,
            "outDec": "not out",
            "strikeRate": 0
          }
        ],
        "bowlers": [
          {
            "name": "Mohammad Abbas",
            "overs": 23,
            "maidens": 2,
            "runsConceded": 66,
            "wickets": 1,
            "economy": 2.9
          },
          {
            "name": "Khurram Shahzad",
            "overs": 20,
            "maidens": 3,
            "runsConceded": 86,
            "wickets": 4,
            "economy": 4.3
          },
          {
            "name": "Hasan Ali",
            "overs": 23,
            "maidens": 2,
            "runsConceded": 83,
            "wickets": 2,
            "economy": 3.6
          },
          {
            "name": "Sajid Khan",
            "overs": 33.2,
            "maidens": 2,
            "runsConceded": 126,
            "wickets": 3,
            "economy": 3.8
          },
          {
            "name": "Salman Agha",
            "overs": 1,
            "maidens": 0,
            "runsConceded": 5,
            "wickets": 0,
            "economy": 5
          },
          {
            "name": "Saud Shakeel",
            "overs": 2,
            "maidens": 0,
            "runsConceded": 13,
            "wickets": 0,
            "economy": 6.5
          }
        ]
      },
      {
        "inningsId": 4,
        "batTeamName": "Pakistan",
        "runs": "0",
        "wickets": "0",
        "overs": "2",
        "batsmen": [
          {
            "name": "Azan Awais",
            "runs": 0,
            "ballsFaced": 6,
            "fours": 0,
            "sixes": 0,
            "outDec": "batting",
            "strikeRate": 0
          },
          {
            "name": "Abdullah Fazal",
            "runs": 0,
            "ballsFaced": 6,
            "fours": 0,
            "sixes": 0,
            "outDec": "batting",
            "strikeRate": 0
          },
          {
            "name": "Shan Masood",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Babar Azam",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Saud Shakeel",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Mohammad Rizwan",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Salman Agha",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Khurram Shahzad",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Sajid Khan",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Hasan Ali",
            "runs": 0,
            "ballsFaced": 0,
            "fours": 0,
            "sixes": 0,
            "outDec": "",
            "strikeRate": 0
          },
          {
            "name": "Mohammad Abbas",
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
            "name": "Taskin Ahmed",
            "overs": 1,
            "maidens": 1,
            "runsConceded": 0,
            "wickets": 0,
            "economy": 0
          },
          {
            "name": "Shoriful Islam",
            "overs": 1,
            "maidens": 1,
            "runsConceded": 0,
            "wickets": 0,
            "economy": 0
          }
        ]
      }
    ],
    "matchType": "",
    "statusDescription": ""
  },
  "154905": {
    "id": "154905",
    "seriesName": "ICC Men's T20 World Cup Europe Sub Regional Qualifier A 2026",
    "teamA": {
      "id": "1069",
      "name": "Slovenia",
      "shortName": "SLV"
    },
    "teamB": {
      "id": "534",
      "name": "Sweden",
      "shortName": "SWE"
    },
    "status": "upcoming",
    "date": "2026-05-19T07:30:00.000Z",
    "venue": "Happy Valley Ground 2, Episkopi",
    "tossResult": "Match starts at May 19, 07:30 GMT",
    "result": "Match starts at May 19, 07:30 GMT",
    "isIPL": false,
    "playingXI_A": [],
    "playingXI_B": [],
    "activeBatters": [],
    "activeBowlers": [],
    "timeline": [],
    "scorecard": [],
    "matchType": "",
    "statusDescription": ""
  },
  "154916": {
    "id": "154916",
    "seriesName": "ICC Men's T20 World Cup Europe Sub Regional Qualifier A 2026",
    "teamA": {
      "id": "1076",
      "name": "Croatia",
      "shortName": "CRT"
    },
    "teamB": {
      "id": "1062",
      "name": "Switzerland",
      "shortName": "SUI"
    },
    "status": "upcoming",
    "date": "2026-05-19T12:30:00.000Z",
    "venue": "Happy Valley Ground, Episkopi",
    "tossResult": "Match starts at May 19, 12:30 GMT",
    "result": "Match starts at May 19, 12:30 GMT",
    "isIPL": false,
    "playingXI_A": [],
    "playingXI_B": [],
    "activeBatters": [],
    "activeBowlers": [],
    "timeline": [],
    "scorecard": [],
    "matchType": "",
    "statusDescription": ""
  },
  "154927": {
    "id": "154927",
    "seriesName": "ICC Men's T20 World Cup Europe Sub Regional Qualifier A 2026",
    "teamA": {
      "id": "532",
      "name": "Austria",
      "shortName": "AUT"
    },
    "teamB": {
      "id": "533",
      "name": "Guernsey",
      "shortName": "GGY"
    },
    "status": "upcoming",
    "date": "2026-05-19T12:30:00.000Z",
    "venue": "Happy Valley Ground 2, Episkopi",
    "tossResult": "Match starts at May 19, 12:30 GMT",
    "result": "Match starts at May 19, 12:30 GMT",
    "isIPL": false,
    "playingXI_A": [],
    "playingXI_B": [],
    "activeBatters": [],
    "activeBowlers": [],
    "timeline": [],
    "scorecard": [],
    "matchType": "",
    "statusDescription": ""
  }
};
