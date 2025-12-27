// Fighter bios and extended info
export const fighterBios: Record<string, {
  nickname?: string;
  birthplace?: string;
  style?: string;
  bio: string;
  notableMoments?: string[];
  rivalries?: string[];
}> = {
  "Prince Jonkan": {
    nickname: "The Prince",
    style: "Technical Precision",
    bio: "One of the most decorated fighters in Corefall history, Prince Jonkan dominated the early 680s with a technical mastery that few could match. His back-to-back Apex victories (680-681) and Season Star awards cemented his legacy as one of the all-time greats. Known for his calculated approach and devastating finishing combinations.",
    notableMoments: ["2x Apex Champion (680, 681)", "2x Season Star", "Damage Dynasty Leader"],
    rivalries: ["Ring Hawlikaw", "Spade Faxzin"]
  },
  "Rain Lieryon": {
    nickname: "The Rainmaker",
    style: "Aggressive Counter",
    bio: "Rain Lieryon is a living legend, the most decorated fighter of the modern era with 14 career titles. His ability to read opponents and counter with devastating precision earned him two Apex championships and an unprecedented 4 consecutive Season Star awards (702-704). A Dashlol icon through and through.",
    notableMoments: ["2x Apex Champion (702, 704)", "4x Season Star", "14 Career Titles", "Hall of Immortals Inductee"],
    rivalries: ["Jungle Unovo", "Pheonix Oliv"]
  },
  "Cascade Juner": {
    nickname: "The Cascade",
    style: "Relentless Pressure",
    bio: "The current king of Corefall, Cascade Juner burst onto the scene in 707 and hasn't looked back. With back-to-back Apex titles (707, 708) and an astounding 16 career titles, he represents the new generation of elite fighters. His pressure-heavy style overwhelms opponents, making him the most feared competitor today.",
    notableMoments: ["2x Apex Champion (707, 708)", "2x CTT Champion", "16 Career Titles", "Season Star 709"],
    rivalries: ["Vampire Ortez", "Mega Hawnnon"]
  },
  "Nothing Sawryr": {
    nickname: "Nothing",
    style: "Unpredictable Chaos",
    bio: "The reigning Apex 709 Champion, Nothing Sawryr shocked the world with his victory over the heavily favored Mega Hawnnon in the Grand Finals. He opened Season 710 by winning the Heartland Cup, his 6th career trophy. Known for his unpredictable style and clutch performances, he proved that anything is possible in the Apex. A Gastro loyal who has risen to the very top.",
    notableMoments: ["Apex 709 Champion", "Heartland 710 Champion", "6 Career Titles", "Solar Summit Winner (708, 709)"],
    rivalries: ["Mega Hawnnon", "Cascade Juner"]
  },
  "Pheonix Oliv": {
    nickname: "The Phoenix",
    style: "Adaptive Excellence",
    bio: "The GOAT of the 690s era, Pheonix Oliv dominated an entire decade with 6 Season Star awards (694-699) and multiple Apex championships. His ability to adapt to any opponent made him nearly unbeatable in his prime. A founding member of the Hall of Immortals.",
    notableMoments: ["4x Apex Champion (696, 698, 699, 701)", "6x Season Star", "Hall of Immortals Founding Member"],
    rivalries: ["Mountain Granton", "Monster Piccoloo"]
  },
  "Snow Masogoto": {
    nickname: "The Blizzard",
    style: "Cold Precision",
    bio: "The Engery franchise player of the 690s, Snow Masogoto captured 3 Apex titles and established the team as a powerhouse. His calculated, ice-cold demeanor in clutch moments made him one of the most feared competitors of his era.",
    notableMoments: ["3x Apex Champion (691, 692, 695)", "2x Season Star", "Engery Dynasty Leader"],
    rivalries: ["Soler Varo", "Bulldoser Banwich"]
  },
  "Jungle Unovo": {
    nickname: "The Jungle King",
    style: "Savage Aggression",
    bio: "A two-time Apex Champion and Cal Hal franchise cornerstone, Jungle Unovo combines raw aggression with surprising tactical awareness. His battles with Rain Lieryon defined the 703-706 era.",
    notableMoments: ["2x Apex Champion (703, 706)", "CTT 701", "12 Career Titles"],
    rivalries: ["Rain Lieryon", "Cascade Juner"]
  },
  "Zeus Ziki": {
    nickname: "The Lightning",
    style: "Explosive Power",
    bio: "Cal Hal's current ace, Zeus Ziki combines explosive power with tactical intelligence. His Season Star 708 campaign and 7 career titles make him a constant championship threat.",
    notableMoments: ["Season Star 708", "7 Career Titles", "CTT 706"],
    rivalries: ["Cascade Juner", "Wraith Cunelly"]
  },
  "Mega Hawnnon": {
    nickname: "Mega",
    style: "Power Overwhelming",
    bio: "The Apex 709 Runner-Up, Mega Hawnnon came agonizingly close to the title. His raw power and improving tactical game make him a favorite for future championships. A rising Dashlol star.",
    notableMoments: ["Apex 709 Finals", "2 Major Titles", "Dashlol Core Member"],
    rivalries: ["Nothing Sawryr", "Vampire Ortez"]
  },
  "Vampire Ortez": {
    nickname: "The Vampire",
    style: "Life Drain",
    bio: "Known for wearing down opponents and 'draining' their energy throughout matches, Vampire Ortez is one of the most consistent performers of the modern era. Apex 708 Runner-Up and multiple major winner.",
    notableMoments: ["Apex 708 Finals", "3 Career Titles", "Points Leader 709"],
    rivalries: ["Cascade Juner", "Mega Hawnnon"]
  },
  "Heal Calofloure": {
    nickname: "The Healer",
    style: "Endurance Master",
    bio: "The Apex 705 Champion represents durability incarnate. His ability to outlast opponents and recover from deficits is legendary. A Limium core member who continues to compete at the highest level.",
    notableMoments: ["Apex 705 Champion", "7 Career Titles", "Perennial Contender"],
    rivalries: ["Killa Binbac", "Zeus Ziki"]
  },
  "Spade Faxzin": {
    nickname: "Ace of Spades",
    style: "All-Round Excellence",
    bio: "A two-time Apex Champion and Hall of Immortals inductee, Spade Faxzin anchored the Gastro dynasty of the 680s. His well-rounded skillset and clutch gene made him virtually unbeatable in his prime.",
    notableMoments: ["2x Apex Champion (683, 684)", "2x CTT Champion", "Hall of Immortals"],
    rivalries: ["Break Xinziki", "Prince Jonkan"]
  },
  "Ring Hawlikaw": {
    nickname: "The Ring Master",
    style: "Tactical Dominance",
    bio: "A Hall of Immortals member and Apex 682 Champion, Ring Hawlikaw mastered the tactical elements of Corefall like few others. His strategic genius influenced generations of fighters.",
    notableMoments: ["Apex 682 Champion", "Hall of Immortals", "Rass Legend"],
    rivalries: ["Prince Jonkan", "Six Vasad"]
  },
  "Wraith Cunelly": {
    nickname: "The Wraith",
    style: "Phantom Movement",
    bio: "Engery's current franchise player, Wraith Cunelly is known for elusive movement and devastating counters. Apex 707 Finalist and consistent championship contender.",
    notableMoments: ["Apex 707 Finals", "5 Career Titles", "Engery Leader"],
    rivalries: ["Cascade Juner", "Zeus Ziki"]
  },
  "Killa Binbac": {
    nickname: "The Killer",
    style: "Ruthless Aggression",
    bio: "A knockout artist and Qalf legend, Killa Binbac led the 706 season in KOs with an astonishing 16. His pure aggression and finishing ability make him a constant entertainment.",
    notableMoments: ["Season Star 706", "16 KOs in 706", "5 Career Titles"],
    rivalries: ["Heal Calofloure", "Wraith Cunelly"]
  }
};

