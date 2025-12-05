export interface RosterMove {
  player: string;
  oldTeam: string;
  newTeam: string;
  season: string;
}

// Roster moves data extracted from season Excel files
export const rosterMoves: RosterMove[] = [
  // Season 701 (moves before 701)
  { player: "Pheonix Oliv", oldTeam: "Dashlol", newTeam: "Varcity", season: "701" },
  { player: "Rain Lieryon", oldTeam: "Beal", newTeam: "Dashlol", season: "701" },
  { player: "Saint Lameron", oldTeam: "Limium", newTeam: "Damage", season: "701" },
  { player: "Blood Astur", oldTeam: "Damage", newTeam: "Gastro", season: "701" },
  { player: "Jungle Unovo", oldTeam: "Binish Mar", newTeam: "Cal Hal", season: "701" },
  { player: "Purple Vafe", oldTeam: "Zawo", newTeam: "Limium", season: "701" },
  { player: "Legacy Maryinez", oldTeam: "Dashlol", newTeam: "Beal", season: "701" },
  { player: "Path Burrew", oldTeam: "Engery", newTeam: "AFE", season: "701" },
  { player: "Storm Dayniel", oldTeam: "Qalf", newTeam: "Binish Mar", season: "701" },
  { player: "Strike Mag-Opel", oldTeam: "Juire", newTeam: "Engery", season: "701" },
  { player: "Burn Bafergu", oldTeam: "Zemiga", newTeam: "Damage", season: "701" },
  { player: "Love Jaust", oldTeam: "Indy", newTeam: "Beal", season: "701" },

  // Season 702 (moves before 702)
  { player: "Night Corondolo", oldTeam: "Cal Hal", newTeam: "Gastro", season: "702" },
  { player: "Tox Manahoe", oldTeam: "VVV", newTeam: "Varcity", season: "702" },
  { player: "Love Jaust", oldTeam: "Beal", newTeam: "Cal Hal", season: "702" },
  { player: "Killa Binbac", oldTeam: "Nocry", newTeam: "Qalf", season: "702" },
  { player: "Space Mahr", oldTeam: "Ovest", newTeam: "AFE", season: "702" },
  { player: "Utopia Vaaxo", oldTeam: "Varcity", newTeam: "Beal", season: "702" },
  { player: "Light Brog", oldTeam: "Manity", newTeam: "Halio", season: "702" },

  // Season 703 (moves before 703)
  { player: "Cascade Juner", oldTeam: "Juniper", newTeam: "Damage", season: "703" },
  { player: "Storm Dayniel", oldTeam: "Binish Mar", newTeam: "Gastro", season: "703" },
  { player: "Justice Karoawaki", oldTeam: "Zemiga", newTeam: "Limium", season: "703" },
  { player: "Cloud Youug", oldTeam: "Limium", newTeam: "Dashlol", season: "703" },
  { player: "Craytor Nimiuor", oldTeam: "Ovest", newTeam: "Damage", season: "703" },
  { player: "Tsunami Sugeri", oldTeam: "VVV", newTeam: "Juire", season: "703" },

  // Season 704 (moves before 704)
  { player: "Joy Dafvies", oldTeam: "Juire", newTeam: "Limium", season: "704" },
  { player: "Supernova Aloi", oldTeam: "Juniper", newTeam: "Cal Hal", season: "704" },
  { player: "Space Mahr", oldTeam: "AFE", newTeam: "Juire", season: "704" },
  { player: "Hulk Saechez", oldTeam: "Halio", newTeam: "Binish Mar", season: "704" },
  { player: "Love Jaust", oldTeam: "Cal Hal", newTeam: "VVV", season: "704" },
  { player: "Blu Cisori", oldTeam: "Ovest", newTeam: "Varcity", season: "704" },
  { player: "Dart Navkop", oldTeam: "Rilak", newTeam: "Juniper", season: "704" },

  // Season 705 (moves before 705)
  { player: "Nemesis Owanash", oldTeam: "AFE", newTeam: "Varcity", season: "705" },
  { player: "Whiteout Gar-Kiola", oldTeam: "Qalf", newTeam: "AFE", season: "705" },
  { player: "Fisher Cerzonal", oldTeam: "Binish Mar", newTeam: "Qalf", season: "705" },
  { player: "Saint Lameron", oldTeam: "Damage", newTeam: "Ovest", season: "705" },
  { player: "Blu Cisori", oldTeam: "Varcity", newTeam: "Beal", season: "705" },
  { player: "Craytor Nimiuor", oldTeam: "Damage", newTeam: "VVV", season: "705" },

  // Season 706 (moves before 706)
  { player: "Blood Astur", oldTeam: "Gastro", newTeam: "Damage", season: "706" },
  { player: "Heal Calofloure", oldTeam: "Binish Mar", newTeam: "Limium", season: "706" },
  { player: "Justice Karoawaki", oldTeam: "Limium", newTeam: "Binish Mar", season: "706" },
  { player: "Tempest Niez", oldTeam: "Juniper", newTeam: "Engery", season: "706" },
  { player: "Vulture Descrez", oldTeam: "Varcity", newTeam: "Ovest", season: "706" },
  { player: "Violence Coslo", oldTeam: "AFE", newTeam: "Ovest", season: "706" },

  // Season 707 (moves before 707)
  { player: "Nothing Sawryr", oldTeam: "Zemiga", newTeam: "Gastro", season: "707" },
  { player: "Supernova Aloi", oldTeam: "Cal Hal", newTeam: "Gastro", season: "707" },
  { player: "Game Darwonn", oldTeam: "Limium", newTeam: "Cal Hal", season: "707" },
  { player: "Greed Mahuney", oldTeam: "Zemiga", newTeam: "AFE", season: "707" },
  { player: "Blood Astur", oldTeam: "Damage", newTeam: "Varcity", season: "707" },
  { player: "Dart Navkop", oldTeam: "Rilak", newTeam: "Juire", season: "707" },
  { player: "Ninja Derlow", oldTeam: "Dashlol", newTeam: "Juire", season: "707" },
  { player: "Titan Aui", oldTeam: "Binish Mar", newTeam: "Dashlol", season: "707" },

  // Season 708 (upcoming moves)
  { player: "Vampire Ortez", oldTeam: "Juniper", newTeam: "Dashlol", season: "708" },
  { player: "Titan Aui", oldTeam: "Dashlol", newTeam: "Limium", season: "708" },
  { player: "Zeus Ziki", oldTeam: "Engery", newTeam: "Cal Hal", season: "708" },
  { player: "Game Darwonn", oldTeam: "Cal Hal", newTeam: "Engery", season: "708" },
  { player: "Rem Asamtoy", oldTeam: "Nocry", newTeam: "Qalf", season: "708" },
  { player: "Terminator Hayfur", oldTeam: "AFE", newTeam: "Rilak", season: "708" },
  { player: "Guardian Garlim", oldTeam: "Rilak", newTeam: "AFE", season: "708" },
  { player: "Tox Manahoe", oldTeam: "Varcity", newTeam: "Ovest", season: "708" },
  { player: "Clipper Doznu", oldTeam: "Zemiga", newTeam: "Varcity", season: "708" },
];

// Get all available seasons with roster moves
export const getSeasons = (): string[] => {
  const seasons = new Set(rosterMoves.map(move => move.season));
  return Array.from(seasons).sort((a, b) => parseInt(b) - parseInt(a)); // Most recent first
};

// Get roster moves by season
export const getMovesBySeason = (season: string): RosterMove[] => {
  return rosterMoves.filter(move => move.season === season);
};

// Get all moves for a specific player
export const getPlayerMoves = (playerName: string): RosterMove[] => {
  return rosterMoves.filter(move => move.player === playerName);
};

// Get all moves involving a specific team (either as old or new team)
export const getTeamMoves = (teamName: string): RosterMove[] => {
  return rosterMoves.filter(move => move.oldTeam === teamName || move.newTeam === teamName);
};
