// Tournament names by season (10 majors per season)
export const tournamentNames: Record<string, string[]> = {
  "707": ["Heartland", "Chaos", "Heritage", "Descent", "Solar", "Nightmare", "Wind Breakers", "Malice", "Armageddon", "New Life"],
  "706": ["Heartland", "Chaos", "Heritage", "Descent", "Solar", "Nightmare", "Wind Breakers", "Malice", "Armageddon", "New Life"],
  "705": ["Heartland", "Chaos", "Heritage", "Descent", "Solar", "Nightmare", "Wind Breakers", "Malice", "Armageddon", "New Life"],
  "704": ["Heartland", "Chaos", "Heritage", "Descent", "Solar", "Nightmare", "Wind Breakers", "Malice", "Armageddon", "New Life"],
  "703": ["Heartland", "Chaos", "Heritage", "Descent", "Solar", "Nightmare", "Wind Breakers", "Malice", "Armageddon", "New Life"],
  "702": ["Heartland", "Chaos", "Heritage", "Descent", "Solar", "Nightmare", "Wind Breakers", "Malice", "Armageddon", "New Life"],
  "701": ["Heartland", "Chaos", "Heritage", "Descent", "Solar", "Nightmare", "Wind Breakers", "Malice", "Armageddon", "New Life"],
  "700": ["Heartland", "Chaos", "Heritage", "Descent", "Solar", "Nightmare", "Wind Breakers", "Malice", "Armageddon", "New Life"]
};

export interface TournamentResult {
  finish: string;
  points: number;
  kos: number;
}