// Team info from Team_Info.xlsx
export const teamInfo: Record<string, {
  location: string;
  coach: string;
  popularity: number;
}> = {
  "Damage": { location: "Jaxston, Auren", coach: "Soler Varo", popularity: 1 },
  "Engery": { location: "Jaxston, Auren", coach: "Ball Raytor", popularity: 2 },
  "Dashlol": { location: "Lou, Thane", coach: "Thunder Toria", popularity: 3 },
  "Cal Hal": { location: "Dodster, Auren", coach: "Splash Gradey", popularity: 4 },
  "Gastro": { location: "Omaidara, Thane", coach: "Nemesis Owanash", popularity: 5 },
  "Limium": { location: "Oscrar, Dureya", coach: "Cold Varuth", popularity: 6 },
  "Qalf": { location: "Dimonco, Vorell", coach: "Astro Daslo", popularity: 7 },
  "Varcity": { location: "Jaxston, Auren", coach: "Monster Piccoloo", popularity: 8 },
  "Zemiga-Mar": { location: "Andur, Dureya", coach: "Bulldoser Banwich", popularity: 9 },
  "AFE": { location: "Daneyse, Vorell", coach: "Legacy Maryinez", popularity: 10 },
  "Juire": { location: "Dimonco, Vorell", coach: "Shark Obimovch", popularity: 11 },
  "Juniper": { location: "Sente, Thane", coach: "Sword Vacane", popularity: 12 },
  "Fadee": { location: "Lou, Thane", coach: "Light Brog", popularity: 13 }
};

