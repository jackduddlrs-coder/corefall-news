import { apexDetailed, seasons } from "./corefallData";

/**
 * Compute pre-700 (years 679-699) Apex Championship years for a given player.
 * Source: apexDetailed (winner only).
 */
export function getPre700ApexWinYears(playerName: string): number[] {
  return apexDetailed
    .filter(a => a.year >= 679 && a.year <= 699 && a.win === playerName)
    .map(a => a.year)
    .sort((a, b) => a - b);
}

/**
 * Compute pre-700 (years 679-699) CTT title years for a given player.
 * Rule (per user spec): a player earns a CTT title for year Y if they made
 * the Apex Finals that year (winner OR loser) AND their team that year is
 * the CTT-winning team for year Y.
 */
export function getPre700CttWinYears(playerName: string): number[] {
  const years: number[] = [];
  for (const a of apexDetailed) {
    if (a.year < 679 || a.year > 699) continue;
    const seasonRow = seasons.find(s => s.year === a.year);
    if (!seasonRow) continue;
    const cttTeam = seasonRow.ctt;
    if (a.win === playerName && a.wTeam === cttTeam) {
      years.push(a.year);
      continue;
    }
    if (a.lose === playerName && a.lTeam === cttTeam) {
      years.push(a.year);
    }
  }
  return years.sort((x, y) => x - y);
}
