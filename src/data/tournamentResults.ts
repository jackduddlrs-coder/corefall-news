// Tournament names by season
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

// Tournament results: season -> player -> tournament -> { finish, points, kos }
export interface TournamentResult {
  finish: string;
  points: number;
  kos: number;
}

export const playerTournamentResults: Record<string, Record<string, Record<string, TournamentResult>>> = {
  "707": {
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
      "New Life": { finish: "2nd", points: 450, kos: 5 }
    },
    "Zeus Ziki": {
      "Heartland": { finish: "4th", points: 350, kos: 2 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 1 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 1 },
      "Descent": { finish: "2nd", points: 450, kos: 1 },
      "Solar": { finish: "2nd", points: 450, kos: 0 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 0 },
      "Malice": { finish: "17th-24th", points: 100, kos: 0 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "1st", points: 550, kos: 4 }
    },
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
    "Rain Lieryon": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 1 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 0 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 0 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 2 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 0 },
      "Malice": { finish: "9th-12th", points: 200, kos: 0 },
      "Armageddon": { finish: "2nd", points: 450, kos: 2 },
      "New Life": { finish: "7th-8th", points: 250, kos: 1 }
    },
    "Horse Queanlend": {
      "Heartland": { finish: "17th-24th", points: 100, kos: 0 },
      "Chaos": { finish: "4th", points: 350, kos: 1 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 1 },
      "Descent": { finish: "9th-12th", points: 200, kos: 1 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "1st", points: 550, kos: 1 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "4th", points: 350, kos: 1 },
      "Armageddon": { finish: "25th-32nd", points: 50, kos: 0 },
      "New Life": { finish: "3rd", points: 400, kos: 2 }
    },
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
    "Fisher Cerzonal": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 2 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 2 },
      "Heritage": { finish: "7th-8th", points: 250, kos: 1 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "9th-12th", points: 200, kos: 0 },
      "Nightmare": { finish: "2nd", points: 450, kos: 3 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 1 },
      "Malice": { finish: "9th-12th", points: 200, kos: 1 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 1 },
      "New Life": { finish: "17th-24th", points: 100, kos: 1 }
    },
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
    }
  },
  "706": {
    "Killa Binbac": {
      "Heartland": { finish: "2nd", points: 450, kos: 1 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 2 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 1 },
      "Descent": { finish: "5th-6th", points: 300, kos: 2 },
      "Solar": { finish: "9th-12th", points: 200, kos: 2 },
      "Nightmare": { finish: "25th-32nd", points: 50, kos: 0 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 3 },
      "Malice": { finish: "13th-16th", points: 150, kos: 1 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 2 },
      "New Life": { finish: "4th", points: 350, kos: 2 }
    },
    "Wraith Cunelly": {
      "Heartland": { finish: "3rd", points: 400, kos: 1 },
      "Chaos": { finish: "7th-8th", points: 250, kos: 1 },
      "Heritage": { finish: "25th-32nd", points: 50, kos: 0 },
      "Descent": { finish: "3rd", points: 400, kos: 1 },
      "Solar": { finish: "4th", points: 350, kos: 1 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 1 },
      "Malice": { finish: "9th-12th", points: 200, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 1 },
      "New Life": { finish: "5th-6th", points: 300, kos: 1 }
    },
    "Heal Calofloure": {
      "Heartland": { finish: "4th", points: 350, kos: 1 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 2 },
      "Heritage": { finish: "13th-16th", points: 150, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "17th-24th", points: 100, kos: 1 },
      "Nightmare": { finish: "4th", points: 350, kos: 1 },
      "Wind Breakers": { finish: "3rd", points: 400, kos: 1 },
      "Malice": { finish: "9th-12th", points: 200, kos: 1 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 0 },
      "New Life": { finish: "2nd", points: 450, kos: 0 }
    },
    "Nothing Sawryr": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 0 },
      "Chaos": { finish: "3rd", points: 400, kos: 0 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "25th-32nd", points: 50, kos: 0 },
      "Solar": { finish: "7th-8th", points: 250, kos: 1 },
      "Nightmare": { finish: "3rd", points: 400, kos: 2 },
      "Wind Breakers": { finish: "25th-32nd", points: 50, kos: 0 },
      "Malice": { finish: "1st", points: 550, kos: 2 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 2 },
      "New Life": { finish: "17th-24th", points: 100, kos: 1 }
    },
    "Jungle Unovo": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 2 },
      "Chaos": { finish: "2nd", points: 450, kos: 3 },
      "Heritage": { finish: "17th-24th", points: 100, kos: 0 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "25th-32nd", points: 50, kos: 0 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 2 },
      "Wind Breakers": { finish: "7th-8th", points: 250, kos: 2 },
      "Malice": { finish: "3rd", points: 400, kos: 2 },
      "Armageddon": { finish: "7th-8th", points: 250, kos: 1 },
      "New Life": { finish: "25th-32nd", points: 50, kos: 0 }
    },
    "Cascade Juner": {
      "Heartland": { finish: "7th-8th", points: 250, kos: 1 },
      "Chaos": { finish: "1st", points: 550, kos: 2 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 1 },
      "Descent": { finish: "1st", points: 550, kos: 2 },
      "Solar": { finish: "1st", points: 550, kos: 2 },
      "Nightmare": { finish: "7th-8th", points: 250, kos: 1 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 1 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "1st", points: 550, kos: 1 },
      "New Life": { finish: "9th-12th", points: 200, kos: 0 }
    },
    "Zeus Ziki": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 2 },
      "Chaos": { finish: "17th-24th", points: 100, kos: 1 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 2 },
      "Descent": { finish: "2nd", points: 450, kos: 3 },
      "Solar": { finish: "2nd", points: 450, kos: 3 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 1 },
      "Wind Breakers": { finish: "17th-24th", points: 100, kos: 1 },
      "Malice": { finish: "17th-24th", points: 100, kos: 1 },
      "Armageddon": { finish: "17th-24th", points: 100, kos: 1 },
      "New Life": { finish: "1st", points: 550, kos: 3 }
    },
    "Rain Lieryon": {
      "Heartland": { finish: "1st", points: 550, kos: 2 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "17th-24th", points: 100, kos: 0 },
      "Solar": { finish: "13th-16th", points: 150, kos: 1 },
      "Nightmare": { finish: "13th-16th", points: 150, kos: 1 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 0 },
      "Malice": { finish: "9th-12th", points: 200, kos: 1 },
      "Armageddon": { finish: "2nd", points: 450, kos: 0 },
      "New Life": { finish: "7th-8th", points: 250, kos: 1 }
    }
  },
  "705": {
    "Heal Calofloure": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 1 },
      "Chaos": { finish: "3rd", points: 400, kos: 2 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "9th-12th", points: 200, kos: 1 },
      "Solar": { finish: "1st", points: 550, kos: 3 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 1 },
      "Wind Breakers": { finish: "2nd", points: 450, kos: 1 },
      "Malice": { finish: "13th-16th", points: 150, kos: 0 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 1 },
      "New Life": { finish: "3rd", points: 400, kos: 1 }
    },
    "Killa Binbac": {
      "Heartland": { finish: "2nd", points: 450, kos: 2 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 1 },
      "Heritage": { finish: "2nd", points: 450, kos: 2 },
      "Descent": { finish: "13th-16th", points: 150, kos: 1 },
      "Solar": { finish: "17th-24th", points: 100, kos: 0 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 3 },
      "Malice": { finish: "25th-32nd", points: 50, kos: 0 },
      "Armageddon": { finish: "13th-16th", points: 150, kos: 1 },
      "New Life": { finish: "7th-8th", points: 250, kos: 1 }
    },
    "Rain Lieryon": {
      "Heartland": { finish: "1st", points: 550, kos: 2 },
      "Chaos": { finish: "13th-16th", points: 150, kos: 0 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 1 },
      "Descent": { finish: "1st", points: 550, kos: 2 },
      "Solar": { finish: "5th-6th", points: 300, kos: 1 },
      "Nightmare": { finish: "17th-24th", points: 100, kos: 0 },
      "Wind Breakers": { finish: "9th-12th", points: 200, kos: 1 },
      "Malice": { finish: "7th-8th", points: 250, kos: 1 },
      "Armageddon": { finish: "3rd", points: 400, kos: 2 },
      "New Life": { finish: "9th-12th", points: 200, kos: 1 }
    },
    "Jungle Unovo": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 1 },
      "Chaos": { finish: "2nd", points: 450, kos: 2 },
      "Heritage": { finish: "9th-12th", points: 200, kos: 0 },
      "Descent": { finish: "3rd", points: 400, kos: 2 },
      "Solar": { finish: "13th-16th", points: 150, kos: 0 },
      "Nightmare": { finish: "3rd", points: 400, kos: 2 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 1 },
      "Malice": { finish: "5th-6th", points: 300, kos: 1 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 1 },
      "New Life": { finish: "1st", points: 550, kos: 2 }
    },
    "Night Corondolo": {
      "Heartland": { finish: "3rd", points: 400, kos: 1 },
      "Chaos": { finish: "1st", points: 550, kos: 2 },
      "Heritage": { finish: "7th-8th", points: 250, kos: 1 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "3rd", points: 400, kos: 1 },
      "Nightmare": { finish: "1st", points: 550, kos: 2 },
      "Wind Breakers": { finish: "13th-16th", points: 150, kos: 0 },
      "Malice": { finish: "9th-12th", points: 200, kos: 1 },
      "Armageddon": { finish: "7th-8th", points: 250, kos: 1 },
      "New Life": { finish: "5th-6th", points: 300, kos: 1 }
    }
  },
  "704": {
    "Rain Lieryon": {
      "Heartland": { finish: "1st", points: 550, kos: 2 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 1 },
      "Heritage": { finish: "1st", points: 550, kos: 2 },
      "Descent": { finish: "1st", points: 550, kos: 2 },
      "Solar": { finish: "3rd", points: 400, kos: 1 },
      "Nightmare": { finish: "9th-12th", points: 200, kos: 1 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 1 },
      "Malice": { finish: "1st", points: 550, kos: 2 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 1 },
      "New Life": { finish: "5th-6th", points: 300, kos: 1 }
    },
    "Jungle Unovo": {
      "Heartland": { finish: "5th-6th", points: 300, kos: 1 },
      "Chaos": { finish: "2nd", points: 450, kos: 2 },
      "Heritage": { finish: "2nd", points: 450, kos: 2 },
      "Descent": { finish: "2nd", points: 450, kos: 2 },
      "Solar": { finish: "5th-6th", points: 300, kos: 1 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 1 },
      "Wind Breakers": { finish: "3rd", points: 400, kos: 2 },
      "Malice": { finish: "5th-6th", points: 300, kos: 1 },
      "Armageddon": { finish: "3rd", points: 400, kos: 2 },
      "New Life": { finish: "9th-12th", points: 200, kos: 1 }
    },
    "Night Corondolo": {
      "Heartland": { finish: "2nd", points: 450, kos: 1 },
      "Chaos": { finish: "1st", points: 550, kos: 2 },
      "Heritage": { finish: "3rd", points: 400, kos: 1 },
      "Descent": { finish: "3rd", points: 400, kos: 1 },
      "Solar": { finish: "1st", points: 550, kos: 2 },
      "Nightmare": { finish: "3rd", points: 400, kos: 1 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 2 },
      "Malice": { finish: "7th-8th", points: 250, kos: 1 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 1 },
      "New Life": { finish: "3rd", points: 400, kos: 1 }
    },
    "Heal Calofloure": {
      "Heartland": { finish: "3rd", points: 400, kos: 1 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 1 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "2nd", points: 450, kos: 1 },
      "Nightmare": { finish: "1st", points: 550, kos: 2 },
      "Wind Breakers": { finish: "7th-8th", points: 250, kos: 1 },
      "Malice": { finish: "3rd", points: 400, kos: 1 },
      "Armageddon": { finish: "1st", points: 550, kos: 2 },
      "New Life": { finish: "1st", points: 550, kos: 2 }
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
    "Night Corondolo": {
      "Heartland": { finish: "1st", points: 550, kos: 2 },
      "Chaos": { finish: "2nd", points: 450, kos: 1 },
      "Heritage": { finish: "2nd", points: 450, kos: 1 },
      "Descent": { finish: "1st", points: 550, kos: 2 },
      "Solar": { finish: "5th-6th", points: 300, kos: 1 },
      "Nightmare": { finish: "5th-6th", points: 300, kos: 1 },
      "Wind Breakers": { finish: "3rd", points: 400, kos: 1 },
      "Malice": { finish: "3rd", points: 400, kos: 1 },
      "Armageddon": { finish: "9th-12th", points: 200, kos: 1 },
      "New Life": { finish: "3rd", points: 400, kos: 1 }
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
    },
    "Pheonix Oliv": {
      "Heartland": { finish: "3rd", points: 400, kos: 1 },
      "Chaos": { finish: "2nd", points: 450, kos: 1 },
      "Heritage": { finish: "3rd", points: 400, kos: 1 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "1st", points: 550, kos: 2 },
      "Nightmare": { finish: "2nd", points: 450, kos: 1 },
      "Wind Breakers": { finish: "2nd", points: 450, kos: 1 },
      "Malice": { finish: "1st", points: 550, kos: 2 },
      "Armageddon": { finish: "3rd", points: 400, kos: 1 },
      "New Life": { finish: "1st", points: 550, kos: 2 }
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
    },
    "Monster Piccoloo": {
      "Heartland": { finish: "3rd", points: 400, kos: 1 },
      "Chaos": { finish: "3rd", points: 400, kos: 1 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 1 },
      "Descent": { finish: "3rd", points: 400, kos: 1 },
      "Solar": { finish: "2nd", points: 450, kos: 1 },
      "Nightmare": { finish: "2nd", points: 450, kos: 1 },
      "Wind Breakers": { finish: "1st", points: 550, kos: 2 },
      "Malice": { finish: "2nd", points: 450, kos: 1 },
      "Armageddon": { finish: "3rd", points: 400, kos: 1 },
      "New Life": { finish: "3rd", points: 400, kos: 1 }
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
    },
    "Monster Piccoloo": {
      "Heartland": { finish: "3rd", points: 400, kos: 1 },
      "Chaos": { finish: "9th-12th", points: 200, kos: 1 },
      "Heritage": { finish: "3rd", points: 400, kos: 1 },
      "Descent": { finish: "2nd", points: 450, kos: 1 },
      "Solar": { finish: "3rd", points: 400, kos: 1 },
      "Nightmare": { finish: "3rd", points: 400, kos: 1 },
      "Wind Breakers": { finish: "5th-6th", points: 300, kos: 1 },
      "Malice": { finish: "3rd", points: 400, kos: 1 },
      "Armageddon": { finish: "2nd", points: 450, kos: 1 },
      "New Life": { finish: "5th-6th", points: 300, kos: 1 }
    },
    "Cold Varuth": {
      "Heartland": { finish: "9th-12th", points: 200, kos: 1 },
      "Chaos": { finish: "5th-6th", points: 300, kos: 1 },
      "Heritage": { finish: "5th-6th", points: 300, kos: 1 },
      "Descent": { finish: "5th-6th", points: 300, kos: 1 },
      "Solar": { finish: "5th-6th", points: 300, kos: 1 },
      "Nightmare": { finish: "2nd", points: 450, kos: 1 },
      "Wind Breakers": { finish: "3rd", points: 400, kos: 1 },
      "Malice": { finish: "2nd", points: 450, kos: 1 },
      "Armageddon": { finish: "5th-6th", points: 300, kos: 1 },
      "New Life": { finish: "3rd", points: 400, kos: 1 }
    }
  }
};