// Contract data from Contract_Data.xlsx (709 season)
export const contractData: Record<string, {
  team: string;
  age: number;
  amount: string;
  contractThrough: number;
}> = {
  "Cascade Juner": { team: "Damage", age: 30, amount: "8.2 Million", contractThrough: 711 },
  "Nothing Sawryr": { team: "Gastro", age: 28, amount: "6.8 Million", contractThrough: 710 },
  "Mega Hawnnon": { team: "Dashlol", age: 27, amount: "4.4 Million", contractThrough: 709 },
  "Daredevil Gaffe": { team: "Qalf", age: 24, amount: "4.8 Million", contractThrough: 711 },
  "Bat Bornoil": { team: "Damage", age: 27, amount: "5.1 Million", contractThrough: 710 },
  "Zeus Ziki": { team: "Cal Hal", age: 30, amount: "7.3 Million", contractThrough: 711 },
  "Wraith Cunelly": { team: "Engery", age: 29, amount: "6.1 Million", contractThrough: 712 },
  "Sky Sunyer": { team: "Zemiga-Mar", age: 27, amount: "5.3 Million", contractThrough: 711 },
  "Vampire Ortez": { team: "Dashlol", age: 27, amount: "5.6 Million", contractThrough: 711 },
  "Heal Calofloure": { team: "Limium", age: 31, amount: "5.7 Million", contractThrough: 709 },
  "Pulse Farward": { team: "Varcity", age: 28, amount: "3.5 Million", contractThrough: 709 },
  "Rem Asamtoy": { team: "Qalf", age: 27, amount: "1.3 Million", contractThrough: 710 },
  "Titan Aui": { team: "Limium", age: 26, amount: "1.5 Million", contractThrough: 709 },
  "Clipper Doznu": { team: "Varcity", age: 27, amount: "1.1 Million", contractThrough: 709 },
  "Supernova Aloi": { team: "Gastro", age: 29, amount: "3.2 Million", contractThrough: 710 },
  "Game Darwonn": { team: "Engery", age: 29, amount: "2.7 Million", contractThrough: 710 },
  "Fisher Cerzonal": { team: "Qalf", age: 29, amount: "4.7 Million", contractThrough: 709 },
  "Freeze Jagwiab": { team: "Juniper", age: 24, amount: "1.2 Million", contractThrough: 711 },
  "Killa Binbac": { team: "Fadee", age: 31, amount: "3.5 Million", contractThrough: 710 },
  "Harsh Raii": { team: "AFE", age: 25, amount: "1.2 Million", contractThrough: 711 },
  "Horse Queanlend": { team: "Juire", age: 28, amount: "4.3 Million", contractThrough: 712 },
  "Cross Exzona": { team: "Cal Hal", age: 26, amount: "4.7 Million", contractThrough: 712 },
  "Rocket Dalbale": { team: "Zemiga-Mar", age: 24, amount: "1.1 Million", contractThrough: 711 },
  "Whiteout Gar-Kiola": { team: "Juire", age: 31, amount: "3.8 Million", contractThrough: 710 },
  "Rain Lieryon": { team: "Dashlol", age: 34, amount: "5 Million", contractThrough: 709 }
};

