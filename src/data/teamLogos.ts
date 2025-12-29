import damageLogo from "@/assets/teams/damage.png";
import energyLogo from "@/assets/teams/energy.png";
import qalfLogo from "@/assets/teams/qalf.png";
import gastroLogo from "@/assets/teams/gastro.png";
import limiumLogo from "@/assets/teams/limium.png";
import calhalLogo from "@/assets/teams/calhal.png";
import varcityLogo from "@/assets/teams/varcity.png";
import dashlolLogo from "@/assets/teams/dashlol.png";

export const teamLogos: Record<string, string> = {
  "Damage": damageLogo,
  "Energy": energyLogo,
  "Qalf": qalfLogo,
  "Gastro": gastroLogo,
  "Limium": limiumLogo,
  "Cal Hal": calhalLogo,
  "Varcity": varcityLogo,
  "Dashlol": dashlolLogo,
};

export function getTeamLogo(teamName: string): string | undefined {
  return teamLogos[teamName];
}
