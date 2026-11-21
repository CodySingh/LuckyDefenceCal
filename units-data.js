/*
 * Lucky Defense Mythic and Immortal units.
 *
 * Source: namu.wiki (Korean community wiki), translated and summarised.
 * Text license: CC BY-NC-SA 2.0 KR, so this site must stay non-commercial and credit namu.wiki.
 * Unit art: (c) 111% (the game developer), taken from namu.wiki.
 *
 * Each unit:
 *   updated   – when its wiki page was last edited (used for the 2026 check)
 *   type      – "melee" | "ranged" | "melee/ranged"
 *   damage    – "physical" | "magic" | "support"
 *   skills    – [{ name, kind, desc }]; kind: passive | skill | ultimate
 *   lv6, lv12 – that unit's unique upgrades; { text, unlock: true } when a new skill unlocks
 *   immortal  – the Immortal form, or null. `documented: false` = the wiki has only its name.
 *   incomplete – the wiki page is a stub, so some info is missing
 *
 * Every unit also gets the shared upgrades in UNIT_COMMON_LEVELS below.
 */
const UNIT_SOURCE = {
  name: "namu.wiki",
  url: "https://namu.wiki/w/%EC%9A%B4%EB%B9%A8%EC%A1%B4%EB%A7%8E%EA%B2%9C/%EC%98%81%EC%9B%85/%EC%8B%A0%ED%99%94",
  reviewed: "2026-11-21"
};

const UNIT_COMMON_LEVELS = {
  3: "Attack +10%",
  9: "Attack speed +10%",
  10: "Treasure slot unlocked",
  15: "Attack and attack speed +10%"
};

const IMMORTAL_RULES = {
  unlock: "Reach Lv 15 with the Mythic, then pay 6,000 gems to unlock its Immortal form.",
  stones: "Immortals level up with Immortal Stones (100 gems each). They don't drop from Recruit like Mythic Stones do.",
  limitBreak: "Since the 2nd-anniversary update the Immortal level cap is 25. Lv 16–25 use Breakthrough Stones and coins, each attempt can fail (the success rate rises after each failure), and the Immortal gets a boost at Lv 16, 19, 22 and 25.",
  source: "namu.wiki Immortal page, edited 2026-10-11"
};