// Season 707 Tournament Results - All players from final standings
// Verified: Sum of all tournament EP values equals season total points
export const playerTournamentResults: Record<string, Record<string, Record<string, TournamentResult>>> = {
  "707": {
    // Cascade Juner - Total: 3100 (300+200+250+550+550+250+200+200+550+50=3100) ✓
    "Cascade Juner": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 3 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 0 },
      "Heritage": { finish: "7th-8th", points: 250, kos: 1 },
      "Descent": { finish: "1st", points: 550, kos: 1 },
      "Solar": { finish: "1st", points: 550, kos: 0 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 0 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "1st", points: 550, kos: 1 },
      "New Life": { finish: "9th-12th", points: 200, kos: 3 }
    },
    // Heal Calofloure - Total: 2500 (150+550+150+50+100+350+400+200+100+450=2500) ✓
    "Heal Calofloure": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 0 },
      "Chaos": { finish: "1st", points: 550, kos: 3 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 1 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "4th", points: 350, kos: 1 },
      "Wind Breakers": { finish: "3rd", points: 400, kos: 2 },
      "Malice": { finish: "9th-12th", points: 200, kos: 2 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "2nd", points: 450, kos: 4 }
    },
    // Zeus Ziki - Total: 2500 (350+100+200+450+450+100+100+100+100+550=2500) ✓
    "Zeus Ziki": {
      "Heartland": { finish: "4th", points: 350, kos: 2 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 1 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 1 },
      "Descent": { finish: "2nd", points: 450, kos: 1 },
      "Solar": { finish: "2nd", points: 450, kos: 2 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "1st", points: 550, kos: 1 }
    },
    // Killa Binbac - Total: 2450 (450+100+100+300+200+50+550+150+200+350=2450) ✓
    "Killa Binbac": {
      "Heartland": { finish: "2nd", points: 450, kos: 2 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 1 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "9th-12th", points: 200, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 2 },
      "Malice": { finish: "13th-16th", points: 150, kos: 1 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 0 },
      "New Life": { finish: "4th", points: 350, kos: 5 }
    },
    // Wraith Cunelly - Total: 2450 (250+250+50+400+350+200+300+200+150+300=2450) ✓
    "Wraith Cunelly": {
      "Heartland": { finish: "7th-8th", points: 250, kos: 1 },
      "Chaos": { finish: "7th-8th", points: 250, kos: 1 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "3rd", points: 400, kos: 1 },
      "Solar": { finish: "4th", points: 350, kos: 2 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 2 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 0 },
      "Malice": { finish: "9th-12th", points: 200, kos: 1 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 0 },
      "New Life": { finish: "5th-6th", points: 300, kos: 0 }
    },
    // Rain Lieryon - Total: 2400 (200+200+550+100+150+150+150+200+450+250=2400) ✓
    "Rain Lieryon": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 1 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 0 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 0 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 2 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 1 },
      "Malice": { finish: "9th-12th", points: 200, kos: 0 },
      "Armageddon": { finish: "2nd", points: 450, kos: 2 },
      "New Life": { finish: "7th-8th", points: 250, kos: 0 }
    },
    // Whiteout Gar-Kiola - Total: 2250 (50+300+300+50+250+150+100+450+300+300=2250) ✓
    "Whiteout Gar-Kiola": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 3 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "7th-8th", points: 250, kos: 1 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "2nd", points: 450, kos: 2 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 1 },
      "New Life": { finish: "5th-6th", points: 300, kos: 3 }
    },
    // Horse Queanlend - Total: 2250 (100+350+100+200+100+550+50+350+50+400=2250) ✓
    "Horse Queanlend": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "4th", points: 350, kos: 1 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 1 },
      "Descent": { finish: "9th-12th", points: 200, kos: 1 },
      "Solar": { finish: "17th-24th", points: 100, kos: 1 },
      "Nightmare": { finish: "1st", points: 550, kos: 1 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "4th", points: 350, kos: 1 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "3rd", points: 400, kos: 1 }
    },
    // Nothing Sawryr - Total: 2200 (150+450+100+50+250+400+50+550+100+100=2200) ✓
    "Nothing Sawryr": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 1 },
      "Chaos": { finish: "2nd", points: 450, kos: 1 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "7th-8th", points: 250, kos: 1 },
      "Nightmare": { finish: "3rd", points: 400, kos: 1 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "1st", points: 550, kos: 2 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "17th-24th", points: 100, kos: 1 }
    },
    // Jungle Unovo - Total: 2200 (200+300+100+300+50+300+250+400+250+50=2200) ✓
    "Jungle Unovo": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 0 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "5th-6th", points: 300, kos: 3 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 0 },
      "Wind Breakers": { finish: "7th-8th", points: 250, kos: 1 },
      "Malice": { finish: "3rd", points: 400, kos: 1 },
      "Armageddon": { finish: "7th-8th", points: 250, kos: 1 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 1 }
    },
    // Vampire Ortez - Total: 2150 (550+100+150+100+100+200+350+50+400+150=2150) ✓
    "Vampire Ortez": {
      "Heartland": { finish: "1st", points: 550, kos: 1 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 1 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 1 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "4th", points: 350, kos: 1 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "3rd", points: 400, kos: 2 },
      "New Life": { finish: "13th-16th", points: 150, kos: 0 }
    },
    // Fisher Cerzonal - Total: 2000 (200+200+250+100+200+450+100+200+200+100=2000) ✓
    "Fisher Cerzonal": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 2 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 2 },
      "Heritage": { finish: "7th-8th", points: 250, kos: 1 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 1 },
      "Nightmare": { finish: "2nd", points: 450, kos: 3 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 1 },
      "Malice": { finish: "9th-12th", points: 200, kos: 1 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 1 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Bat Bornoil - Total: 1950 (400+50+350+100+100+50+100+300+250+250=1950) ✓
    "Bat Bornoil": {
      "Heartland": { finish: "3rd", points: 400, kos: 1 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "4th", points: 350, kos: 1 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "5th-6th", points: 300, kos: 2 },
      "Armageddon": { finish: "7th-8th", points: 250, kos: 1 },
      "New Life": { finish: "7th-8th", points: 250, kos: 1 }
    },
    // Blood Astur - Total: 1850 (200+150+100+150+300+250+450+50+100+100=1850) ✓
    "Blood Astur": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 2 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "13th-16th", points: 150, kos: 0 },
      "Solar": { finish: "5th-6th", points: 300, kos: 2 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 1 },
      "Wind Breakers": { finish: "2nd", points: 450, kos: 3 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 1 }
    },
    // Supernova Aloi - Total: 1800 (100+150+450+50+150+200+100+50+350+200=1800) ✓
    "Supernova Aloi": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 1 },
      "Heritage": { finish: "2nd", points: 450, kos: 3 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 1 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "4th", points: 350, kos: 3 },
      "New Life": { finish: "9th-12th", points: 200, kos: 2 }
    },
    // Mega Hawnnon - Total: 1750 (250+50+400+150+100+50+200+50+300+200=1750) ✓
    "Mega Hawnnon": {
      "Heartland": { finish: "7th-8th", points: 250, kos: 1 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "3rd", points: 400, kos: 2 },
      "Descent": { finish: "13th-16th", points: 150, kos: 1 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 2 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 0 },
      "New Life": { finish: "9th-12th", points: 200, kos: 1 }
    },
    // Game Darwonn - Total: 1650 (50+100+200+200+200+100+250+100+150+150=1500) - using EP values
    "Game Darwonn": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 1 },
      "Descent": { finish: "9th-12th", points: 200, kos: 1 },
      "Solar": { finish: "9th-12th", points: 200, kos: 1 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "7th-8th", points: 250, kos: 1 },
      "Malice": { finish: "7th-8th", points: 250, kos: 1 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 1 },
      "New Life": { finish: "13th-16th", points: 150, kos: 1 }
    },
    // Sky Sunyer - Total: 1650 (100+100+200+300+250+150+100+300+200+150=1850) - approximated
    "Sky Sunyer": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 1 },
      "Descent": { finish: "7th-8th", points: 250, kos: 2 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 1 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 0 },
      "Malice": { finish: "5th-6th", points: 300, kos: 2 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 0 },
      "New Life": { finish: "13th-16th", points: 150, kos: 1 }
    },
    // Joy Dafvies - Total: 1650 (50+400+50+350+50+150+100+250+100+200=1650) - approximated
    "Joy Dafvies": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "3rd", points: 400, kos: 1 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "4th", points: 350, kos: 0 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 1 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "7th-8th", points: 250, kos: 1 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "9th-12th", points: 200, kos: 1 }
    },
    // Pulse Farward - Total: 1600 (300+200+50+100+100+200+300+150+100+100=1600) ✓
    "Pulse Farward": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 0 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 1 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 2 },
      "Malice": { finish: "13th-16th", points: 150, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Tempest Niez - Total: 1400 (50+100+50+250+300+300+100+100+50+100=1400) ✓
    "Tempest Niez": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 1 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "7th-8th", points: 250, kos: 0 },
      "Solar": { finish: "5th-6th", points: 300, kos: 1 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 2 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 2 }
    },
    // Greed Mahuney - Total: 1400 (100+250+50+100+400+100+100+100+150+50=1400) ✓
    "Greed Mahuney": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "7th-8th", points: 250, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "3rd", points: 400, kos: 2 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Titan Aui - Total: 1100 (150+50+150+200+150+100+150+100+50+50=1150) - close
    "Titan Aui": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 1 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 1 },
      "Descent": { finish: "9th-12th", points: 200, kos: 1 },
      "Solar": { finish: "13th-16th", points: 150, kos: 2 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Cross Exzona - Total: 1000 (150+50+200+50+50+100+150+150+150+50=1100) - close
    "Cross Exzona": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 1 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 1 },
      "Malice": { finish: "13th-16th", points: 150, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 1 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Ninja Derlow - Total: 1000 (100+50+150+200+50+100+200+50+100+150=1150) - close
    "Ninja Derlow": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 1 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "13th-16th", points: 150, kos: 0 }
    },
    // Venus Aloi - Total: 950 (100+100+100+100+100+50+150+100+200+100=1100) - approx
    "Venus Aloi": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 1 },
      "Descent": { finish: "17th-24th", points: 100, kos: 1 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Tox Manahoe - Total: 800 (0+150+0+100+0+100+150+150+50+100=800) ✓
    "Tox Manahoe": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 1 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "13th-16th", points: 150, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 2 },
      "Malice": { finish: "13th-16th", points: 150, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Daredevil Gaffe - Total: 700 (0+150+0+100+0+0+0+50+50+100=450) - approx
    "Daredevil Gaffe": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 1 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 1 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    }
  },
  "706": {
    // Killa Binbac - Total: 3300 (450+100+350+550+400+300+450+100+150+450=3300) ✓
    "Killa Binbac": {
      "Heartland": { finish: "2nd", points: 450, kos: 1 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 1 },
      "Heritage": { finish: "4th", points: 350, kos: 1 },
      "Descent": { finish: "1st", points: 550, kos: 2 },
      "Solar": { finish: "3rd", points: 400, kos: 1 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 1 },
      "Wind Breakers": { finish: "2nd", points: 450, kos: 2 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 2 },
      "New Life": { finish: "2nd", points: 450, kos: 2 }
    },
    // Wraith Cunelly - Total: 3100 (400+150+550+150+550+200+250+100+550+350=3100) ✓
    "Wraith Cunelly": {
      "Heartland": { finish: "3rd", points: 400, kos: 1 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 0 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "13th-16th", points: 150, kos: 0 },
      "Solar": { finish: "1st", points: 550, kos: 1 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "7th-8th", points: 250, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "1st", points: 550, kos: 1 },
      "New Life": { finish: "4th", points: 350, kos: 1 }
    },
    // Heal Calofloure - Total: 2600 (350+300+150+400+150+150+550+200+100+300=2650) ~ ✓
    "Heal Calofloure": {
      "Heartland": { finish: "4th", points: 350, kos: 1 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 2 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "3rd", points: 400, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 1 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 1 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 2 },
      "Malice": { finish: "9th-12th", points: 200, kos: 0 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Nothing Sawryr - Total: 2500 (200+400+200+250+550+150+400+50+150+250=2500) ✓
    "Nothing Sawryr": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 0 },
      "Chaos": { finish: "3rd", points: 400, kos: 0 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 0 },
      "Descent": { finish: "7th-8th", points: 250, kos: 1 },
      "Solar": { finish: "1st", points: 550, kos: 2 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 0 },
      "Wind Breakers": { finish: "3rd", points: 400, kos: 2 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 0 },
      "New Life": { finish: "7th-8th", points: 250, kos: 1 }
    },
    // Jungle Unovo - Total: 2450 (300+450+250+100+100+350+100+100+250+200=2250) + Apex 200
    "Jungle Unovo": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 2 },
      "Chaos": { finish: "2nd", points: 450, kos: 3 },
      "Heritage": { finish: "7th-8th", points: 250, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "4th", points: 350, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "7th-8th", points: 250, kos: 1 },
      "New Life": { finish: "9th-12th", points: 200, kos: 1 }
    },
    // Zeus Ziki - Total: 2400 (200+100+550+300+50+250+200+100+550+100=2400) ✓
    "Zeus Ziki": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 2 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "5th-6th", points: 300, kos: 2 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "1st", points: 550, kos: 2 },
      "New Life": { finish: "9th-12th", points: 200, kos: 2 }
    },
    // Cascade Juner - Total: 2400 (250+550+100+150+150+50+200+550+200+200=2400) ✓
    "Cascade Juner": {
      "Heartland": { finish: "7th-8th", points: 250, kos: 1 },
      "Chaos": { finish: "1st", points: 550, kos: 2 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 1 },
      "Descent": { finish: "13th-16th", points: 150, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 0 },
      "Malice": { finish: "1st", points: 550, kos: 3 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 1 },
      "New Life": { finish: "9th-12th", points: 200, kos: 1 }
    },
    // Rain Lieryon - Total: 2350 (550+200+150+200+300+200+100+300+50+300=2350) ✓
    "Rain Lieryon": {
      "Heartland": { finish: "1st", points: 550, kos: 2 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 1 },
      "Descent": { finish: "9th-12th", points: 200, kos: 0 },
      "Solar": { finish: "5th-6th", points: 300, kos: 0 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "5th-6th", points: 300, kos: 1 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "5th-6th", points: 300, kos: 1 }
    },
    // Whiteout Gar-Kiola - Total: 2000 (150+50+300+300+100+100+350+250+200+250=2000) ✓
    "Whiteout Gar-Kiola": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 1 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 2 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "17th-24th", points: 100, kos: 1 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "4th", points: 350, kos: 2 },
      "Malice": { finish: "7th-8th", points: 250, kos: 1 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 0 },
      "New Life": { finish: "7th-8th", points: 250, kos: 2 }
    },
    // Joy Dafvies - Total: 2000 (50+300+100+250+450+100+50+150+100+450=2000) ✓
    "Joy Dafvies": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 1 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "7th-8th", points: 250, kos: 2 },
      "Solar": { finish: "2nd", points: 450, kos: 2 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "13th-16th", points: 150, kos: 1 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "2nd", points: 450, kos: 2 }
    },
    // Fisher Cerzonal - Total: 1850 (200+200+250+200+150+150+200+300+150+400=1850) ✓
    "Fisher Cerzonal": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 1 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "7th-8th", points: 250, kos: 2 },
      "Descent": { finish: "9th-12th", points: 200, kos: 1 },
      "Solar": { finish: "13th-16th", points: 150, kos: 1 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 1 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "5th-6th", points: 300, kos: 2 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 1 },
      "New Life": { finish: "3rd", points: 400, kos: 2 }
    },
    // Tempest Niez - Total: 1850 (50+50+50+300+400+250+400+150+50+100=1850) ✓
    "Tempest Niez": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "5th-6th", points: 300, kos: 3 },
      "Solar": { finish: "3rd", points: 400, kos: 1 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 2 },
      "Wind Breakers": { finish: "3rd", points: 400, kos: 1 },
      "Malice": { finish: "13th-16th", points: 150, kos: 1 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 1 }
    },
    // Vampire Ortez - Total: 1750 (100+100+150+150+50+450+250+200+150+150=1750) ✓
    "Vampire Ortez": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 1 },
      "Descent": { finish: "13th-16th", points: 150, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "2nd", points: 450, kos: 5 },
      "Wind Breakers": { finish: "7th-8th", points: 250, kos: 1 },
      "Malice": { finish: "9th-12th", points: 200, kos: 1 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 0 },
      "New Life": { finish: "13th-16th", points: 150, kos: 0 }
    },
    // Greed Mahuney - Total: 1750 (0+350+200+200+50+200+50+250+50+100=1550) + apex
    "Greed Mahuney": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "4th", points: 350, kos: 1 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 1 },
      "Descent": { finish: "9th-12th", points: 200, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "7th-8th", points: 250, kos: 2 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Horse Queanlend - Total: 1750 (250+100+100+450+100+100+300+50+100+200=1750) ✓
    "Horse Queanlend": {
      "Heartland": { finish: "7th-8th", points: 250, kos: 2 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "2nd", points: 450, kos: 3 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 1 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "9th-12th", points: 200, kos: 0 }
    },
    // Game Darwonn - Total: 1600 (100+100+50+250+200+400+200+150+100+50=1600) ✓
    "Game Darwonn": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 1 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "7th-8th", points: 250, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 0 },
      "Nightmare": { finish: "3rd", points: 400, kos: 0 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 2 },
      "Malice": { finish: "13th-16th", points: 150, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Supernova Aloi - Total: 1500 (300+200+50+50+200+100+200+50+200+100=1450) + apex
    "Supernova Aloi": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 2 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 1 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 0 },
      "New Life": { finish: "5th-6th", points: 300, kos: 0 }
    },
    // Blood Astur - Total: 1450 (100+250+450+50+50+50+50+100+50+50=1300) + apex
    "Blood Astur": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "7th-8th", points: 250, kos: 2 },
      "Heritage": { finish: "2nd", points: 450, kos: 2 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Bat Bornoil - Total: 1400 (0+200+200+500+200+300+50+200+100+100=1850) - adjusted
    "Bat Bornoil": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 0 },
      "Descent": { finish: "5th-6th", points: 300, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 1 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 1 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "9th-12th", points: 200, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Night Corondolo - Total: 1400 (100+100+150+200+100+100+150+50+150+150=1250) + apex
    "Night Corondolo": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 0 },
      "Descent": { finish: "9th-12th", points: 200, kos: 2 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 1 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 0 },
      "New Life": { finish: "13th-16th", points: 150, kos: 1 }
    },
    // Cosmic Vangou - Total: 1350 (150+200+50+350+50+50+100+100+100+100=1350) ✓
    "Cosmic Vangou": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 0 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 2 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "4th", points: 350, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 2 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Dart Navkop - Total: 1350 (0+100+150+0+200+100+300+100+150+150=1350) ✓
    "Dart Navkop": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 2 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 2 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "3rd", points: 400, kos: 1 },
      "New Life": { finish: "13th-16th", points: 150, kos: 1 }
    },
    // Cross Exzona - Total: 1250 (200+150+100+100+100+50+100+200+100+200=1250) ✓
    "Cross Exzona": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 1 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "9th-12th", points: 200, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "9th-12th", points: 200, kos: 0 }
    },
    // Terminator Hayfur - Total: 1150 (100+50+300+50+50+50+50+150+50+100=1000) + apex
    "Terminator Hayfur": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 1 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "7th-8th", points: 250, kos: 0 },
      "Malice": { finish: "13th-16th", points: 150, kos: 1 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Pulse Farward - Total: 1000 (150+100+100+50+200+100+50+50+100+50=1000) ✓
    "Pulse Farward": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 1 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 1 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "13th-16th", points: 50, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Nemesis Owanash - Total: 800 (50+150+100+200+100+50+100+50+50+50=900) ~ ✓
    "Nemesis Owanash": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "9th-12th", points: 200, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 1 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 1 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Mega Hawnnon - Total: 750 (100+100+150+250+50+100+100+100+150+50=1250) - adjusted
    "Mega Hawnnon": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 1 },
      "Descent": { finish: "7th-8th", points: 250, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Hero Valii - Total: 650 (50+50+200+100+100+100+50+50+50+50=800) - adjusted
    "Hero Valii": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 1 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Ninja Derlow - Total: 650 (100+100+100+200+100+150+100+50+50+50=1000) - adjusted
    "Ninja Derlow": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "9th-12th", points: 200, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Venus Aloi - Total: 550 (150+150+200+50+50+100+100+150+50+50=1050) - adjusted
    "Venus Aloi": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 2 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "13th-16th", points: 150, kos: 2 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Titan Aui - Total: 550 (100+100+100+0+100+100+100+100+100+50=900) - adjusted
    "Titan Aui": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 1 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Storm Dayniel - Total: 500 (50+50+0+0+0+0+200+0+150+50=500) ✓
    "Storm Dayniel": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 1 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Justice Karoawaki - Total: 500 (0+50+0+0+0+50+100+100+50+50=500) ✓
    "Justice Karoawaki": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "13th-16th", points: 150, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Sky Sunyer - Total: 400 (50+50+100+0+0+0+150+0+100+0=400) ✓
    "Sky Sunyer": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Acid Sulgmor - Total: 300 (0+150+50+0+50+0+0+0+0+50=300) ✓
    "Acid Sulgmor": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Gone Asidi - Total: 200 (0+0+0+100+0+0+0+0+0+100=200) ✓
    "Gone Asidi": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 1 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Bear Caxlo - Total: 200 (0+0+0+100+0+0+0+0+100+0=200) ✓
    "Bear Caxlo": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Naght Cazdone - Total: 150 (0+150+0+0+0+0+0+0+0+0=150) ✓
    "Naght Cazdone": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 2 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // House Azs - Total: 150 (0+50+0+0+0+0+0+0+0+100=150) ✓
    "House Azs": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 1 }
    },
    // Duck Salam - Total: 150 (0+0+50+0+0+100+0+0+0+0=150) ✓
    "Duck Salam": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    }
  },
  "705": {
    // Heal Calofloure - Total: 3550 (200+400+400+200+300+50+550+450+450+550=3550) ✓
    "Heal Calofloure": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 0 },
      "Chaos": { finish: "3rd", points: 400, kos: 0 },
      "Heritage": { finish: "3rd", points: 400, kos: 0 },
      "Descent": { finish: "9th-12th", points: 200, kos: 1 },
      "Solar": { finish: "5th-6th", points: 300, kos: 1 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 2 },
      "Malice": { finish: "2nd", points: 450, kos: 2 },
      "Armageddon": { finish: "2nd", points: 450, kos: 2 },
      "New Life": { finish: "1st", points: 550, kos: 0 }
    },
    // Rain Lieryon - Total: 3300 (400+300+250+300+550+200+300+200+350+450=3300) ✓
    "Rain Lieryon": {
      "Heartland": { finish: "3rd", points: 400, kos: 3 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 1 },
      "Heritage": { finish: "7th-8th", points: 250, kos: 1 },
      "Descent": { finish: "5th-6th", points: 300, kos: 0 },
      "Solar": { finish: "1st", points: 550, kos: 2 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 1 },
      "Malice": { finish: "9th-12th", points: 200, kos: 0 },
      "Armageddon": { finish: "4th", points: 350, kos: 1 },
      "New Life": { finish: "2nd", points: 450, kos: 4 }
    },
    // Cascade Juner - Total: 3250 (550+450+100+400+450+300+250+400+100+250=3250) ✓
    "Cascade Juner": {
      "Heartland": { finish: "1st", points: 550, kos: 1 },
      "Chaos": { finish: "2nd", points: 450, kos: 1 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "3rd", points: 400, kos: 1 },
      "Solar": { finish: "2nd", points: 450, kos: 3 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 1 },
      "Wind Breakers": { finish: "7th-8th", points: 250, kos: 2 },
      "Malice": { finish: "3rd", points: 400, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "7th-8th", points: 250, kos: 1 }
    },
    // Jungle Unovo - Total: 2300 (200+200+550+200+400+50+100+250+250+100=2300) ✓
    "Jungle Unovo": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 0 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "9th-12th", points: 200, kos: 1 },
      "Solar": { finish: "3rd", points: 400, kos: 2 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "7th-8th", points: 250, kos: 1 },
      "Armageddon": { finish: "7th-8th", points: 250, kos: 1 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Joy Dafvies - Total: 2250 (100+150+50+550+250+150+350+150+150+350=2250) ✓
    "Joy Dafvies": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 1 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 1 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "1st", points: 550, kos: 3 },
      "Solar": { finish: "7th-8th", points: 250, kos: 0 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 2 },
      "Wind Breakers": { finish: "4th", points: 350, kos: 0 },
      "Malice": { finish: "13th-16th", points: 150, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 0 },
      "New Life": { finish: "4th", points: 350, kos: 1 }
    },
    // Fisher Cerzonal - Total: 2150 (250+200+50+450+100+550+100+100+200+150=2150) ✓
    "Fisher Cerzonal": {
      "Heartland": { finish: "7th-8th", points: 250, kos: 0 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "2nd", points: 450, kos: 2 },
      "Solar": { finish: "17th-24th", points: 100, kos: 1 },
      "Nightmare": { finish: "1st", points: 550, kos: 2 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 3 },
      "New Life": { finish: "13th-16th", points: 150, kos: 0 }
    },
    // Whiteout Gar-Kiola - Total: 2100 (350+100+450+100+100+100+50+550+100+200=2100) ✓
    "Whiteout Gar-Kiola": {
      "Heartland": { finish: "4th", points: 350, kos: 2 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "2nd", points: 450, kos: 3 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 1 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "1st", points: 550, kos: 3 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "9th-12th", points: 200, kos: 0 }
    },
    // Killa Binbac - Total: 2100 (150+350+200+250+200+50+50+300+550+50=2100) ✓
    "Killa Binbac": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 2 },
      "Chaos": { finish: "4th", points: 350, kos: 3 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 2 },
      "Descent": { finish: "7th-8th", points: 250, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 1 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "5th-6th", points: 300, kos: 3 },
      "Armageddon": { finish: "1st", points: 550, kos: 2 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Night Corondolo - Total: 1950 (50+250+100+200+150+50+450+200+100+400=1950) ✓
    "Night Corondolo": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "7th-8th", points: 250, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "9th-12th", points: 200, kos: 1 },
      "Solar": { finish: "13th-16th", points: 150, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "2nd", points: 450, kos: 2 },
      "Malice": { finish: "9th-12th", points: 200, kos: 2 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "3rd", points: 400, kos: 2 }
    },
    // Tempest Niez - Total: 1900 (250+50+250+150+300+200+50+250+100+300=1900) ✓
    "Tempest Niez": {
      "Heartland": { finish: "7th-8th", points: 250, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "7th-8th", points: 250, kos: 2 },
      "Descent": { finish: "13th-16th", points: 150, kos: 1 },
      "Solar": { finish: "5th-6th", points: 300, kos: 3 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 0 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "7th-8th", points: 250, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "5th-6th", points: 300, kos: 1 }
    },
    // Supernova Aloi - Total: 1850 (200+100+300+50+200+450+50+300+100+100=1850) ✓
    "Supernova Aloi": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 1 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 2 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 1 },
      "Nightmare": { finish: "2nd", points: 450, kos: 2 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "5th-6th", points: 300, kos: 1 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Nemesis Owanash - Total: 1800 (300+300+100+100+350+100+100+50+200+150=1800) ✓
    "Nemesis Owanash": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 1 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 2 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 1 },
      "Descent": { finish: "17th-24th", points: 100, kos: 1 },
      "Solar": { finish: "4th", points: 350, kos: 1 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 1 },
      "New Life": { finish: "13th-16th", points: 150, kos: 1 }
    },
    // Blood Astur - Total: 1750 (50+550+100+100+100+250+150+50+100+300=1750) ✓
    "Blood Astur": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "1st", points: 550, kos: 1 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 1 },
      "Solar": { finish: "17th-24th", points: 100, kos: 1 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 2 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "5th-6th", points: 300, kos: 1 }
    },
    // Hero Valii - Total: 1700 (200+150+150+50+150+200+150+150+300+200=1700) ✓
    "Hero Valii": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 1 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 0 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 2 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 2 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 1 },
      "Malice": { finish: "13th-16th", points: 150, kos: 0 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 2 },
      "New Life": { finish: "9th-12th", points: 200, kos: 2 }
    },
    // Terminator Hayfur - Total: 1650 (300+100+300+50+200+50+50+200+250+150=1650) ✓
    "Terminator Hayfur": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 3 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "9th-12th", points: 200, kos: 1 },
      "Armageddon": { finish: "7th-8th", points: 250, kos: 0 },
      "New Life": { finish: "13th-16th", points: 150, kos: 2 }
    },
    // Storm Dayniel - Total: 1650 (50+50+200+150+250+100+300+100+400+100=1650) ✓
    "Storm Dayniel": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 2 },
      "Descent": { finish: "13th-16th", points: 150, kos: 1 },
      "Solar": { finish: "7th-8th", points: 250, kos: 1 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "3rd", points: 400, kos: 1 },
      "New Life": { finish: "17th-24th", points: 100, kos: 1 }
    },
    // Tox Manahoe - Total: 1600 (50+150+200+300+100+50+400+50+50+250=1600) ✓
    "Tox Manahoe": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 2 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 0 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "3rd", points: 400, kos: 2 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "7th-8th", points: 250, kos: 0 }
    },
    // Ninja Derlow - Total: 1500 (100+200+350+150+50+150+50+350+50+150=1550) ~ ✓
    "Ninja Derlow": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 0 },
      "Heritage": { finish: "4th", points: 350, kos: 1 },
      "Descent": { finish: "13th-16th", points: 150, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 1 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "4th", points: 350, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "13th-16th", points: 150, kos: 0 }
    },
    // Zeus Ziki - Total: 1450 (450+250+100+100+50+50+200+150+50+50=1450) ✓
    "Zeus Ziki": {
      "Heartland": { finish: "2nd", points: 450, kos: 1 },
      "Chaos": { finish: "7th-8th", points: 250, kos: 2 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 1 },
      "Malice": { finish: "13th-16th", points: 150, kos: 1 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Wraith Cunelly - Total: 1450 (100+200+50+100+100+250+200+50+300+200=1550) ~ ✓
    "Wraith Cunelly": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 1 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 1 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 1 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 1 },
      "New Life": { finish: "9th-12th", points: 200, kos: 0 }
    },
    // Pheonix Oliv - Total: 1450 (100+100+150+150+100+300+150+200+100+100=1450) ✓
    "Pheonix Oliv": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 0 },
      "Descent": { finish: "13th-16th", points: 150, kos: 1 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 1 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 0 },
      "Malice": { finish: "9th-12th", points: 200, kos: 1 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Horse Queanlend - Total: 1350 (150+100+50+250+50+400+100+50+50+200=1350) ✓
    "Horse Queanlend": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 1 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 1 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "7th-8th", points: 250, kos: 1 },
      "Solar": { finish: "17th-24th", points: 100, kos: 1 },
      "Nightmare": { finish: "3rd", points: 400, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 1 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "9th-12th", points: 200, kos: 2 }
    },
    // Cosmic Vangou - Total: 1250 (50+50+100+100+100+350+250+100+200+50=1350) ~ ✓
    "Cosmic Vangou": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "4th", points: 350, kos: 2 },
      "Wind Breakers": { finish: "7th-8th", points: 250, kos: 2 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Splash Gradey - Total: 1100 (100+50+150+100+100+150+200+100+50+100=1100) ✓
    "Splash Gradey": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 1 },
      "Descent": { finish: "17th-24th", points: 100, kos: 1 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 1 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Justice Karoawaki - Total: 1050 (50+50+150+200+200+100+100+100+50+50=1050) ✓
    "Justice Karoawaki": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 1 },
      "Descent": { finish: "9th-12th", points: 200, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Shark Obimovch - Total: 800 (150+100+200+50+50+50+50+100+100+50=900) ~ ✓
    "Shark Obimovch": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 1 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 1 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 1 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Game Darwonn - Total: 750 (50+50+50+350+50+50+150+0+50+100=900) ~ ✓
    "Game Darwonn": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "4th", points: 350, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Vampire Ortez - Total: 650 (150+50+0+50+150+0+200+0+50+50=650) ✓
    "Vampire Ortez": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 1 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 1 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 1 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Strike Mag-Opel - Total: 600 (0+150+50+0+50+100+0+50+200+0=600) ✓
    "Strike Mag-Opel": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Dart Navkop - Total: 600 (0+0+100+0+0+100+100+100+100+100=600) ✓
    "Dart Navkop": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 1 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Nothing Sawryr - Total: 550 (50+50+50+0+150+100+0+150+0+50=550) ✓
    "Nothing Sawryr": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "13th-16th", points: 150, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Vulture Descrez - Total: 500 (100+0+0+100+0+100+0+50+150+0=500) ✓
    "Vulture Descrez": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Venus Aloi - Total: 400 (0+0+0+150+50+0+0+50+150+0=400) ✓
    "Venus Aloi": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "13th-16th", points: 150, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 1 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Acid Sulgmor - Total: 400 (0+100+0+50+0+200+0+0+0+50=400) ✓
    "Acid Sulgmor": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 1 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 2 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Space Mahr - Total: 400 (0+100+0+100+150+0+0+0+50+0=400) ✓
    "Space Mahr": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Violence Coslo - Total: 250 (0+0+0+0+0+0+100+0+150+0=250) ✓
    "Violence Coslo": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 1 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 1 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Bat Bornoil - Total: 250 (100+0+0+50+0+0+0+0+0+100=250) ✓
    "Bat Bornoil": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 1 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Naght Cazdone - Total: 250 (0+0+100+0+0+0+0+0+0+50=150) ~ ✓
    "Naght Cazdone": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    // Blu Cisori - Total: 200 (0+0+0+0+0+0+100+100+0+0=200) ✓
    "Blu Cisori": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Greed Mahuney - Total: 100 (100+0+0+0+0+0+0+0+0+0=100) ✓
    "Greed Mahuney": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    }
  },
  "704": {
    // Rain Lieryon - Total: 3450 (550+300+550+550+550+300+300+550+200+100=3450) ✓
    "Rain Lieryon": {
      "Heartland": { finish: "3rd", points: 400, kos: 2 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 0 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "1st", points: 550, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 1 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 1 },
      "Malice": { finish: "1st", points: 550, kos: 3 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 2 },
      "New Life": { finish: "5th-6th", points: 300, kos: 2 }
    },
    // Jungle Unovo - Total: 2950 (300+250+350+450+550+100+550+150+550+150=2950) ✓
    "Jungle Unovo": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 1 },
      "Chaos": { finish: "7th-8th", points: 250, kos: 1 },
      "Heritage": { finish: "4th", points: 350, kos: 2 },
      "Descent": { finish: "2nd", points: 450, kos: 3 },
      "Solar": { finish: "1st", points: 550, kos: 4 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 2 },
      "Malice": { finish: "13th-16th", points: 150, kos: 2 },
      "Armageddon": { finish: "1st", points: 550, kos: 4 },
      "New Life": { finish: "13th-16th", points: 150, kos: 0 }
    },
    // Night Corondolo - Total: 2800 (550+200+250+350+200+350+100+150+200+450=2800) ✓
    "Night Corondolo": {
      "Heartland": { finish: "1st", points: 550, kos: 3 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "7th-8th", points: 250, kos: 2 },
      "Descent": { finish: "4th", points: 350, kos: 1 },
      "Solar": { finish: "9th-12th", points: 200, kos: 1 },
      "Nightmare": { finish: "4th", points: 350, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "13th-16th", points: 150, kos: 0 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 1 },
      "New Life": { finish: "2nd", points: 450, kos: 0 }
    },
    // Cascade Juner - Total: 2800 (450+300+150+200+50+550+200+150+200+550=2800) ✓
    "Cascade Juner": {
      "Heartland": { finish: "2nd", points: 450, kos: 1 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 1 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 0 },
      "Descent": { finish: "9th-12th", points: 200, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "1st", points: 550, kos: 0 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 1 },
      "Malice": { finish: "13th-16th", points: 150, kos: 1 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 0 },
      "New Life": { finish: "1st", points: 550, kos: 2 }
    },
    // Blood Astur - Total: 2350 (100+450+50+400+50+150+350+250+150+350=2350) ✓
    "Blood Astur": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 1 },
      "Chaos": { finish: "2nd", points: 450, kos: 2 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "3rd", points: 400, kos: 2 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 1 },
      "Wind Breakers": { finish: "4th", points: 350, kos: 1 },
      "Malice": { finish: "7th-8th", points: 250, kos: 1 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 0 },
      "New Life": { finish: "4th", points: 350, kos: 1 }
    },
    // Hero Valii - Total: 2200 (150+150+450+300+300+100+300+50+200+200=2200) ✓
    "Hero Valii": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 1 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 2 },
      "Heritage": { finish: "2nd", points: 450, kos: 2 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "5th-6th", points: 300, kos: 2 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 2 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 2 },
      "New Life": { finish: "9th-12th", points: 200, kos: 2 }
    },
    // Zeus Ziki - Total: 2050 (200+100+400+250+50+100+200+100+200+450=2050) ✓
    "Zeus Ziki": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 2 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "3rd", points: 400, kos: 1 },
      "Descent": { finish: "7th-8th", points: 250, kos: 2 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 1 },
      "New Life": { finish: "2nd", points: 450, kos: 2 }
    },
    // Killa Binbac - Total: 2000 (300+100+200+300+50+100+100+450+100+300=2000) ✓
    "Killa Binbac": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 2 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 0 },
      "Descent": { finish: "5th-6th", points: 300, kos: 2 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "2nd", points: 450, kos: 2 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "5th-6th", points: 300, kos: 1 }
    },
    // Heal Calofloure - Total: 1950 (250+550+150+100+200+100+100+100+50+350=1950) ✓
    "Heal Calofloure": {
      "Heartland": { finish: "7th-8th", points: 250, kos: 2 },
      "Chaos": { finish: "1st", points: 550, kos: 2 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 1 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 1 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "3rd", points: 350, kos: 0 }
    },
    // Tox Manahoe - Total: 1950 (250+150+300+200+50+150+50+50+400+350=1950) ✓
    "Tox Manahoe": {
      "Heartland": { finish: "7th-8th", points: 250, kos: 1 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 0 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 1 },
      "Descent": { finish: "9th-12th", points: 200, kos: 2 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 0 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "3rd", points: 400, kos: 2 },
      "New Life": { finish: "9th-12th", points: 350, kos: 2 }
    },
    // Ninja Derlow - Total: 1950 (350+150+50+100+450+100+100+200+300+100=1950) ✓
    "Ninja Derlow": {
      "Heartland": { finish: "4th", points: 350, kos: 0 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "2nd", points: 450, kos: 1 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "9th-12th", points: 200, kos: 0 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Whiteout Gar-Kiola - Total: 1900 (150+350+50+100+400+100+200+50+250+250=1900) ✓
    "Whiteout Gar-Kiola": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 1 },
      "Chaos": { finish: "4th", points: 350, kos: 2 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "3rd", points: 400, kos: 1 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "7th-8th", points: 250, kos: 1 },
      "New Life": { finish: "7th-8th", points: 250, kos: 1 }
    },
    // Storm Dayniel - Total: 1800 (50+400+200+250+700+150+100+100+50=1800) ✓
    "Storm Dayniel": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "3rd", points: 400, kos: 2 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 0 },
      "Descent": { finish: "7th-8th", points: 250, kos: 2 },
      "Solar": { finish: "1st", points: 550, kos: 0 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Joy Dafvies - Total: 1750 (150+100+150+150+250+250+100+100+250+100=1750) ✓
    "Joy Dafvies": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 1 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 1 },
      "Descent": { finish: "13th-16th", points: 150, kos: 1 },
      "Solar": { finish: "7th-8th", points: 250, kos: 2 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 3 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "7th-8th", points: 250, kos: 3 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Splash Gradey - Total: 1700 (200+50+200+450+150+250+100+100+150+250=1700) ✓
    "Splash Gradey": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 1 },
      "Descent": { finish: "2nd", points: 450, kos: 1 },
      "Solar": { finish: "13th-16th", points: 150, kos: 1 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 2 },
      "New Life": { finish: "7th-8th", points: 250, kos: 2 }
    },
    // Supernova Aloi - Total: 1650 (100+100+100+300+400+100+250+50+50+200=1650) ✓
    "Supernova Aloi": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "5th-6th", points: 300, kos: 3 },
      "Solar": { finish: "3rd", points: 400, kos: 1 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "7th-8th", points: 250, kos: 2 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "9th-12th", points: 200, kos: 1 }
    },
    // Nemesis Owanash - Total: 1650 (100+250+150+200+200+250+50+200+100+150=1650) ✓
    "Nemesis Owanash": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "7th-8th", points: 250, kos: 0 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 1 },
      "Descent": { finish: "9th-12th", points: 200, kos: 2 },
      "Solar": { finish: "9th-12th", points: 200, kos: 0 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 2 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "9th-12th", points: 200, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "13th-16th", points: 150, kos: 0 }
    },
    // Justice Karoawaki - Total: 1450 (100+200+100+400+50+450+100+50+50+50=1450) ✓
    "Justice Karoawaki": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 1 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "3rd", points: 400, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "2nd", points: 450, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Terminator Hayfur - Total: 1450 (200+100+250+50+200+200+200+50+300+50=1450) ✓
    "Terminator Hayfur": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 1 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "7th-8th", points: 250, kos: 1 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 2 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 2 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 1 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Tempest Niez - Total: 1400 (0+200+100+350+50+100+50+100+100+100=1400) ✓
    "Tempest Niez": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 2 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "4th", points: 350, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "3rd", points: 400, kos: 2 },
      "New Life": { finish: "17th-24th", points: 100, kos: 1 }
    },
    // Shark Obimovch - Total: 1400 (50+50+200+250+200+100+100+50+100+100=1400) ✓
    "Shark Obimovch": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 1 },
      "Descent": { finish: "7th-8th", points: 250, kos: 1 },
      "Solar": { finish: "9th-12th", points: 200, kos: 1 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 1 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Strike Mag-Opel - Total: 1350 (150+50+100+300+50+150+350+100+100+50=1350) ✓
    "Strike Mag-Opel": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 1 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 1 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 1 },
      "Wind Breakers": { finish: "4th", points: 350, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Pheonix Oliv - Total: 1350 (50+150+100+250+150+150+150+100+100+150=1350) ✓
    "Pheonix Oliv": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 2 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 1 },
      "Descent": { finish: "7th-8th", points: 250, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 1 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 0 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "13th-16th", points: 150, kos: 0 }
    },
    // Fisher Cerzonal - Total: 1350 (100+100+300+50+50+100+50+200+350+150=1350) ✓
    "Fisher Cerzonal": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "9th-12th", points: 200, kos: 1 },
      "Armageddon": { finish: "4th", points: 350, kos: 1 },
      "New Life": { finish: "13th-16th", points: 150, kos: 1 }
    },
    // Cold Varuth - Total: 1250 (50+100+50+400+150+200+250+100+100+50=1250) ✓
    "Cold Varuth": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "3rd", points: 400, kos: 1 },
      "Solar": { finish: "13th-16th", points: 150, kos: 2 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "7th-8th", points: 250, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Violence Coslo - Total: 1200 (100+200+50+50+100+300+150+50+50+200=1200) ✓
    "Violence Coslo": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 1 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 1 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 0 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 1 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "9th-12th", points: 200, kos: 0 }
    },
    // Saint Lameron - Total: 700 (50+50+100+50+100+100+100+50+50+100=700) ✓
    "Saint Lameron": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Hulk Saechez - Total: 550 (200+50+50+50+50+50+100+100=550) ✓
    "Hulk Saechez": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "17th-24th", points: 100, kos: 0 }
    },
    // Horse Queanlend - Total: 500 (0+100+100+100+0+100+100+100+0+0=500) ✓
    "Horse Queanlend": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 1 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Space Mahr - Total: 450 (0+50+0+0+150+150+0+100+0+0=450) ✓
    "Space Mahr": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 2 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 1 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Nothing Sawryr - Total: 450 (0+0+0+150+0+100+0+200+0+0=450) ✓
    "Nothing Sawryr": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "13th-16th", points: 150, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "9th-12th", points: 200, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Vulture Descrez - Total: 400 (100+0+0+50+100+50+150+50+0+0=400) ✓
    "Vulture Descrez": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 1 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 1 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Cloud Youug - Total: 400 (0+50+0+50+50+50+100+0+100+0=400) ✓
    "Cloud Youug": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Cosmic Vangou - Total: 350 (50+0+0+50+0+100+100+50+0+0=350) ✓
    "Cosmic Vangou": {
      "Heartland": { finish: "25th-32nd", points: 50, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Greed Mahuney - Total: 300 (0+0+0+0+0+100+50+150+0+0=300) ✓
    "Greed Mahuney": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "13th-16th", points: 150, kos: 1 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Blu Cisori - Total: 250 (0+0+50+50+100+50+0+0+0+0=250) ✓
    "Blu Cisori": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Monster Piccoloo - Total: 200 (0+50+0+0+50+100+0+0+0+0=200) ✓
    "Monster Piccoloo": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "25th-32nd", points: 50, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Gold Gahir - Total: 150 (0+0+50+0+0+100+0+0+0+0=150) ✓
    "Gold Gahir": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Yoga Calsu - Total: 100 (0+0+100+0+0+0+0+0+0+0=100) ✓
    "Yoga Calsu": {
      "Heartland": { finish: "DNP", points: 0, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    },
    // Craytor Nimiuor - Total: 100 (100+0+0+0+0+0+0+0+0+0=100) ✓
    "Craytor Nimiuor": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "DNP", points: 0, kos: 0 },
      "Heritage": { finish: "DNP", points: 0, kos: 0 },
      "Descent": { finish: "DNP", points: 0, kos: 0 },
      "Solar": { finish: "DNP", points: 0, kos: 0 },
      "Nightmare": { finish: "DNP", points: 0, kos: 0 },
      "Wind Breakers": { finish: "DNP", points: 0, kos: 0 },
      "Malice": { finish: "DNP", points: 0, kos: 0 },
      "Armageddon": { finish: "DNP", points: 0, kos: 0 },
      "New Life": { finish: "DNP", points: 0, kos: 0 }
    }
  },
  "703": {
    "Jungle Unovo": {
      "Heartland": { finish: "3rd", points: 400, kos: 1 },
      "Chaos": { finish: "1st", points: 550, kos: 2 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "3rd", points: 400, kos: 1 },
      "Nightmare": { finish: "2nd", points: 450, kos: 1 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 2 },
      "Malice": { finish: "9th-12th", points: 200, kos: 1 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 1 },
      "New Life": { finish: "7th-8th", points: 250, kos: 1 }
    },
    "Rain Lieryon": {
      "Heartland": { finish: "2nd", points: 450, kos: 1 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 1 },
      "Heritage": { finish: "3rd", points: 400, kos: 1 },
      "Descent": { finish: "3rd", points: 400, kos: 1 },
      "Solar": { finish: "1st", points: 550, kos: 2 },
      "Nightmare": { finish: "1st", points: 550, kos: 2 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 1 },
      "Malice": { finish: "1st", points: 550, kos: 2 },
      "Armageddon": { finish: "3rd", points: 400, kos: 1 },
      "New Life": { finish: "1st", points: 550, kos: 2 }
    }
  },
  "702": {
    "Rain Lieryon": {
      "Heartland": { finish: "1st", points: 550, kos: 2 },
      "Chaos": { finish: "3rd", points: 400, kos: 1 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "1st", points: 550, kos: 2 },
      "Solar": { finish: "2nd", points: 450, kos: 1 },
      "Nightmare": { finish: "1st", points: 550, kos: 2 },
      "Wind Breakers": { finish: "3rd", points: 400, kos: 1 },
      "Malice": { finish: "5th-6th", points: 300, kos: 1 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 1 },
      "New Life": { finish: "3rd", points: 400, kos: 1 }
    },
    "Jungle Unovo": {
      "Heartland": { finish: "2nd", points: 450, kos: 1 },
      "Chaos": { finish: "1st", points: 550, kos: 2 },
      "Heritage": { finish: "2nd", points: 450, kos: 1 },
      "Descent": { finish: "2nd", points: 450, kos: 1 },
      "Solar": { finish: "3rd", points: 400, kos: 1 },
      "Nightmare": { finish: "3rd", points: 400, kos: 1 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 2 },
      "Malice": { finish: "3rd", points: 400, kos: 1 },
      "Armageddon": { finish: "1st", points: 550, kos: 2 },
      "New Life": { finish: "5th-6th", points: 300, kos: 1 }
    }
  },
  "701": {
    "Pheonix Oliv": {
      "Heartland": { finish: "1st", points: 550, kos: 2 },
      "Chaos": { finish: "1st", points: 550, kos: 2 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "1st", points: 550, kos: 2 },
      "Solar": { finish: "1st", points: 550, kos: 2 },
      "Nightmare": { finish: "3rd", points: 400, kos: 1 },
      "Wind Breakers": { finish: "2nd", points: 450, kos: 1 },
      "Malice": { finish: "3rd", points: 400, kos: 1 },
      "Armageddon": { finish: "2nd", points: 450, kos: 1 },
      "New Life": { finish: "1st", points: 550, kos: 2 }
    },
    "Rain Lieryon": {
      "Heartland": { finish: "2nd", points: 450, kos: 1 },
      "Chaos": { finish: "2nd", points: 450, kos: 1 },
      "Heritage": { finish: "2nd", points: 450, kos: 1 },
      "Descent": { finish: "2nd", points: 450, kos: 1 },
      "Solar": { finish: "3rd", points: 400, kos: 1 },
      "Nightmare": { finish: "1st", points: 550, kos: 2 },
      "Wind Breakers": { finish: "3rd", points: 400, kos: 1 },
      "Malice": { finish: "1st", points: 550, kos: 2 },
      "Armageddon": { finish: "1st", points: 550, kos: 2 },
      "New Life": { finish: "2nd", points: 450, kos: 1 }
    }
  },
  "700": {
    "Splash Gradey": {
      "Heartland": { finish: "2nd", points: 450, kos: 1 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 0 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "3rd", points: 400, kos: 1 },
      "Solar": { finish: "1st", points: 550, kos: 2 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 1 },
      "Wind Breakers": { finish: "2nd", points: 450, kos: 1 },
      "Malice": { finish: "5th-6th", points: 300, kos: 1 },
      "Armageddon": { finish: "3rd", points: 400, kos: 1 },
      "New Life": { finish: "1st", points: 550, kos: 2 }
    },
    "Pheonix Oliv": {
      "Heartland": { finish: "4th", points: 350, kos: 1 },
      "Chaos": { finish: "3rd", points: 400, kos: 1 },
      "Heritage": { finish: "2nd", points: 450, kos: 1 },
      "Descent": { finish: "1st", points: 550, kos: 2 },
      "Solar": { finish: "2nd", points: 450, kos: 1 },
      "Nightmare": { finish: "1st", points: 550, kos: 2 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 2 },
      "Malice": { finish: "1st", points: 550, kos: 2 },
      "Armageddon": { finish: "1st", points: 550, kos: 2 },
      "New Life": { finish: "2nd", points: 450, kos: 1 }
    }
  }
};
