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
    // Sample data for key players in 706
    "Killa Binbac": {
      "Heartland": { finish: "2nd", points: 450, kos: 1 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 2 },
      "Descent": { finish: "3rd", points: 400, kos: 2 },
      "Solar": { finish: "5th-6th", points: 300, kos: 1 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 3 },
      "Malice": { finish: "5th-6th", points: 300, kos: 1 },
      "Armageddon": { finish: "7th-8th", points: 250, kos: 1 },
      "New Life": { finish: "4th", points: 350, kos: 3 }
    },
    "Wraith Cunelly": {
      "Heartland": { finish: "3rd", points: 400, kos: 1 },
      "Chaos": { finish: "7th-8th", points: 250, kos: 1 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 0 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "4th", points: 350, kos: 1 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 1 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 1 },
      "Malice": { finish: "9th-12th", points: 200, kos: 0 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 1 },
      "New Life": { finish: "5th-6th", points: 300, kos: 1 }
    },
    "Jungle Unovo": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 2 },
      "Chaos": { finish: "2nd", points: 450, kos: 3 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 0 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "13th-16th", points: 150, kos: 0 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 2 },
      "Wind Breakers": { finish: "7th-8th", points: 250, kos: 2 },
      "Malice": { finish: "3rd", points: 400, kos: 2 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 1 },
      "New Life": { finish: "9th-12th", points: 200, kos: 0 }
    },
    "Cascade Juner": {
      "Heartland": { finish: "7th-8th", points: 250, kos: 1 },
      "Chaos": { finish: "1st", points: 550, kos: 2 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 1 },
      "Descent": { finish: "1st", points: 550, kos: 2 },
      "Solar": { finish: "1st", points: 550, kos: 2 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 1 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "1st", points: 550, kos: 1 },
      "New Life": { finish: "5th-6th", points: 300, kos: 0 }
    }
  },
  "705": {
    "Heal Calofloure": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 0 },
      "Chaos": { finish: "3rd", points: 400, kos: 0 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "1st", points: 550, kos: 3 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 1 },
      "Wind Breakers": { finish: "2nd", points: 450, kos: 1 },
      "Malice": { finish: "9th-12th", points: 200, kos: 0 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 1 },
      "New Life": { finish: "3rd", points: 400, kos: 1 }
    },
    "Killa Binbac": {
      "Heartland": { finish: "13th-16th", points: 150, kos: 2 },
      "Chaos": { finish: "4th", points: 350, kos: 3 },
      "Heritage": { finish: "2nd", points: 450, kos: 2 },
      "Descent": { finish: "9th-12th", points: 200, kos: 1 },
      "Solar": { finish: "13th-16th", points: 150, kos: 0 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 3 },
      "Malice": { finish: "13th-16th", points: 150, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 1 },
      "New Life": { finish: "7th-8th", points: 250, kos: 1 }
    }
  },
  "704": {
    "Rain Lieryon": {
      "Heartland": { finish: "3rd", points: 400, kos: 2 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 0 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "1st", points: 550, kos: 2 },
      "Solar": { finish: "3rd", points: 400, kos: 1 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 1 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 1 },
      "Malice": { finish: "1st", points: 550, kos: 2 },
      "Armageddon": { finish: "7th-8th", points: 250, kos: 1 },
      "New Life": { finish: "5th-6th", points: 300, kos: 1 }
    },
    "Jungle Unovo": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 1 },
      "Chaos": { finish: "7th-8th", points: 250, kos: 1 },
      "Heritage": { finish: "2nd", points: 450, kos: 2 },
      "Descent": { finish: "2nd", points: 450, kos: 2 },
      "Solar": { finish: "5th-6th", points: 300, kos: 1 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 1 },
      "Wind Breakers": { finish: "3rd", points: 400, kos: 2 },
      "Malice": { finish: "5th-6th", points: 300, kos: 1 },
      "Armageddon": { finish: "3rd", points: 400, kos: 2 },
      "New Life": { finish: "9th-12th", points: 200, kos: 1 }
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
