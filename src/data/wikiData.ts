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
    style: "Balanced / More Rigid",
    bio: "The current king of Corefall, Cascade Juner burst onto the scene in 707 and hasn't looked back. With back-to-back Apex titles (707, 708) and an astounding 16 career titles, he represents the new generation of elite fighters. His pressure-heavy style overwhelms opponents, making him the most feared competitor today.",
    notableMoments: ["2x Apex Champion (707, 708)", "2x CTT Champion", "16 Career Titles", "Season Star 709"],
    rivalries: ["Vampire Ortez", "Mega Hawnnon"]
  },
  "Nothing Sawryr": {
    nickname: "Nothing",
    style: "Balanced / More Rigid",
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
    style: "Pressure / More Rigid",
    bio: "Cal Hal's current ace, Zeus Ziki combines explosive power with tactical intelligence. His Season Star 708 campaign and 7 career titles make him a constant championship threat.",
    notableMoments: ["Season Star 708", "7 Career Titles", "CTT 706"],
    rivalries: ["Cascade Juner", "Wraith Cunelly"]
  },
  "Mega Hawnnon": {
    nickname: "Mega",
    style: "Wildcard / More Loose",
    bio: "The Apex 709 Runner-Up, Mega Hawnnon came agonizingly close to the title. His raw power and improving tactical game make him a favorite for future championships. A rising Dashlol star.",
    notableMoments: ["Apex 709 Finals", "Nightmare 710 Champion", "4 Major Titles", "Dashlol Core Member"],
    rivalries: ["Nothing Sawryr", "Vampire Ortez"]
  },
  "Vampire Ortez": {
    nickname: "The Vampire",
    style: "Pressure / More Loose",
    bio: "Known for wearing down opponents and 'draining' their energy throughout matches, Vampire Ortez is one of the most consistent performers of the modern era. Apex 708 Runner-Up and multiple major winner.",
    notableMoments: ["Apex 708 Finals", "Solar 710 Champion", "4 Career Titles", "Points Leader 709"],
    rivalries: ["Cascade Juner", "Mega Hawnnon"]
  },
  "Heal Calofloure": {
    nickname: "The Healer",
    style: "Counter / More Rigid",
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
    style: "Counter / More Loose",
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
  },
  "Bat Bornoil": {
    nickname: "The Bat",
    style: "Pressure / More Rigid",
    bio: "Damage's reliable number two, Bat Bornoil brings consistent pressure and powerful strikes. A key contributor to Damage's recent dynasty.",
    notableMoments: ["Heritage 710 Champion", "Multiple Major Titles", "Damage Core Member"],
    rivalries: ["Supernova Aloi", "Fisher Cerzonal"]
  },
  "Rem Asamtoy": {
    nickname: "Rem",
    style: "Pressure / More Loose",
    bio: "A dynamic Qalf fighter known for relentless forward movement and unpredictable offense. Rising talent in the current era.",
    notableMoments: ["Qalf Core Member", "Rising Contender"],
    rivalries: ["Daredevil Gaffe", "Pulse Farward"]
  },
  "Clipper Doznu": {
    nickname: "The Clipper",
    style: "Counter / More Loose",
    bio: "Varcity's sharp counter-striker, Clipper Doznu waits for openings and strikes with precision. A patient fighter who excels in extended matches.",
    notableMoments: ["Varcity Core Member", "Consistent Performer"],
    rivalries: ["Pulse Farward", "Game Darwonn"]
  },
  "Supernova Aloi": {
    nickname: "The Supernova",
    style: "Counter / More Rigid",
    bio: "Gastro's explosive counter-puncher who can turn any match with a single exchange. His disciplined approach and calculated aggression make him dangerous.",
    notableMoments: ["Gastro Core Member", "Multiple Top Finishes"],
    rivalries: ["Bat Bornoil", "Zeus Ziki"]
  },
  "Pulse Farward": {
    nickname: "Pulse",
    style: "Balanced / More Loose",
    bio: "Varcity's versatile fighter who adapts his approach based on opponents. His fluid style and quick adjustments make him difficult to prepare for.",
    notableMoments: ["Varcity Core Member", "Consistent Top 40"],
    rivalries: ["Clipper Doznu", "Rem Asamtoy"]
  },
  "Daredevil Gaffe": {
    nickname: "Daredevil",
    style: "Balanced / More Rigid",
    bio: "Qalf's fearless young star who takes calculated risks and thrives in high-pressure situations. One of the brightest prospects in Corefall.",
    notableMoments: ["Qalf Core Member", "Rising Star", "Multiple Major Finishes"],
    rivalries: ["Nothing Sawryr", "Rem Asamtoy"]
  },
  "Fisher Cerzonal": {
    nickname: "The Fisher",
    style: "Balanced / More Rigid",
    bio: "A patient and methodical fighter who picks apart opponents with precision. Qalf's veteran presence and consistent performer.",
    notableMoments: ["Qalf Core Member", "Multiple Top Finishes"],
    rivalries: ["Bat Bornoil", "Heal Calofloure"]
  },
  "Harsh Raii": {
    nickname: "Harsh",
    style: "Wildcard / More Loose",
    bio: "AFE's unpredictable wildcard who can beat anyone on any given day. His chaotic style makes him a nightmare to prepare for.",
    notableMoments: ["AFE Core Member", "Upset Specialist"],
    rivalries: ["Sky Sunyer", "Freeze Jagwiab"]
  },
  "Sky Sunyer": {
    nickname: "Sky",
    style: "Wildcard / More Loose",
    bio: "Zemiga-Mar's franchise player with an explosive and unpredictable approach. His ability to shift gears mid-match keeps opponents guessing.",
    notableMoments: ["Descent 710 Champion", "Zemiga-Mar Leader", "Rising Star"],
    rivalries: ["Harsh Raii", "Mega Hawnnon"]
  },
  "Spring Cemet": {
    nickname: "The Spring",
    style: "Counter / More Loose",
    bio: "Limium's rising talent known for his quick reflexes and ability to bounce back from adversity. His counter-heavy style and youthful energy make him a promising addition to the franchise.",
    notableMoments: ["Limium Core Member", "711 Breakout Candidate"],
    rivalries: ["Titan Aui", "Heal Calofloure"]
  },
  "Totality Tryoe": {
    nickname: "Totality",
    style: "Pressure / More Rigid",
    bio: "A Damage prospect carrying the Tryoe family legacy. His disciplined, pressure-focused approach mirrors the franchise's identity. Expected to be a key piece of Damage's future.",
    notableMoments: ["Damage Core Member", "711 Prospect", "Tryoe Legacy"],
    rivalries: ["Guardian Garlim", "Bat Bornoil"]
  },
  "Guardian Garlim": {
    nickname: "The Guardian",
    style: "Balanced / More Rigid",
    bio: "Cal Hal's defensive anchor known for his rock-solid fundamentals and ability to neutralize aggressive opponents. A consistent performer who excels in high-pressure situations.",
    notableMoments: ["Cal Hal Core Member", "711 Breakout Candidate"],
    rivalries: ["Totality Tryoe", "Cross Exzona"]
  }
};

