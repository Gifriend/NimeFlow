import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';

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
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-purple-500 border-t-transparent`}></div>
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
  console.log('HomePage component mounted');
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

        // Pastikan URL benar dengan menambahkan debug log
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/otakudesu/home`;
        console.log('Fetching data from:', apiUrl);

        const response = await axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('API Response:', response);

        // Periksa struktur respons
        if (!response.data || !response.data.data) {
          throw new Error('Invalid API response structure');
        }

        const homeData = response.data.data;
        console.log('Home data:', homeData);

        const ongoing = homeData.ongoing?.animeList || [];
        const completed = homeData.completed?.animeList || [];

        console.log('Ongoing Anime count:', ongoing.length);
        console.log('Completed Anime count:', completed.length);

        setOngoingAnime(ongoing);
        setCompletedAnime(completed);
      } catch (error) {
        console.error('Error fetching data:', error);

        // Tambahkan informasi error lebih detail
        if (axios.isAxiosError(error)) {
          const errorDetails = {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          };
          console.error('Axios error details:', errorDetails);
          setError(
            `API Error: ${error.message} - Status: ${error.response?.status}`
          );
        } else if (error instanceof Error) {
          setError(`Error: ${error.message}`);
        } else {
          setError('Unknown error occurred');
        }
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
    }, 4000);

    return () => clearInterval(interval);
  }, [ongoingAnime]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ongoingAnime.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + ongoingAnime.length) % ongoingAnime.length
    );
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
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition">
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
        <div className="relative w-full max-w-7xl mx-auto mb-10 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {ongoingAnime.map((anime) => (
              <div
                key={anime.animeId}
                className="w-full flex-shrink-0"
                style={{ minWidth: '100%' }}
              >
                <div className="flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-6">
                  <div className="flex-1 order-2 md:order-1 text-center md:text-left">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-3">{anime.title}</h2>
                    <p className="text-base lg:text-lg mb-2">
                      Episode: {anime.episodes || '-'}
                    </p>
                    <p className="text-sm text-gray-400 mb-2">
                      Hari Rilis: {anime.releaseDay || '-'}
                    </p>
                    <p className="text-sm text-gray-400 mb-5">
                      Terbaru: {anime.latestReleaseDate || '-'}
                    </p>
                    <Link
                      to={`/anime/${encodeURIComponent(anime.animeId)}`}
                      key={anime.animeId}
                      className="inline-flex items-center gap-2 w-auto bg-gradient-to-r from-blue-600 to-purple-500 hover:bg-purple-700 transition px-5 py-2 rounded-full text-white font-semibold"
                    >
                      <Play size={14} />
                      Tonton
                    </Link>
                  </div>
                  <div className="flex-shrink-0 order-1 md:order-2">
                    <img
                      src={anime.poster}
                      alt={anime.title}
                      className="w-48 sm:w-64 lg:w-80 h-auto rounded-2xl object-cover shadow-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Navigasi Slider */}
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
          </div>
          {ongoingAnime.length > 0 ? (
            <div className="relative">
              <button
                onClick={() =>
                  scrollRef.current?.scrollBy({
                    left: -450,
                    behavior: 'smooth',
                  })
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition">
                <ChevronLeft size={24} />
              </button>
              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-5 scrollbar-hide scroll-smooth px-8">
                {ongoingAnime.map((anime) => (
                  <Link
                    to={`/anime/${encodeURIComponent(anime.animeId)}`}
                    key={anime.animeId}
                    className="flex-shrink-0 w-44 md:w-52 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-400/50 transition-all group">
                    <div className="relative">
                      <img
                        src={anime.poster}
                        alt={anime.title}
                        className="w-full aspect-[2/3] object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-500 text-xs text-white px-2 py-0.5 rounded">
                        Ep {anime.episodes || '?'}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm md:text-base font-semibold truncate group-hover:text-purple-400 transition">
                        {anime.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {anime.releaseDay || '-'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {anime.latestReleaseDate || '-'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <button
                onClick={() =>
                  scrollRef.current?.scrollBy({
                    left: 450,
                    behavior: 'smooth',
                  })
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition">
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
            </div>
            {completedAnime.length > 0 ? (
              <div className="relative">
                <button
                  onClick={() =>
                    scrollRef.current?.scrollBy({ 
                      left: -450,
                      behavior: 'smooth',
                    })
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition">
                  <ChevronLeft size={24} />
                </button>
                <div
                  ref={scrollRef}
                  className="flex overflow-x-auto gap-5 scrollbar-hide scroll-smooth px-8">
                  {completedAnime.map((anime) => (
                    <Link
                      to={`/anime/${encodeURIComponent(anime.animeId)}`}
                      key={anime.animeId}
                      className="flex-shrink-0 w-44 md:w-52 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-400/50 transition-all group">
                      <div className="relative">
                        <img
                          src={anime.poster}
                          alt={anime.title}
                          className="w-full aspect-[2/3] object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-500 text-xs text-white px-2 py-0.5 rounded">
                          Ep {anime.episodes || '?'}
                        </div>
                        <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                          ⭐ {anime.score || '?'}
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm md:text-base font-semibold truncate group-hover:text-purple-400 transition">
                          {anime.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {anime.lastReleaseDate || '-'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <button
                  onClick={() =>
                    scrollRef.current?.scrollBy({
                      left: 450,
                      behavior: 'smooth',
                    })
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition">
                  <ChevronRight size={24} />
                </button>
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
              <div
                key={anime.animeId}
                className="flex bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <Link
                  to={`/anime/${anime.animeId}`}
                  key={anime.animeId}
                  className="flex-shrink-0">
                  <img
                    src={anime.poster}
                    alt={anime.title}
                    className="w-24 h-32 object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="p-3 flex flex-col justify-between flex-1">
                  <a
                    href={`/anime/${anime.animeId}`}
                    key={anime.animeId}
                    className="hover:underline">
                    <h4 className="text-sm font-semibold line-clamp-2 cursor-pointer">
                      {anime.title}
                    </h4>
                  </a>
                  <div className="mt-2">
                    <p className="text-xs text-gray-400">
                      Episodes: {anime.episodes || '-'}
                    </p>
                    <p className="text-xs text-gray-400">
                      Completed: {anime.lastReleaseDate || '-'}
                    </p>
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
