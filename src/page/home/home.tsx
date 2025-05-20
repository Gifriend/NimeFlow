import { useEffect, useState } from "react";
import axios from "axios";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { FaPlay, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface AnimeItem {
  title: string;
  poster: string;
  episodes?: string;
  releasedOn?: string;
  animeId: string;
  href: string;
  type?: string;
  status?: string;
  score?: string;
    releaseDate: string; // ini wajib karena di response ada
  genreList: { title: string }[]; // array genre
  samehadakuUrl?: string;
}

export default function HomePage() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [batchList, setBatchList] = useState<AnimeItem[]>([]);
  const [movieList, setMovieList] = useState<AnimeItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  const fetchData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await axios.get(`${apiUrl}/samehadaku/home`);
      const data = res.data?.data;

      console.log("API Response:", data);

      setAnimeList(data?.recent?.animeList || []);
      setBatchList(data?.batch?.batchList || []);
      setMovieList(data?.movie?.animeList || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  fetchData();
}, []);


  useEffect(() => {
    if (animeList.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animeList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [animeList]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % animeList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + animeList.length) % animeList.length);
  };

  if (animeList.length === 0) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 pt-20 pb-10">
      {/* Slider */}
      <div className="relative max-w-7xl mx-auto w-full overflow-hidden mb-10">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {animeList.map((anime) => (
            <div
              key={anime.animeId}
              className="w-full flex-shrink-0 flex"
              style={{ minWidth: "100%" }}
            >
              <div className="flex-1 p-6 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">{anime.title}</h2>
                <p className="text-lg mb-2">Episode: {anime.episodes}</p>
                <p className="text-sm text-gray-400 mb-6">Rilis: {anime.releasedOn}</p>
                <a
                  href={anime.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-30 bg-gradient-to-r from-blue-600 to-purple-500 hover:bg-purple-700 transition px-5 py-2 rounded-full text-white font-semibold"
                >
                  <FaPlay size={14} />
                  Tonton
                </a>
              </div>
              <div className="flex-1">
                <img
                  src={anime.poster}
                  alt={anime.title}
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
          <button onClick={handlePrev} className="bg-black/40 p-2 rounded-full hover:bg-opacity-75">
            <BiLeftArrowAlt size={28} />
          </button>
          <button onClick={handleNext} className="bg-black/40 p-2 rounded-full hover:bg-opacity-75">
            <BiRightArrowAlt size={28} />
          </button>
        </div>
      </div>

       <div className="max-w-7xl mx-auto border-b border-gray-700 mb-10"></div>

      {/* Main Content Below Slider */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left 3/4 section */}
        <div className="lg:col-span-3 space-y-12">
          {/* Episode Terbaru */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Episode Terbaru</h3>
              <button className="text-sm text-purple-400 hover:underline">More</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  {animeList.length > 0 ? (
    animeList.map((anime, index) => (
      <Link
        to={`/anime/${anime.animeId}`}
        key={index}
        className="block rounded-lg overflow-hidden shadow-lg hover:shadow-purple-400/50 transition"
      >
        <img
          src={anime.poster}
          alt={anime.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-2">
          <h3 className="text-sm font-semibold truncate">{anime.title}</h3>
          <p className="text-xs text-gray-500">{anime.releasedOn}</p>
        </div>
      </Link>
    ))
  ) : (
    <p className="text-sm text-gray-400">Tidak ada episode terbaru.</p>
  )}
</div>
          </section>

          {/* Batch Download */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Download Batch</h3>
              <button className="text-sm text-purple-400 hover:underline">More</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {batchList.map((anime) => (
                <AnimeCard key={anime.animeId} anime={anime} />
              ))}
            </div>
          </section>
        </div>

        {/* Anime Movie Sidebar */}
<aside className="space-y-4">
  <h3 className="text-xl font-semibold mb-4">Anime Movie</h3>
  {movieList.map((anime) => (
    <div
      key={anime.animeId}
      className="flex bg-gray-800 rounded-lg overflow-hidden shadow-md"
    >
      {/* Poster kiri dengan link */}
      <Link to={`/anime/${anime.animeId}`} className="flex-shrink-0">
        <img
          src={anime.poster}
          alt={anime.title}
          className="w-24 h-32 object-cover"
        />
      </Link>
      
      {/* Detail kanan */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <Link to={`/anime/${anime.animeId}`} className="hover:underline">
          <h4 className="text-sm font-semibold line-clamp-2 cursor-pointer">{anime.title}</h4>
        </Link>
        <p className="text-xs text-gray-400">Release: {anime.releaseDate}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {anime.genreList?.map((genre: { title: string }, i: number) => (
            <span
              key={i}
              className="bg-blue-600 text-xs px-2 py-0.5 rounded-full"
            >
              {genre.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  ))}
</aside>
      </div>
    </div>
  );
}

// Reusable anime card
function AnimeCard({ anime }: { anime: AnimeItem }) {
  return (
    <div className="bg-gray-800 w-full rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all">
      <div className="relative">
        <img
          src={anime.poster}
          alt={anime.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/fallback.jpg";
          }}
        />
        {anime.type && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-500 text-xs px-2 py-0.5 rounded">
            {anime.type}
          </div>
        )}
        {anime.score && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded flex items-center">
            <FaStar className="text-black mr-1" /> {anime.score}
          </div>
        )}
        {anime.status && (
          <div className="absolute bottom-2 right-2 bg-gray-900/70 text-white text-xs px-2 py-0.5 rounded">
            {anime.status}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm leading-tight line-clamp-2">{anime.title}</h3>
      </div>
    </div>
  );
}