// Team info from Team_Info.xlsx (711 season)
export const teamInfo: Record<string, {
  location: string;
  coach: string;
  popularity: number;
}> = {
  "Damage": { location: "Jaxston, Auren", coach: "Bulldoser Banwich", popularity: 1 },
  "Engery": { location: "Jaxston, Auren", coach: "Ball Raytor", popularity: 2 },
  "Dashlol": { location: "Lou, Thane", coach: "Thunder Toria", popularity: 3 },
  "Gastro": { location: "Omaidara, Thane", coach: "Nemesis Owanash", popularity: 4 },
  "Cal Hal": { location: "Dodster, Auren", coach: "Jungle Unovo", popularity: 5 },
  "Limium": { location: "Oscrar, Dureya", coach: "Cold Varuth", popularity: 6 },
  "Qalf": { location: "Dimonco, Vorell", coach: "Astro Daslo", popularity: 7 },
  "Varcity": { location: "Jaxston, Auren", coach: "Monster Piccoloo", popularity: 8 },
  "Zemiga-Mar": { location: "Andur, Dureya", coach: "Splash Gradey", popularity: 9 },
  "AFE": { location: "Daneyse, Vorell", coach: "Legacy Maryinez", popularity: 10 },
  "Fadee": { location: "Lou, Thane", coach: "Light Brog", popularity: 11 },
  "Juire": { location: "Dimonco, Vorell", coach: "Shark Obimovch", popularity: 12 },
  "Juniper": { location: "Sente, Thane", coach: "Sword Vacane", popularity: 13 }
};

