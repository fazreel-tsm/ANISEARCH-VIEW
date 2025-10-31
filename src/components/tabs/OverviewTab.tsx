import {
  PlayCircle,
  ClapperboardIcon,
  CalendarDays,
  Globe2,
} from "lucide-react";
import { formatDateToKL } from "../../utils/formatDateKL";
import { FaYoutube } from "react-icons/fa6";
import { SiCrunchyroll, SiNetflix } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";

interface OverviewTabProps {
  anime: any;
}

export default function OverviewTab({ anime }: OverviewTabProps) {
  const iconMap: Record<string, JSX.Element> = {
    youtube: <FaYoutube className="w-5 h-5 text-red-500" />,
    netflix: <SiNetflix className="w-5 h-5 text-[#E50914]" />,
    crunchyroll: <SiCrunchyroll className="w-5 h-5 text-orange-400" />,
    disney: <TbBrandDisney className="w-5 h-5 text-blue-400" />,
    default: <PlayCircle className="w-5 h-5 text-muted-foreground" />,
  };
  const infoItems = [
    { label: "Type", value: anime.type, icon: ClapperboardIcon },
    { label: "Episodes", value: anime.episodes, icon: PlayCircle },
    {
      label: "Aired",
      value: anime.aired?.from
        ? formatDateToKL(anime.aired?.from) +
          (formatDateToKL(anime.aired?.to) &&
            " - " + formatDateToKL(anime.aired?.to))
        : "N/A",
      icon: CalendarDays,
    },
    { label: "Status", value: anime.status, icon: Globe2 },
  ];

  return (
    <>
      {/* Info Grid */}
      <div className="my-9 grid grid-cols-2 gap-4 text-sm lg:grid-cols-4">
        {infoItems.map(
          (item) =>
            item.value && (
              <div key={item.label} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-header" />
                <div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="font-normal text-xs">{item.value}</p>
                </div>
              </div>
            )
        )}
      </div>

      {/* 🎬 Embedded Trailer */}
      {anime.trailer?.embed_url && (
        <>
          <div className="my-[50px] aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={anime.trailer.embed_url}
              title="Anime Trailer"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </>
      )}

      {/* Synopsis */}
      <h2 className="text-2xl font-bold mb-3">Synopsis</h2>
      <p className="whitespace-pre-wrap leading-relaxed text-text">
        {anime.synopsis || "No synopsis available."}
      </p>

      {/* Background */}
      {anime.background && (
        <>
          <h2 className="mt-9 text-2xl font-bold mb-3">Background</h2>
          <p className="whitespace-pre-wrap leading-relaxed text-foreground/80">
            {anime.background}
          </p>
        </>
      )}

      {/* Streaming */}
      {anime.streaming && anime.streaming.length > 0 && (
        <>
          <h2 className="mt-9 text-2xl font-bold mb-3">Stream</h2>
          <div className="flex flex-wrap gap-2 items-center">
            {anime.streaming.map((site: any) => {
              const url = site.url;
              const name = site.name.toLowerCase();

              const key =
                Object.keys(iconMap).find((k) => name.includes(k)) || "default";
              const icon = iconMap[key];

              return (
                <a
                  key={site.name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-tab hover:bg-tab-hover px-3 py-2 rounded-xl transition-transform backdrop-blur-lg hover:scale-105 shadow-md"
                >
                  {icon}
                  <span className="text-sm font-medium">{site.name}</span>
                </a>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