const UNITS = [
  {
    id: "ninja", name: "Ninja", ko: "닌자", type: "ranged", race: "Human", damage: "physical",
    atk: "5K", aspd: "2", updated: "2026-11-09",
    skills: [
      { name: "Giant Shuriken", kind: "skill", desc: "10% chance: throws a giant shuriken dealing 2,000% physical damage twice to enemies in range." },
      { name: "Assassinate", kind: "skill", desc: "12% chance: deals 5,000% damage, with a 55% chance to trigger again." },
      { name: "Ninjutsu", kind: "ultimate", desc: "Cooldown ultimate: for 2s, deals 900% physical damage every 0.1s." }
    ],
    lv6: { text: "Assassinate skill unlocked", unlock: true },
    lv12: { text: "Ninjutsu ultimate unlocked", unlock: true },
    immortal: { id: "ghost-ninja", name: "Ghost Ninja", ko: "귀신 닌자", documented: false }
  },
  {
    id: "blob", name: "Blob", ko: "블롭", type: "melee", race: "Demon", damage: "physical",
    atk: "6.8K", aspd: "3", updated: "2026-10-09",
    skills: [
      { name: "Defense Down", kind: "passive", desc: "All enemies lose 20 defense." },
      { name: "Devour", kind: "skill", desc: "Gains +10 attack every time it kills an enemy itself." },
      { name: "Sticky Punch", kind: "skill", desc: "8% chance: 4,000% physical damage." },
      { name: "Sticky Trap", kind: "ultimate", desc: "Mana ultimate: spikes of goo deal 4,000% physical damage." }
    ],
    lv6: { text: "Sticky Trap ultimate unlocked", unlock: true },
    lv12: { text: "Devour attack gain +10 (to +20 per kill)" },
    immortal: {
      id: "blob-squad", name: "Blob Squad", ko: "블롭단", documented: true, atk: "43.2K", aspd: "1.9",
      how: "Transforms once the Blob has devoured 600+ enemies.",
      skills: [
        { name: "Squad Smash", kind: "skill", desc: "5% chance: 4,000% physical damage, +60% for each enemy in range." },
        { name: "Three as One", kind: "ultimate", desc: "Mana ultimate: 11,000% magic damage, +10% for each level the Blobs have gained." }
      ],
      lv6: "On summon, a random Blob gains 3 extra levels",
      lv12: "Devour damage bonus +15%",
      updated: "2026-01-26"
    }
  },
  {
    id: "graviton", name: "Graviton", ko: "중력자탄", type: "ranged", race: "Robot", damage: "magic",
    atk: "3K (+151)", aspd: "2", updated: "2026-10-08",
    skills: [
      { name: "Power Absorb", kind: "passive", desc: "Absorbs other Gravitons for 15–35 overheat. Each overheat point adds 4% skill damage." },
      { name: "Gravity Burst", kind: "skill", desc: "10% chance: 1,200% magic damage and a 3s stun in range." }
    ],
    lv6: { text: "Skill trigger chance +3%" },
    lv12: { text: "Stun duration +50%" },
    immortal: { id: "super-graviton", name: "Super Graviton", ko: "슈퍼 중력자탄", documented: true, atk: "35.3K (+3.4K)", aspd: "2" }
  },
  {
    id: "kitty-mage", name: "Kitty Mage", ko: "냥법사", type: "ranged", race: "Animal", damage: "support",
    atk: "2.9K (+144)", aspd: "2", updated: "2026-10-05",
    skills: [
      { name: "Mana Regen", kind: "passive", desc: "All allies regenerate mana 20% faster." },
      { name: "Meow Punch", kind: "skill", desc: "8% chance: 2,000% magic damage and restores 5 mana." },
      { name: "Meow", kind: "ultimate", desc: "Mana ultimate: allies in range regain 10% mana." }
    ],
    lv6: { text: "Meow Punch restores +3 more mana" },
    lv12: { text: "Skill mana restoration +100%" },
    immortal: { id: "great-kitty-mage", name: "Great Kitty Mage", ko: "대냥법사", documented: false, noImage: true }
  },
  {
    id: "pulse-generator", name: "Pulse Generator", ko: "펄스생성기", type: "ranged", race: "Robot", damage: "magic",
    atk: "7.2K", aspd: "2", updated: "2026-10-11",
    skills: [
      { name: "Energy Charge", kind: "passive", desc: "Charges energy while Robot allies are nearby." },
      { name: "Energy Orb", kind: "skill", desc: "When fully charged, fires an orb dealing 1,500% magic damage every 0.1s along its path, then explodes for 4,500%." }
    ],
    lv6: { text: "Pulse Beam skill unlocked", unlock: true },
    lv12: { text: "Mana skill cost −30%" },
    immortal: {
      id: "dr-pulse", name: "Dr. Pulse", ko: "닥터 펄스", documented: true, atk: "54.6K", aspd: "1",
      lv6: "Charges a little energy even with no Robots nearby",
      lv12: "Skill damage +50%"
    }
  },
  {
    id: "dragon", name: "Dragon", ko: "드래곤", type: "ranged", race: "Animal", damage: "magic",
    atk: "16.3K (+816)", aspd: "2", updated: "2026-10-12",
    note: "Starts as an egg that hatches with a 2% chance every 10s. Three eggs can merge into a Great Egg, which hatches into the stronger Drain (26.9K attack, attacks leave burning ground).",
    skills: [
      { name: "Attack Up", kind: "passive", desc: "All allies gain 10% attack." },
      { name: "Mightiest Creature", kind: "passive", desc: "+30% attack for each Animal hero." },
      { name: "Fireball", kind: "skill", desc: "8% chance: 5,000% magic damage in range." },
      { name: "Ground Blast", kind: "skill", desc: "10% chance: 6,000% magic damage in range." },
      { name: "Flame Breath", kind: "ultimate", desc: "Mana ultimate: 9,000% magic damage twice." }
    ],
    lv6: { text: "Egg hatch chance +2%" },
    lv12: { text: "Flame Breath ultimate unlocked", unlock: true },
    immortal: { id: "dark-lord-dragon", name: "Dark Lord Dragon", ko: "마왕 드래곤", documented: true, atk: "67.2K (+3.4K)", aspd: "1.5" }
  },
  {
    id: "bomba", name: "Bomba", ko: "밤바", type: "melee", race: "Human", damage: "physical",
    atk: "26.6K", aspd: "2", updated: "2026-05-29",
    skills: [
      { name: "Heartfelt Punch", kind: "passive", desc: "Every 10 basic attacks: 3,000% physical damage in range." },
      { name: "Hammer", kind: "skill", desc: "8% chance: 2,000% physical damage, and the next 3 basic attacks deal +100%." },
      { name: "Ki Blast", kind: "ultimate", desc: "Cooldown ultimate: 4,000% physical damage and +50% attack for 10s." }
    ],
    lv6: { text: "Ki Blast ultimate unlocked", unlock: true },
    lv12: { text: "Giant Fist skill unlocked", unlock: true },
    immortal: {
      id: "primeval-bomba", name: "Primeval Bomba", ko: "원시 밤바", documented: true, atk: "66.6K (+3.3K)", aspd: "1.5",
      how: "Once Training is maxed, each basic attack has a 0.1% chance to summon it.",
      skills: [
        { name: "Ground Pound", kind: "skill", desc: "10% chance: 4,000% physical damage every 0.5s for 2.5s." },
        { name: "Uppercut", kind: "skill", desc: "Every 10 attacks: 8,000% physical damage, and the next 5 basic attacks deal +100%." },
        { name: "Unleash Power", kind: "ultimate", desc: "Cooldown ultimate: +100% attack, +30% attack speed and ignores 25% defense for 10s." }
      ],
      lv6: "Unleash Power unlocked",
      lv12: "Unleash Power lasts 10s longer",
      updated: "2026-06-09"
    }
  },
  {
    id: "coldy", name: "Coldy", ko: "콜디", type: "ranged", race: "Spirit", damage: "magic",
    atk: "9.3K (+465)", aspd: "2", updated: "2026-11-14",
    skills: [
      { name: "Slow", kind: "passive", desc: "All enemies are slowed by 50." },
      { name: "Glacier", kind: "passive", desc: "Spend Water Spirits to add 10 more glaciers to Glacier Crash each time." },
      { name: "Blizzard", kind: "skill", desc: "8% chance: 2,000% magic damage and a 3s stun in range." },
      { name: "Ice Flower", kind: "skill", desc: "8% chance: 2,000% magic damage and a 1s slow." },
      { name: "Glacier Crash", kind: "ultimate", desc: "Drops 10 glaciers at random spots, each dealing 600% magic damage." }
    ],
    lv6: { text: "Blizzard skill unlocked", unlock: true },
    lv12: { text: "Glacier Crash drops +10 glaciers" },
    immortal: { id: "queen-coldy", name: "Queen Coldy", ko: "여왕 콜디", documented: false }
  },
  {
    id: "lancelot", name: "Lancelot", ko: "랜슬롯", type: "melee", race: "Human", damage: "magic",
    atk: "14.04K (+702)", aspd: "2", updated: "2026-10-12",
    skills: [
      { name: "Attack Up", kind: "passive", desc: "All allies gain 10% attack." },
      { name: "Flame", kind: "passive", desc: "Skills deal extra damage equal to 0.2% of the enemy's max HP. Upgrade it up to 10 times with luck stones." },
      { name: "Flame Slash", kind: "skill", desc: "16% chance: 2,200% magic damage in range." },
      { name: "Sunspot Burst", kind: "skill", desc: "8% chance: 1,500% magic damage plus a delayed explosion for another 1,500%." },
      { name: "Fire Pillar", kind: "ultimate", desc: "Mana ultimate: a pillar of fire dealing 360% magic damage every 0.1s for 1s." }
    ],
    lv6: { text: "Fire Pillar ultimate unlocked", unlock: true },
    lv12: { text: "Flame max-HP damage +0.1%" },
    immortal: { id: "knight-lancelot", name: "Knight Lancelot", ko: "기사 랜슬롯", documented: false, noImage: true }
  },
  {
    id: "iron-meow", name: "Iron Meow", ko: "아이언미야옹", type: "melee/ranged", race: "Animal", damage: "magic",
    atk: "8.7K → 11.7K", aspd: "2 → 2.5", updated: "2026-11-19",
    note: "Suits up for luck stones and can be upgraded to Iron Meow v2 (27.5K attack).",
    skills: [
      { name: "Advanced Tech", kind: "passive", desc: "All allies regenerate mana 30% faster." },
      { name: "Power Suit", kind: "passive", desc: "Spend 10 luck stones to put on the power suit." },
      { name: "Pulse Beam", kind: "passive", desc: "Fires a beam dealing 500% magic damage in range." },
      { name: "Laser Blade", kind: "skill", desc: "8% chance: spinning laser blades deal 4,200% magic damage." },
      { name: "Repulsor Beam", kind: "ultimate", desc: "Mana ultimate: 900% magic damage every 0.1s for 2s." }
    ],
    lv6: { text: "Power Suit costs 5 fewer luck stones" },
    lv12: { text: "Skill damage +50%" },
    immortal: {
      id: "i-am-meow", name: "I Am Meow", ko: "아이엠 미야옹", documented: true, atk: "58.5K", aspd: "2",
      how: "Transforms when Iron Meow v2 reaches tech upgrade +10.",
      skills: [
        { name: "Mega Blast", kind: "skill", desc: "7% chance: 18,000% magic damage in range." },
        { name: "Support Beam", kind: "skill", desc: "7% chance: 10,000% magic damage twice." },
        { name: "Omega Blaster", kind: "ultimate", desc: "Mana ultimate: 10,000% magic damage every 0.3s for 3s." }
      ],
      lv6: "Omega Blaster lasts 1.5s longer",
      lv12: "Skill trigger chance +4%"
    }
  },
  {
    id: "monopoly-man", name: "Monopoly Man", ko: "모노폴리맨", type: "melee", race: "Demon", damage: "support",
    atk: "7.56K (+378)", aspd: "2", updated: "2026-10-16",
    skills: [
      { name: "Defense Down", kind: "passive", desc: "All enemies lose 20 defense." },
      { name: "Transmute", kind: "ultimate", desc: "Turns a common enemy into +1 luck stone." }
    ],
    lv6: { text: "Mana skill cost −20%" },
    lv12: { text: "Transmute has a 20% chance to give 1 extra luck stone" },
    immortal: { id: "demon-monopoly", name: "Demon Monopoly", ko: "악마 모노폴리", documented: false, noImage: true }
  },
  {
    id: "mama", name: "Mama", ko: "마마", type: "ranged", race: "Demon", damage: "magic",
    atk: "8.1K (+405)", aspd: "2", updated: "2026-10-13",
    note: "Summons Imps. The wiki's skill list for Mama is incomplete.",
    skills: [
      { name: "Defense Down", kind: "passive", desc: "All enemies lose 20 defense." }
    ],
    lv6: { text: "Skill trigger chance +3%" },
    lv12: { text: "Summoned Imps take up 0 population" },
    immortal: {
      id: "grand-mama", name: "Grand Mama", ko: "그랜드 마마", documented: true, atk: "34K (+1.7K)", aspd: "1.5",
      how: "Summonable while 1 Mama and 9 or more Imps are on the field."
    }
  },
  {
    id: "frog-prince", name: "Frog Prince", ko: "개구리 왕자", type: "melee", race: "Animal", damage: "physical",
    atk: "7.2K (+360)", aspd: "2", updated: "2026-05-29",
    note: "If Break the Curse succeeds, it ascends into King Dian.",
    skills: [
      { name: "Attack Speed Up", kind: "passive", desc: "All allies gain 10% attack speed." },
      { name: "Break the Curse", kind: "passive", desc: "25% chance to ascend into a divine form. If it fails, the Frog Prince disappears." },
      { name: "Head Strike", kind: "skill", desc: "8% chance: 500% physical damage." },
      { name: "Tongue Lash", kind: "skill", desc: "8% chance: 600% magic damage every 0.5s for 2.5s and slows enemies." }
    ],
    lv6: { text: "Head Strike now stuns for 3s" },
    lv12: { text: "Break the Curse chance +10% (to 35%)" },
    immortal: {
      id: "reaper-frog", name: "Reaper Frog", ko: "사신 개구리", documented: true, atk: "30.2K", aspd: "1.65",
      lv6: "Chain Lightning chance +5%",
      lv12: "Reaper Ascension chance +15%",
      updated: "2026-09-24"
    }
  },
  {
    id: "bat-man", name: "Bat Man", ko: "배트맨", type: "melee", race: "Human", damage: "physical",
    atk: "18.2K", aspd: "2", updated: "2026-09-25",
    skills: [
      { name: "Bat Upgrade", kind: "passive", desc: "Spend coins to upgrade the bat (up to +20). Success raises attack and gives +30% attack for 10s. Failure can reset the bat and break it." },
      { name: "Whirlwind Swing", kind: "skill", desc: "12% chance: a shockwave dealing 4,000% physical damage." },
      { name: "Full Swing", kind: "ultimate", desc: "Cooldown ultimate: 7,000% physical damage to enemies in front." }
    ],
    lv6: { text: "One failed upgrade won't break the bat (the level resets instead)" },
    lv12: { text: "The Lv 6 protection becomes unlimited, and a successful upgrade has a 10% chance to go up 2 levels" },
    immortal: {
      id: "ace-bat-man", name: "Ace Bat Man", ko: "에이스 배트맨", documented: true, atk: "60K (+3K)", aspd: "1.5",
      how: "From bat level +10, each ultimate has a 1% chance to summon it, +2.5% for every bat level above that.",
      skills: [
        { name: "Pitcher: Fastball", kind: "skill", desc: "10% chance: 16,000% physical damage. A kill throws another ball, up to 3 times." },
        { name: "Pitcher: Finish Pitch", kind: "ultimate", desc: "8s strike zone dealing 4,000% physical damage every 0.8s, each hit with a 10% chance of a bonus 10,000% pitch." },
        { name: "Batter: Power Swing", kind: "skill", desc: "Every 10 attacks: 25,000% physical damage, +80% for each bat level." },
        { name: "Batter: Home Run Barrage", kind: "ultimate", desc: "Repeated hits for 12,000% physical damage each. Higher bat levels add more hits, and each hit deals 50% more than the last." }
      ],
      lv6: "Finish Pitch and Home Run Barrage unlocked",
      lv12: "Finish Pitch bonus-pitch chance +10%, Home Run Barrage damage +50%",
      updated: "2026-10-03"
    }
  },
  {
    id: "orc-shaman", name: "Orc Shaman", ko: "오크주술사", type: "ranged", race: "Demon", damage: "magic",
    atk: "5.04K (+252)", aspd: "2", updated: "2026-11-18",
    skills: [
      { name: "Defense Down", kind: "passive", desc: "All enemies lose 20 defense." },
      { name: "Curse", kind: "skill", desc: "8% chance: 2,000% magic damage and a 2s stun, with a 10% chance to apply Doom Curse (+15% physical damage taken for 3s)." },
      { name: "Infection", kind: "ultimate", desc: "Infects enemies in range: 400% magic damage every 0.5s for 10s." }
    ],
    lv6: { text: "Infection ultimate unlocked", unlock: true },
    lv12: { text: "Infection also lowers defense by 30" },
    immortal: { id: "orc-chieftain", name: "Orc Chieftain", ko: "오크지도자", documented: false, noImage: true }
  },
  {
    id: "vayne", name: "Vayne", ko: "베인", type: "ranged", race: "Human", damage: "physical",
    atk: "21.6K (+1.1K)", aspd: "0.5", updated: "2026-10-21",
    skills: [
      { name: "Tumble", kind: "passive", desc: "After moving, the next basic attack deals 3,000% physical damage and cuts the ultimate cooldown by 0.75s." },
      { name: "Golden Arrow", kind: "passive", desc: "Every 3rd hit on the same target deals 5,500% physical damage." },
      { name: "Final Stand", kind: "ultimate", desc: "Cooldown ultimate: +500% attack and +200% attack speed for 10s." }
    ],
    lv6: { text: "Golden Arrow unlocked", unlock: true },
    lv12: { text: "Tumble deals +2,000% damage and stuns for 1s" },
    immortal: {
      id: "top-vayne", name: "Top Vayne", ko: "탑 베인", documented: true, atk: "63.6K (+3.2K)", aspd: "0.7",
      how: "Transforms after Vayne has cast her ultimate 12 times."
    }
  },
  {
    id: "indy", name: "Indy", ko: "인디", type: "ranged", race: "Animal", damage: "physical",
    atk: "11.7K (+585)", aspd: "1", updated: "2026-05-29",
    skills: [
      { name: "Mysterious Treasure", kind: "passive", desc: "Holds 1 treasure and buffs allies depending on which one." },
      { name: "Secret Weapon", kind: "skill", desc: "8% chance: 4,000% physical damage and slows by 70 for 2s." },
      { name: "Wow! Treasure", kind: "ultimate", desc: "Searches the map for hidden treasure; move there to dig it up." }
    ],
    lv6: { text: "When mana is full, briefly shows where the treasure is (and again when Indy is selected)" },
    lv12: { text: "Swapping treasure never digs up a lower grade" },
    immortal: null
  },
  {
    id: "watt", name: "Watt", ko: "와트", type: "melee", race: "Human", damage: "magic",
    atk: "16.38K (+819)", aspd: "2", updated: "2026-07-07",
    skills: [
      { name: "Absorbing Strike", kind: "skill", desc: "8% chance: absorbs 1 energy, then deals 5,000% magic damage." },
      { name: "Discharge Mode", kind: "ultimate", desc: "Switch modes: +100% attack speed and +3% attack per energy. Attacks use up energy and deal 2,000% magic damage in range." },
      { name: "Energy Absorb", kind: "passive", desc: "Basic attacks have a 5% chance to absorb 1 energy (unlocked at Lv 12)." }
    ],
    lv6: { text: "Discharge Mode attack bonus +2% per energy" },
    lv12: { text: "Energy Absorb skill unlocked", unlock: true },
    immortal: null
  },
  {
    id: "tar", name: "Tar", ko: "타르", type: "melee", race: "Demon", damage: "physical",
    atk: "6.05K (+303)", aspd: "1.5", updated: "2026-11-16",
    skills: [
      { name: "Primordial Power", kind: "passive", desc: "Rolls a grade when summoned; all its abilities scale with that grade." },
      { name: "Cannibalize", kind: "passive", desc: "Absorbs the lowest-grade Tar for +15% attack." },
      { name: "Black Matter", kind: "skill", desc: "8% chance: sticky matter deals 500% physical damage every 0.5s for 5s and lowers defense by 5." },
      { name: "Blade Slash", kind: "skill", desc: "8% chance: 3,000% physical damage, +50% against normal monsters." },
      { name: "Pierce", kind: "ultimate", desc: "1,000% physical damage 6 times, more against low-HP enemies." }
    ],
    lv6: { text: "Blade Slash skill unlocked", unlock: true },
    lv12: { text: "Cannibalize attack bonus +15%" },
    immortal: { id: "swarm-tar", name: "Swarm Tar", ko: "군체 타르", documented: false, noImage: true }
  },
  {
    id: "rocket-chu", name: "Rocket Chu", ko: "로켓츄", type: "ranged", race: "Robot", damage: "physical",
    atk: "11.9K (+595)", aspd: "1.25", updated: "2026-11-19",
    note: "A successful Overclock turns it into Overclock Rocket Chu: 23.8K attack, 1.5 attack speed, a stronger Annihilation Rocket (every 15 attacks, 4,000% per missile) and the Mini Chu drone ultimate.",
    skills: [
      { name: "Overclock", kind: "passive", desc: "35% chance to power up. On failure it self-destructs, dealing 99,999% physical damage in range." },
      { name: "Enhanced Rocket", kind: "skill", desc: "10% chance: 4,000% physical damage." },
      { name: "Annihilation Rocket", kind: "skill", desc: "Every 20 attacks: 4 missiles, each dealing 2,500% physical damage." }
    ],
    lv6: { text: "Overclock chance +15% (to 50%)" },
    lv12: { text: "Annihilation Rocket unlocked", unlock: true },
    immortal: null
  },
  {
    id: "uchi", name: "Uchi", ko: "우치", type: "ranged", race: "Human", damage: "magic",
    atk: "16.7K (+837)", aspd: "0.6", updated: "2026-09-25",
    skills: [
      { name: "Eye of the Storm", kind: "passive", desc: "Deals 5% more damage the farther away the target is (unlocked at Lv 6)." },
      { name: "Sharp Wind", kind: "skill", desc: "10% chance: a storm at the enemy dealing 750% magic damage every 0.1s for 1s." },
      { name: "Wind Spirit", kind: "ultimate", desc: "Mana ultimate: 8,000% magic damage, +10% for each fewer enemy in range." }
    ],
    lv6: { text: "Eye of the Storm unlocked", unlock: true },
    lv12: { text: "Sharp Wind trigger chance +10%" },
    immortal: { id: "sky-dragon-uchi", name: "Sky Dragon Uchi", ko: "천룡 우치", documented: false, noImage: true }
  },
  {
    id: "jiji", name: "Jiji", ko: "지지", type: "ranged", race: "Human", damage: "magic",
    atk: "23.2K (+624)", aspd: "1.5", updated: "2026-06-05",
    skills: [
      { name: "Change of Thinking", kind: "passive", desc: "Basic attacks deal magic damage, stay on one target and ignore attack-speed changes." },
      { name: "Perfect Calculation", kind: "skill", desc: "10% chance: fires 2 magic missiles, each 2,500% magic damage." },
      { name: "Mana Amplify", kind: "ultimate", desc: "+100% damage for 20s; attacking the same target adds +100% basic damage every 0.5s (max 15s)." }
    ],
    lv6: { text: "Perfect Calculation fires +2 missiles" },
    lv12: { text: "Mana Amplify lasts forever" },
    immortal: { id: "magic-scholar-jiji", name: "Magic Scholar Jiji", ko: "마도학자 지지", documented: false, noImage: true }
  },
  {
    id: "master-kun", name: "Master Kun", ko: "마스터 쿤", type: "melee", race: "Animal", damage: "magic",
    atk: "18.7K (+936)", aspd: "1", updated: "2026-10-31",
    recipe: "Tiger Master + Eagle General + Paladin",
    skills: [
      { name: "Flame Creation", kind: "passive", desc: "Every 30 points of Anger Control adds another spinning flame (unlocked at Lv 6)." },
      { name: "Spinning Flames", kind: "skill", desc: "6% chance: 2 flames spin for 10s, each dealing 550% magic damage." },
      { name: "Flame Claw", kind: "skill", desc: "8% chance: 5,000% magic area damage, doubled against targets above 50% HP." },
      { name: "Anger Control", kind: "ultimate", desc: "Press to hold in its anger for 15s (can't act), then gain a random attack boost." }
    ],
    lv6: { text: "Flame Creation unlocked", unlock: true },
    lv12: { text: "Skill damage +50%" },
    immortal: { id: "sage-kun", name: "Sage Kun", ko: "선인 쿤", documented: false, noImage: true }
  },
  {
    id: "chona", name: "Chona", ko: "초나", type: "ranged", race: "Spirit", damage: "physical",
    atk: "20.2K (+1K)", aspd: "1.3", updated: "2026-11-19",
    recipe: "Sheriff + Tree + Demon Soldier + Barbarian",
    skills: [
      { name: "Thorn Seed", kind: "skill", desc: "10% chance: plants a seed that bursts after 10s for 6,000% physical damage." },
      { name: "Plant Stem", kind: "skill", desc: "Every 25 attacks: 7,000% physical damage in range." },
      { name: "Naamu", kind: "ultimate", desc: "Summons Naamu for 30s, dealing 2,500% physical damage every second." },
      { name: "Premium Fertilizer", kind: "skill", desc: "Naamu's attacks have a 12% chance to deal 6,500% physical damage (unlocked at Lv 12)." }
    ],
    lv6: { text: "Thorn Seed trigger chance +5%" },
    lv12: { text: "Premium Fertilizer unlocked", unlock: true },
    immortal: { id: "ancient-chona", name: "Ancient Chona", ko: "만년 초나", documented: false, noImage: true }
  },
  {
    id: "penguin-bard", name: "Penguin Bard", ko: "펭귄악사", type: "ranged", race: "Animal", damage: "support",
    atk: "13K (+650)", aspd: "1.5", updated: "2026-07-25",
    recipe: "Eagle General + Wolf Warrior + Electric Robot",
    incomplete: true,
    note: "The wiki has no skill or level data yet. It describes a strong attack-speed buff and an ability that randomly transforms your other units.",
    skills: [],
    lv6: null, lv12: null,
    immortal: { id: "noise-king-penguin", name: "Noise King Penguin Bard", ko: "소음킹 펭귄악사", documented: false }
  },
  {
    id: "hailey", name: "Hailey", ko: "헤일리", type: "ranged", race: "Human", damage: "magic",
    atk: "19.2K (+959)", aspd: "1.5", updated: "2026-11-19",
    skills: [
      { name: "Star Power", kind: "passive", desc: "Summoning heroes gives a 20% chance of a Star Power stack (max 10). Each stack gives +200% attack." },
      { name: "Light Ray", kind: "skill", desc: "10% chance: an eye laser dealing 5,000% magic damage in range." },
      { name: "Seed of Light", kind: "skill", desc: "12% chance: plants energy that explodes after 7s for 5,000% magic damage." },
      { name: "Supernova", kind: "ultimate", desc: "Mana ultimate: Star Power bonus +50% and all skill damage +50% for 30s." }
    ],
    lv6: { text: "Star Power attack bonus +200%" },
    lv12: { text: "Seed of Light unlocked", unlock: true },
    immortal: {
      id: "awakened-hailey", name: "Awakened Hailey", ko: "각성 헤일리", documented: true, atk: "54.6K", aspd: "1.5",
      how: "With full Star Power, using the ultimate has a 15% chance to summon it."
    }
  },
  {
    id: "ato", name: "Ato", ko: "아토", type: "ranged", race: "Animal", damage: "support",
    atk: "10.6K (+528)", aspd: "1.3", updated: "2026-08-01",
    skills: [
      { name: "Defense Down", kind: "passive", desc: "All enemies lose 20 defense." },
      { name: "Time Delay", kind: "skill", desc: "8% chance: 500% physical damage every 0.5s for 5s and 60% slower movement." },
      { name: "Borrowed Power", kind: "skill", desc: "8% chance: allies in range deal 10% more physical damage for 3s." },
      { name: "Mysterious Clock", kind: "ultimate", desc: "Allies in range have 15% of their remaining cooldowns removed." }
    ],
    lv6: { text: "Mysterious Clock unlocked", unlock: true },
    lv12: { text: "Borrowed Power bonus +5%" },
    immortal: { id: "chrono-ato", name: "Chrono Ato", ko: "시공 아토", documented: false }
  },
  {
    id: "roka", name: "Roka", ko: "로카", type: "ranged", race: "Human", damage: "physical",
    atk: "24.6K (+1.2K)", aspd: "1", updated: "2026-08-01",
    skills: [
      { name: "Precision Aim", kind: "passive", desc: "+1,000% attack. Critical chance rises with distance, up to +30%." },
      { name: "Explosive Rounds", kind: "passive", desc: "Loads 1–5 explosive rounds every 10s, each dealing 2,000% physical damage in range." },
      { name: "Rapid Fire", kind: "skill", desc: "7% chance: +15% attack speed for 6s." },
      { name: "Piercing Shot", kind: "skill", desc: "Every 15 attacks: 6,500% physical damage, and the next 3 basic attacks deal +100%." },
      { name: "Headshot", kind: "ultimate", desc: "Cooldown ultimate: 20,000% physical damage; the marked target takes a guaranteed crit." }
    ],
    lv6: { text: "Rapid Fire lasts 4s longer" },
    lv12: { text: "Explosive Rounds damage +100%" },
    immortal: {
      id: "captain-roka", name: "Captain Roka", ko: "캡틴 로카", documented: true, atk: "56.4K (+2.8K)", aspd: "1",
      how: "Summonable after firing 160 explosive rounds."
    }
  },
  {
    id: "birdraw", name: "Birdraw", ko: "골라조", type: "ranged", race: "Animal", damage: "magic",
    atk: "24K", aspd: "1.5", updated: "2025-12-28",
    skills: [
      { name: "Card Amplify", kind: "passive", desc: "Card-game score adds 1% skill damage per point. 30 points empowers Shuffle, 70 points empowers Magic Circle." },
      { name: "Shuffle", kind: "skill", desc: "8% chance: throws a card for 3,500% magic damage (+2 cards when empowered)." },
      { name: "Magic Circle", kind: "skill", desc: "6% chance: 400% magic damage every 0.5s for 3s (+2s when empowered)." },
      { name: "Game of Fate", kind: "ultimate", desc: "Draw cards and stop to bank the total as score. Exactly 21 gives the max; going over gives nothing." }
    ],
    lv6: { text: "Card Amplify gives +1% more skill damage per point" },
    lv12: { text: "Magic Circle unlocked", unlock: true },
    immortal: {
      id: "boss-birdraw", name: "Boss Birdraw", ko: "보스 골라조", documented: true, atk: "60K", aspd: "1.5",
      how: "Transforms when Card Amplify reaches 100 points."
    }
  },
  {
    id: "chad", name: "Chad", ko: "채드", type: "", race: "", damage: "support",
    atk: "—", aspd: "—", updated: "2026-11-11",
    recipe: "War Machine + Ranger + Paladin",
    incomplete: true, noImage: true,
    note: "Chad's wiki page is a stub, so stats, skills and level effects aren't available yet. The wiki calls Chad the best support unit.",
    skills: [],
    lv6: null, lv12: null,
    immortal: { id: "giga-chad", name: "Giga Chad", ko: "기가 채드", documented: false, noImage: true }
  },
  {
    id: "rei", name: "Rei", ko: "레이", type: "melee", race: "Human", damage: "physical",
    atk: "22.7K (+1.1K)", aspd: "1.4", updated: "2026-08-12",
    skills: [
      { name: "Sword Throw", kind: "skill", desc: "12% chance: throws a summoned sword for 4,000% physical damage in range." },
      { name: "Summon Sword", kind: "ultimate", desc: "Cooldown ultimate: summons a random sword (common to legendary), each with its own buff." }
    ],
    lv6: { text: "Range +35%" },
    lv12: { text: "Sword Throw damage +4,000%" },
    immortal: { id: "hero-rei", name: "Hero Rei", ko: "용사 레이", documented: false, noImage: true }
  },
  {
    id: "emily", name: "Emily", ko: "에밀리", type: "ranged", race: "Spirit", damage: "physical",
    atk: "26.3K (+1K)", aspd: "1.5", updated: "2026-11-19",
    skills: [
      { name: "Nature's Power", kind: "passive", desc: "Basic attacks deal 300% physical damage in an area. Using a skill gives 5 energy." },
      { name: "Fairy's Power", kind: "passive", desc: "Every 100 basic attacks, summons a fairy that gives a random buff." },
      { name: "Volley", kind: "skill", desc: "Every 11 basic attacks: 4 arrows, each 1,300% physical damage." },
      { name: "Fairy Arrow", kind: "ultimate", desc: "At 100 spirit energy, fires a giant arrow for 20,000% physical damage." }
    ],
    lv6: { text: "Each Fairy's Power gives +100% attack" },
    lv12: { text: "Volley fires +2 arrows" },
    immortal: { id: "fairy-queen-emily", name: "Fairy Queen Emily", ko: "요정왕 에밀리", documented: true, atk: "58.1K", aspd: "1.5", noImage: true }
  }
];
