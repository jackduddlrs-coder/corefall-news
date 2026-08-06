import { defineMcp } from "@lovable.dev/mcp-js";
import getSeasonStandings from "./tools/get-season-standings";
import searchPlayers from "./tools/search-players";
import getPlayerProfile from "./tools/get-player-profile";
import getSeasonHistory from "./tools/get-season-history";
import getRosterMoves from "./tools/get-roster-moves";
import listFanLists from "./tools/list-fan-lists";

export default defineMcp({
  name: "corefall-news",
  title: "Corefall News",
  version: "0.1.0",
  instructions:
    "Tools for Corefall News, an archive of the Corefall esports scene. Use `search_players` to resolve a fighter name, `get_player_profile` for a full career breakdown, `get_season_standings` for a season's player and team tables, `get_season_history` for Apex/CTT/Season Star and major winners, `get_roster_moves` for transfers, and `list_fan_lists` for published fan-voted lists. All data is public.",
  tools: [
    searchPlayers,
    getPlayerProfile,
    getSeasonStandings,
    getSeasonHistory,
    getRosterMoves,
    listFanLists,
  ],
});