// Team bios and extended info
export const teamBios: Record<string, {
  founded?: string;
  homeBase?: string;
  colors?: string;
  description: string;
  notableAlumni?: string[];
  rivalTeams?: string[];
}> = {
  "Gastro": {
    founded: "Pre-680 Era",
    colors: "Purple & Gold",
    description: "One of Corefall's most storied franchises, Gastro has produced legendary fighters across multiple eras. From the Spade Faxzin dynasty of the 680s to Nothing Sawryr's Apex 709 triumph, Gastro represents excellence and tradition. The team's commitment to developing talent has made them perennial contenders.",
    notableAlumni: ["Spade Faxzin", "Nothing Sawryr", "Spirit Matthieu", "Night Corondolo", "Supernova Aloi"],
    rivalTeams: ["Damage", "Qalf"]
  },
  "Damage": {
    founded: "Pre-680 Era",
    colors: "Red & Black",
    description: "The most dominant team of the current era, Damage has won back-to-back Apex titles (707, 708) with Cascade Juner and established themselves as the gold standard. Their aggressive, no-holds-barred style reflects their name. Historical powerhouse home to legends like Prince Jonkan and Soler Varo.",
    notableAlumni: ["Cascade Juner", "Prince Jonkan", "Soler Varo", "Anti Tryoe", "Bat Bornoil"],
    rivalTeams: ["Dashlol", "Engery"]
  },
  "Dashlol": {
    founded: "Pre-680 Era",
    colors: "Blue & Silver",
    description: "Home to the legendary Pheonix Oliv dynasty of the 690s and Rain Lieryon's dominance in the early 700s. Dashlol represents legacy and excellence. Currently features rising stars Mega Hawnnon and Vampire Ortez.",
    notableAlumni: ["Pheonix Oliv", "Rain Lieryon", "Vampire Ortez", "Mega Hawnnon"],
    rivalTeams: ["Damage", "Varcity"]
  },
  "Engery": {
    founded: "Pre-680 Era",
    colors: "Green & White",
    description: "The Snow Masogoto era (691-695) established Engery as one of Corefall's elite franchises. Home to multiple CTT championships and consistent contenders like Wraith Cunelly and Zeus Ziki (706-707).",
    notableAlumni: ["Snow Masogoto", "Ball Ratyor", "Wraith Cunelly", "Zeus Ziki"],
    rivalTeams: ["Limium", "Damage"]
  },
  "Cal Hal": {
    founded: "Pre-680 Era",
    colors: "Orange & Navy",
    description: "A franchise defined by clutch performers, Cal Hal has produced multiple Apex champions including Splash Gradey (700) and Jungle Unovo (703, 706). Zeus Ziki carries the torch today.",
    notableAlumni: ["Jungle Unovo", "Splash Gradey", "Zeus Ziki", "Cross Exzona"],
    rivalTeams: ["Varcity", "Dashlol"]
  },
  "Qalf": {
    founded: "Pre-680 Era",
    colors: "Cyan & Black",
    description: "A perennial powerhouse known for consistent performance and developing elite fighters. Home to Killa Binbac's legendary 706 campaign and multiple CTT championships. Current core includes Daredevil Gaffe and Fisher Cerzonal.",
    notableAlumni: ["Killa Binbac", "Astro Daslo", "Fisher Cerzonal", "Daredevil Gaffe", "Rem Asamtoy"],
    rivalTeams: ["Gastro", "Limium"]
  },
  "Limium": {
    founded: "Pre-680 Era",
    colors: "Teal & Gold",
    description: "The Vibrant Yaul and Bulldoser Banwich eras cemented Limium as a historic power. Heal Calofloure's career-spanning dominance keeps them relevant today. Known for developing patient, endurance-focused fighters.",
    notableAlumni: ["Vibrant Yaul", "Bulldoser Banwich", "Heal Calofloure", "Cold Varuth", "Rolle Asikov"],
    rivalTeams: ["Engery", "Qalf"]
  },
  "Varcity": {
    founded: "Pre-680 Era",
    colors: "Purple & White",
    description: "A franchise with deep history, Varcity has produced legends like Pheonix Oliv (701 Apex), Mountain Granton, and Giga Lertown. Blood Astur and Pulse Farward carry the current roster.",
    notableAlumni: ["Pheonix Oliv", "Mountain Granton", "Giga Lertown", "Monster Piccoloo", "Blood Astur"],
    rivalTeams: ["Dashlol", "Cal Hal"]
  },
  "AFE": {
    founded: "Pre-680 Era",
    colors: "Maroon & Silver",
    description: "A solid mid-tier franchise that occasionally produces top talent. Whiteout Gar-Kiola and Greed Mahuney have represented the team well in recent seasons.",
    notableAlumni: ["Whiteout Gar-Kiola", "Greed Mahuney", "Harsh Raii", "Guardian Garlim"],
    rivalTeams: ["Juniper", "Juire"]
  },
  "Juniper": {
    founded: "Pre-700 Era",
    colors: "Forest Green",
    description: "A developing franchise that has shown flashes of potential. Cross Exzona and Freeze Jagwiab represent the current core as the team looks to establish itself among the elite.",
    notableAlumni: ["Cross Exzona", "Freeze Jagwiab", "Club Faxzin"],
    rivalTeams: ["AFE", "Fadee"]
  },
  "Juire": {
    founded: "Pre-700 Era",
    colors: "Yellow & Brown",
    description: "A franchise known for developing underdog fighters. Horse Queanlend has been a consistent performer, and the team continues to build toward contention.",
    notableAlumni: ["Horse Queanlend", "Ninja Derlow", "Whiteout Gar-Kiola"],
    rivalTeams: ["AFE", "Zemiga-Mar"]
  },
  "Zemiga-Mar": {
    founded: "709 (Merger)",
    colors: "Gray & Crimson",
    description: "Formed from the merger of historic franchise Zemiga and Binish Mar, this new team combines legacy with fresh talent. Sky Sunyer leads the current roster. Zemiga's Break Xinziki Apex 686 legacy lives on.",
    notableAlumni: ["Break Xinziki", "Sky Sunyer", "Bronze Sarolm", "Heal Calofloure (Binish Mar era)"],
    rivalTeams: ["Nocry", "Fadee"]
  },
  "Fadee": {
    founded: "Pre-700 Era",
    colors: "Crimson & Black",
    description: "A rebuilding franchise looking to return to prominence. Currently home to veteran Killa Binbac who brings experience and championship pedigree to the young roster.",
    notableAlumni: ["Killa Binbac", "Friction Zalzabi", "Venus Aloi"],
    rivalTeams: ["Juniper", "Zemiga-Mar"]
  }
};

// Get all unique fighter names from the standings data
export const getAllFighters = (): string[] => {
  const fighters = new Set<string>();
  // This will be populated from pastStandings in the actual component
  return Array.from(fighters);
};

// Get all unique team names
export const getAllTeams = (): string[] => {
  return [
    "Qalf", "Dashlol", "Damage", "Limium", "Gastro", "Varcity",
    "Engery", "Cal Hal", "Zemiga-Mar", "AFE", "Juniper", "Juire",
    "Fadee", "Rilak", "QW", "VVV", "Nocry"
  ];
};
