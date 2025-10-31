import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import { getAnimeById } from "../api/jikan";
import { Star, ImageOff } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { ratingColor } from "../utils/ratingColor";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import NotFoundPage from "./NotFoundPage";
import OverviewTab from "../components/tabs/OverviewTab";
import CharactersTab from "../components/tabs/CharactersTab";
import StaffTab from "../components/tabs/StaffTab";
import { TabButton } from "../components/ui/TabButton";
import { LoadingScreen } from "../components/LoadingScreen";

export default function DetailPage() {
  const { idSlug } = useParams();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!idSlug) return;
    setLoading(true);
    const id = idSlug.split("-")[0];
    getAnimeById(Number(id))
      .then((r) => setAnime(r.data))
      .catch((e) => {
        console.error(e);
        setError(e?.message || "Failed to load");
      })
      .finally(() => setLoading(false));
  }, [idSlug]);

  useEffect(() => {
    if (anime?.title) {
      document.title = `${anime.title_english || anime.title} - Anime Search`;

      const description = anime.background?.trim() || "Anime";

      let metaDesc = document.querySelector('meta[name="description"]');

      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }

      metaDesc.setAttribute("content", description);
    }
  }, [anime]);

  if (loading) return <LoadingScreen />;

  if (error?.includes("404")) {
    return <NotFoundPage />;
  }

  if (!anime) return null;

  const imageUrl =
    anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url;

  return (
    <div>
      <Header />
      <main className="container mx-auto max-w-6xl px-4 pt-4 pb-10 font-headline">
        <Link
          to="/"
          className="inline-block mb-4 text-sm text-primary hover:scale-105 transition"
        >
          ← Back
        </Link>

        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Left Section (Poster + Rating) */}
          <div className="md:col-span-1 lg:col-span-1">
            <div className="sticky top-24">
              {/* Poster */}
              {!imageError && imageUrl ? (
                <img
                  src={imageUrl}
                  alt={anime.title}
                  onError={() => setImageError(true)}
                  className="w-full rounded-lg shadow-xl object-cover"
                />
              ) : (
                <div className="w-full aspect-[2/3] flex flex-col items-center justify-center rounded-lg bg-tab shadow-lg">
                  <ImageOff className="w-10 h-10 mb-2 opacity-60" />
                  <span className="text-sm opacity-70">No image available</span>
                </div>
              )}

              {/* Score */}
              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="flex flex-col items-center text-sm text-text bg-tab-hover px-2 rounded-md">
                  <span className="flex items-center gap-1">
                    <span
                      className={`flex items-center gap-1 ${ratingColor(anime?.score)}`}
                    >
                      <Star className="h-3 w-3 inline-block" />
                      {anime?.score ? anime?.score.toFixed(2) : "N/A"}
                    </span>
                    {anime?.score && " / 10"}
                  </span>
                </div>
              </div>

              {/* More info */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {anime.rank !== null && anime.rank !== 0 && (
                  <Badge>Rank #{anime.rank}</Badge>
                )}
                {anime.popularity !== null && anime.popularity !== 0 && (
                  <Badge>Popularity #{anime.popularity}</Badge>
                )}
                {anime.members !== null && anime.members > 0 && (
                  <Badge>{anime.members.toLocaleString()} members</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Right Section (Details) */}
          <div className="md:col-span-2 lg:col-span-3">
            <h1 className="text-3xl font-bold lg:text-4xl mb-1">
              {anime.title_english || anime.title}
            </h1>
            <p className="mb-4 text-lg text-muted-foreground">
              {anime.title_japanese} {anime.year && `(${anime.year})`}
              {anime.studios?.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-2">
                  {anime.studios.map((studio: any) => (
                    <Badge key={studio.mal_id} variant="outline">
                      {studio.name}
                    </Badge>
                  ))}
                </div>
              )}
            </p>

            {/* Genres */}
            {anime.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre: any) => (
                  <Badge key={genre.mal_id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            )}

            <div className="w-full h-px mt-10 bg-border" />

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 my-6">
              {["overview", "characters", "staff"].map((tab) => (
                <TabButton
                  key={tab}
                  label={tab.charAt(0).toUpperCase() + tab.slice(1)}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                />
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "overview" && <OverviewTab anime={anime} />}
              {activeTab === "characters" && <CharactersTab animeId={anime.mal_id} /> }
              {activeTab === "staff" && <StaffTab animeId={anime.mal_id} />}
            </div>
          </div>
        </div>
      </main>

      <ScrollToTopButton />
    </div>
  );
}
