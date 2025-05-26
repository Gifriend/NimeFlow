import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface AnimeItem {
  title: string;
  poster: string;
  episodes?: string | number;
  releaseDay?: string;
  latestReleaseDate?: string;
  lastReleaseDate?: string;
  animeId: string;
  href: string;
  score?: string;
  otakudesuUrl?: string;
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({ size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-purple-500 border-t-transparent`}></div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="bg-gray-900 text-white min-h-screen px-6 pt-20 pb-10">
    {/* Slider Skeleton */}
    <div className="relative max-w-7xl mx-auto w-full overflow-hidden mb-10">
      <div className="w-full flex animate-pulse">
        <div className="flex-1 p-6 flex flex-col justify-center">
          <div className="h-8 bg-gray-700 rounded mb-4 w-3/4"></div>
          <div className="h-6 bg-gray-700 rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded mb-6 w-1/3"></div>
          <div className="h-10 bg-gray-700 rounded w-32"></div>
        </div>
        <div className="flex-1">
          <div className="w-full h-96 bg-gray-700 rounded-2xl"></div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto border-b border-gray-700 mb-10" />

    {/* Content Skeleton */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4 w-1/4"></div>
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-40">
                <div className="w-full h-56 bg-gray-700 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <aside className="space-y-4 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex bg-gray-800 rounded-lg overflow-hidden">
            <div className="w-24 h-32 bg-gray-700"></div>
            <div className="p-3 flex-1">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </aside>
    </div>
  </div>
);

export default function HomePage() {
  const [ongoingAnime, setOngoingAnime] = useState<AnimeItem[]>([]);
  const [completedAnime, setCompletedAnime] = useState<AnimeItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Replace this URL with your actual API endpoint
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/otakudesu/home`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        const homeData = result?.data;

        if (!homeData) {
          throw new Error("Data is undefined.");
        }

        const ongoing = homeData.ongoing?.animeList || [];
        const completed = homeData.completed?.animeList || [];

        setOngoingAnime(ongoing);
        setCompletedAnime(completed);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (ongoingAnime.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ongoingAnime.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ongoingAnime]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ongoingAnime.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ongoingAnime.length) % ongoingAnime.length);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-gray-900 text-white min-h-screen px-6 pt-20 pb-10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error Loading Data</div>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (ongoingAnime.length === 0 && completedAnime.length === 0) {
    return (
      <div className="bg-gray-900 text-white min-h-screen px-6 pt-20 pb-10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">No Data Available</div>
          <p className="text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 pt-20 pb-10">
      {/* Slider - Using ongoing anime */}
      {ongoingAnime.length > 0 && (
        <div className="relative max-w-7xl mx-auto w-full overflow-hidden mb-10">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {ongoingAnime.slice(0, 8).map((anime) => (
              <div
                key={anime.animeId}
                className="w-full flex-shrink-0 flex"
                style={{ minWidth: "100%" }}
              >
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-4">{anime.title}</h2>
                  <p className="text-lg mb-2">Episode: {anime.episodes || "-"}</p>
                  <p className="text-sm text-gray-400 mb-2">
                    Release Day: {anime.releaseDay || "-"}
                  </p>
                  <p className="text-sm text-gray-400 mb-6">
                    Latest: {anime.latestReleaseDate || "-"}
                  </p>
                  <a
                    href={`/anime/${anime.animeId}`}
                    className="inline-flex items-center gap-2 w-30 bg-gradient-to-r from-blue-600 to-purple-500 hover:bg-purple-700 transition px-5 py-2 rounded-full text-white font-semibold"
                  >
                    <Play size={14} />
                    Tonton
                  </a>
                </div>
                <div className="flex-1">
                  <img
                    src={anime.poster}
                    alt={anime.title}
                    className="w-full h-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
            <button 
              onClick={handlePrev} 
              className="bg-black/40 p-2 rounded-full hover:bg-opacity-75 transition"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={handleNext} 
              className="bg-black/40 p-2 rounded-full hover:bg-opacity-75 transition"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto border-b border-gray-700 mb-10" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left section */}
        <div className="lg:col-span-3 space-y-12">
          {/* Ongoing Anime */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Anime Ongoing</h3>
              <a href="#" className="text-sm text-purple-400 hover:underline">More</a>
            </div>
            {ongoingAnime.length > 0 ? (
              <div className="relative">
                <button
                  onClick={() => scrollRef.current?.scrollBy({ left: -450, behavior: 'smooth' })}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronLeft size={24} />
                </button>
                <div ref={scrollRef} className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth px-8">
                  {ongoingAnime.map((anime) => (
                    <a
                      href={`/anime/${anime.animeId}`}
                      key={anime.animeId}
                      className="flex-shrink-0 w-40 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-400/50 transition"
                    >
                      <div className="relative">
                        <img 
                          src={anime.poster} 
                          alt={anime.title} 
                          className="w-full h-56 object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-500 text-xs text-white px-2 py-0.5 rounded">
                          Ep {anime.episodes || "?"}
                        </div>
                      </div>
                      <div className="p-2">
                        <h3 className="text-sm font-semibold truncate">{anime.title}</h3>
                        <p className="text-xs text-gray-500">{anime.releaseDay || "-"}</p>
                        <p className="text-xs text-gray-400">{anime.latestReleaseDate || "-"}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <button
                  onClick={() => scrollRef.current?.scrollBy({ left: 450, behavior: 'smooth' })}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <LoadingSpinner />
                <p className="mt-2">Loading ongoing anime...</p>
              </div>
            )}
          </section>

          {/* Completed Anime Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Anime Completed</h3>
              <a href="#" className="text-sm text-purple-400 hover:underline">More</a>
            </div>
            {completedAnime.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {completedAnime.slice(0, 8).map((anime) => (
                  <a
                    href={`/anime/${anime.animeId}`}
                    key={anime.animeId}
                    className="rounded-lg overflow-hidden shadow-lg hover:shadow-purple-400/50 transition group"
                  >
                    <div className="relative">
                      <img 
                        src={anime.poster} 
                        alt={anime.title} 
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-green-600 text-xs text-white px-2 py-0.5 rounded">
                        Completed
                      </div>
                      {anime.score && (
                        <div className="absolute top-2 right-2 bg-yellow-600 text-xs text-white px-2 py-0.5 rounded">
                          ⭐ {anime.score}
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-gray-800">
                      <h3 className="text-sm font-semibold line-clamp-2 mb-1">{anime.title}</h3>
                      <p className="text-xs text-gray-400">{anime.episodes} Episodes</p>
                      <p className="text-xs text-gray-500">{anime.lastReleaseDate || "-"}</p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <LoadingSpinner />
                <p className="mt-2">Loading completed anime...</p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar - Featured Completed Anime */}
        <aside className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Featured Completed</h3>
          {completedAnime.length > 0 ? (
            completedAnime.slice(0, 6).map((anime) => (
              <div key={anime.animeId} className="flex bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <a 
                  href={`/anime/${anime.animeId}`} 
                  className="flex-shrink-0"
                >
                  <img 
                    src={anime.poster} 
                    alt={anime.title} 
                    className="w-24 h-32 object-cover"
                    loading="lazy"
                  />
                </a>
                <div className="p-3 flex flex-col justify-between flex-1">
                  <a 
                    href={`/anime/${anime.animeId}`} 
                    className="hover:underline"
                  >
                    <h4 className="text-sm font-semibold line-clamp-2 cursor-pointer">{anime.title}</h4>
                  </a>
                  <div className="mt-2">
                    <p className="text-xs text-gray-400">Episodes: {anime.episodes || "-"}</p>
                    <p className="text-xs text-gray-400">Completed: {anime.lastReleaseDate || "-"}</p>
                    {anime.score && (
                      <div className="mt-1 inline-block bg-yellow-600 text-xs px-2 py-0.5 rounded-full">
                        ⭐ {anime.score}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <LoadingSpinner size="sm" />
              <p className="mt-2 text-sm">Loading...</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}