// Contract data from Contract_Data.xlsx (711 season)
export const contractData: Record<string, {
  team: string;
  age: number;
  amount: string;
  contractThrough: number;
}> = {
  "Cascade Juner": { team: "Damage", age: 32, amount: "8.2 Million", contractThrough: 711 },
  "Nothing Sawryr": { team: "Gastro", age: 30, amount: "7.5 Million", contractThrough: 712 },
  "Mega Hawnnon": { team: "Dashlol", age: 29, amount: "6.5 Million", contractThrough: 712 },
  "Daredevil Gaffe": { team: "Qalf", age: 26, amount: "4.8 Million", contractThrough: 711 },
  "Bat Bornoil": { team: "Damage", age: 29, amount: "5.7 Million", contractThrough: 713 },
  "Zeus Ziki": { team: "Fadee", age: 32, amount: "4 Million", contractThrough: 711 },
  "Wraith Cunelly": { team: "Engery", age: 31, amount: "6.1 Million", contractThrough: 712 },
  "Sky Sunyer": { team: "Zemiga-Mar", age: 29, amount: "5.3 Million", contractThrough: 711 },
  "Vampire Ortez": { team: "Dashlol", age: 29, amount: "5.6 Million", contractThrough: 711 },
  "Heal Calofloure": { team: "Limium", age: 33, amount: "5 Million", contractThrough: 711 },
  "Pulse Farward": { team: "Engery", age: 30, amount: "5.8 Million", contractThrough: 713 },
  "Rem Asamtoy": { team: "Qalf", age: 29, amount: "4.5 Million", contractThrough: 713 },
  "Titan Aui": { team: "Limium", age: 28, amount: "3.7 Million", contractThrough: 713 },
  "Clipper Doznu": { team: "Varcity", age: 29, amount: "3 Million", contractThrough: 712 },
  "Fisher Cerzonal": { team: "Qalf", age: 31, amount: "2.4 Million", contractThrough: 711 },
  "Freeze Jagwiab": { team: "Fadee", age: 26, amount: "3.3 Million", contractThrough: 713 },
  "Killa Binbac": { team: "Juire", age: 33, amount: "1.5 Million", contractThrough: 711 },
  "Club Faxzin": { team: "Gastro", age: 28, amount: "1 Million", contractThrough: 711 },
  "Harsh Raii": { team: "AFE", age: 26, amount: "1.2 Million", contractThrough: 711 },
  "Horse Queanlend": { team: "Juire", age: 29, amount: "4.3 Million", contractThrough: 712 },
  "Cross Exzona": { team: "Dashlol", age: 27, amount: "4.7 Million", contractThrough: 712 },
  "Rocket Dalbale": { team: "Cal Hal", age: 25, amount: "3.9 Million", contractThrough: 714 },
  "Spring Cemet": { team: "Limium", age: 25, amount: "2.2 Million", contractThrough: 712 },
  "Totality Tryoe": { team: "Damage", age: 26, amount: "2.3 Million", contractThrough: 713 },
  "Guardian Garlim": { team: "Cal Hal", age: 27, amount: "3.2 Million", contractThrough: 713 },
  "Supernova Aloi": { team: "AFE", age: 31, amount: "1.8 Million", contractThrough: 711 }
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
    description: "Home to the legendary Pheonix Oliv dynasty of the 690s and Rain Lieryon's dominance in the early 700s. Dashlol represents legacy and excellence. The 711 roster features Mega Hawnnon, Vampire Ortez, and new addition Cross Exzona from Cal Hal.",
    notableAlumni: ["Pheonix Oliv", "Rain Lieryon", "Vampire Ortez", "Mega Hawnnon"],
    rivalTeams: ["Damage", "Varcity"]
  },
  "Engery": {
    founded: "Pre-680 Era",
    colors: "Green & White",
    description: "The Snow Masogoto era (691-695) established Engery as one of Corefall's elite franchises. Home to multiple CTT championships. Wraith Cunelly anchors the roster in 711, joined by new addition Pulse Farward who brings versatility to the team.",
    notableAlumni: ["Snow Masogoto", "Ball Ratyor", "Wraith Cunelly", "Zeus Ziki"],
    rivalTeams: ["Limium", "Damage"]
  },
  "Cal Hal": {
    founded: "Pre-680 Era",
    colors: "Orange & Navy",
    description: "A franchise defined by clutch performers, Cal Hal has produced multiple Apex champions including Splash Gradey (700) and Jungle Unovo (703, 706). With new additions Rocket Dalbale and Guardian Garlim in 711, the team looks to build a new contending core under coach Jungle Unovo.",
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
    description: "The Vibrant Yaul and Bulldoser Banwich eras cemented Limium as a historic power. Heal Calofloure's career-spanning dominance keeps them relevant today, and the 711 addition of Spring Cemet adds youth to the roster. Known for developing patient, endurance-focused fighters.",
    notableAlumni: ["Vibrant Yaul", "Bulldoser Banwich", "Heal Calofloure", "Cold Varuth", "Rolle Asikov"],
    rivalTeams: ["Engery", "Qalf"]
  },
  "Varcity": {
    founded: "Pre-680 Era",
    colors: "Purple & White",
    description: "A franchise with deep history, Varcity has produced legends like Pheonix Oliv (701 Apex), Mountain Granton, and Giga Lertown. The 711 roster features Clipper Doznu and new addition Pepper Teraa, looking to rebuild after Pulse Farward's departure.",
    notableAlumni: ["Pheonix Oliv", "Mountain Granton", "Giga Lertown", "Monster Piccoloo", "Blood Astur", "Pulse Farward"],
    rivalTeams: ["Dashlol", "Cal Hal"]
  },
  "AFE": {
    founded: "Pre-680 Era",
    colors: "Maroon & Silver",
    description: "A solid mid-tier franchise that occasionally produces top talent. The 711 roster features Harsh Raii and new acquisition Supernova Aloi from Gastro, adding firepower to the team.",
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
    colors: "Lime & Orange",
    description: "A franchise on the rise after landing star acquisition Zeus Ziki from Cal Hal in 711. With Zeus Ziki and Freeze Jagwiab, Fadee looks to challenge for contention in the coming seasons.",
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
