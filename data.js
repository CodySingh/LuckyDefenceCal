/*
 * Lucky Defense upgrade data.
 *
 * Every table has a `verified` flag:
 *   true  -> confirmed against a 2026 game version (see `source`).
 *   false -> taken from a fan guide that has no date/version (footer "© 2025").
 *            Check it in-game, then flip the flag to true and set `source`.
 *
 * `costs[i]` is the cost to go from level (toLevel - 1) to toLevel.
 */
const LD_DATA = {
  game: "Lucky Defense",
  lastReviewed: "2026-11-21",
  latestKnownVersion: "2.0.18",

  units: [
    {
      id: "mythic",
      name: "Mythic",
      resource: "Mythic Stones",
      verified: true,
      source: "Your original data.json (game version 2.0.14, Oct 2026)",
      costs: [
        { toLevel: 2, amount: 5, gold: 1000 },
        { toLevel: 3, amount: 10, gold: 2000 },
        { toLevel: 4, amount: 20, gold: 4000 },
        { toLevel: 5, amount: 30, gold: 6000 },
        { toLevel: 6, amount: 50, gold: 10000 },
        { toLevel: 7, amount: 70, gold: 14000 },
        { toLevel: 8, amount: 100, gold: 20000 },
        { toLevel: 9, amount: 130, gold: 26000 },
        { toLevel: 10, amount: 170, gold: 34000 },
        { toLevel: 11, amount: 210, gold: 42000 },
        { toLevel: 12, amount: 260, gold: 52000 },
        { toLevel: 13, amount: 310, gold: 62000 },
        { toLevel: 14, amount: 360, gold: 72000 },
        { toLevel: 15, amount: 430, gold: 86000 }
      ]
    },
    {
      id: "immortal",
      name: "Immortal",
      resource: "Immortal Stones",
      verified: false,
      source: "Lucky Defense Guides (legacy mirror), undated",
      costs: [
        { toLevel: 2, amount: 5, gold: 2000 },
        { toLevel: 3, amount: 10, gold: 4000 },
        { toLevel: 4, amount: 20, gold: 8000 },
        { toLevel: 5, amount: 30, gold: 12000 },
        { toLevel: 6, amount: 50, gold: 20000 },
        { toLevel: 7, amount: 70, gold: 28000 },
        { toLevel: 8, amount: 100, gold: 40000 },
        { toLevel: 9, amount: 130, gold: 52000 },
        { toLevel: 10, amount: 170, gold: 68000 },
        { toLevel: 11, amount: 210, gold: 84000 },
        { toLevel: 12, amount: 260, gold: 104000 },
        { toLevel: 13, amount: 310, gold: 124000 },
        { toLevel: 14, amount: 360, gold: 144000 },
        { toLevel: 15, amount: 430, gold: 172000 }
      ]
    },
    {
      id: "legendary",
      name: "Legendary",
      resource: "Duplicates",
      verified: false,
      source: "Lucky Defense Guides (legacy mirror), undated",
      costs: [
        { toLevel: 2, amount: 2, gold: 1000 },
        { toLevel: 3, amount: 3, gold: 2000 },
        { toLevel: 4, amount: 4, gold: 4000 },
        { toLevel: 5, amount: 10, gold: 6000 },
        { toLevel: 6, amount: 15, gold: 10000 },
        { toLevel: 7, amount: 20, gold: 14000 },
        { toLevel: 8, amount: 30, gold: 20000 },
        { toLevel: 9, amount: 40, gold: 26000 },
        { toLevel: 10, amount: 50, gold: 34000 },
        { toLevel: 11, amount: 65, gold: 42000 },
        { toLevel: 12, amount: 80, gold: 52000 },
        { toLevel: 13, amount: 95, gold: 62000 },
        { toLevel: 14, amount: 110, gold: 72000 },
        { toLevel: 15, amount: 130, gold: 86000 }
      ]
    },
    {
      id: "epic",
      name: "Epic",
      resource: "Duplicates",
      verified: false,
      source: "Lucky Defense Guides (legacy mirror), undated",
      costs: [
        { toLevel: 2, amount: 3, gold: 1000 },
        { toLevel: 3, amount: 4, gold: 2000 },
        { toLevel: 4, amount: 8, gold: 4000 },
        { toLevel: 5, amount: 12, gold: 6000 },
        { toLevel: 6, amount: 20, gold: 10000 },
        { toLevel: 7, amount: 30, gold: 14000 },
        { toLevel: 8, amount: 40, gold: 20000 },
        { toLevel: 9, amount: 50, gold: 26000 },
        { toLevel: 10, amount: 70, gold: 34000 },
        { toLevel: 11, amount: 85, gold: 42000 },
        { toLevel: 12, amount: 105, gold: 52000 },
        { toLevel: 13, amount: 125, gold: 62000 },
        { toLevel: 14, amount: 145, gold: 72000 },
        { toLevel: 15, amount: 170, gold: 86000 }
      ]
    },
    {
      id: "rare",
      name: "Rare",
      resource: "Duplicates",
      verified: false,
      source: "Lucky Defense Guides (legacy mirror), undated",
      costs: [
        { toLevel: 2, amount: 3, gold: 1000 },
        { toLevel: 3, amount: 6, gold: 2000 },
        { toLevel: 4, amount: 10, gold: 3000 },
        { toLevel: 5, amount: 20, gold: 5000 },
        { toLevel: 6, amount: 30, gold: 8000 },
        { toLevel: 7, amount: 40, gold: 12000 },
        { toLevel: 8, amount: 60, gold: 17000 },
        { toLevel: 9, amount: 80, gold: 22000 },
        { toLevel: 10, amount: 100, gold: 28000 },
        { toLevel: 11, amount: 130, gold: 35000 },
        { toLevel: 12, amount: 160, gold: 43000 },
        { toLevel: 13, amount: 190, gold: 52000 },
        { toLevel: 14, amount: 220, gold: 60000 },
        { toLevel: 15, amount: 260, gold: 72000 }
      ]
    },
    {
      id: "common",
      name: "Common",
      resource: "Duplicates",
      verified: false,
      source: "Lucky Defense Guides (legacy mirror), undated",
      costs: [
        { toLevel: 2, amount: 5, gold: 500 },
        { toLevel: 3, amount: 10, gold: 1000 },
        { toLevel: 4, amount: 20, gold: 2000 },
        { toLevel: 5, amount: 30, gold: 3000 },
        { toLevel: 6, amount: 50, gold: 5000 },
        { toLevel: 7, amount: 70, gold: 7000 },
        { toLevel: 8, amount: 100, gold: 10000 },
        { toLevel: 9, amount: 130, gold: 13000 },
        { toLevel: 10, amount: 170, gold: 17000 },
        { toLevel: 11, amount: 210, gold: 21000 },
        { toLevel: 12, amount: 260, gold: 26000 },
        { toLevel: 13, amount: 310, gold: 31000 },
        { toLevel: 14, amount: 360, gold: 36000 },
        { toLevel: 15, amount: 430, gold: 43000 }
      ]
    }
  ],

  /*
   * Treasure upgrades can fail. Each failure adds `increment` (percentage points)
   * to the success rate, up to `maxIncrements` times.
   */
  treasure: {
    verified: false,
    source: "Lucky Defense Guides (legacy mirror), undated",
    maxIncrements: 10,
    costs: [
      { toLevel: 2, rate: 90, coins: 5000, redTickets: 0, increment: 9 },
      { toLevel: 3, rate: 80, coins: 10000, redTickets: 0, increment: 8 },
      { toLevel: 4, rate: 70, coins: 15000, redTickets: 0, increment: 7 },
      { toLevel: 5, rate: 60, coins: 20000, redTickets: 0, increment: 6 },
      { toLevel: 6, rate: 50, coins: 25000, redTickets: 0, increment: 5 },
      { toLevel: 7, rate: 40, coins: 30000, redTickets: 1, increment: 4 },
      { toLevel: 8, rate: 30, coins: 35000, redTickets: 1, increment: 3 },
      { toLevel: 9, rate: 15, coins: 40000, redTickets: 1, increment: 1.5 },
      { toLevel: 10, rate: 5, coins: 45000, redTickets: 1, increment: 0.5 },
      { toLevel: 11, rate: 1, coins: 50000, redTickets: 1, increment: 0.1 }
    ]
  }
};
