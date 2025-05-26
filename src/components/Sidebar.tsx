// Sidebar.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Genre {
  title: string;
}

interface Anime {
  animeId: string;
  poster: string;
  title: string;
  releaseDate: string;
  genreList?: Genre[];
}

export default function Sidebar() {
  const [movieList, setMovieList] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await axios.get(`${apiUrl}/otakudesu/home`);
        const data = res.data?.data;

        setMovieList(data?.movie?.animeList || []);
      } catch (error) {
        console.error("Error fetching movie list:", error);
      }
    };

    fetchMovieList();
  }, []);

  return (
     <aside className="fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto hidden md:block z-40 space-y-4">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold text-white">Anime Movie</h3>
      <Link to="/movie" className="text-sm text-purple-400 hover:underline">
        More
      </Link>
    </div>
    {movieList.map((anime) => (
      <div
        key={anime.animeId}
        className="flex bg-gray-800 rounded-lg overflow-hidden shadow-md"
      >
        {/* Poster kiri */}
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
            <h4 className="text-sm font-semibold line-clamp-2 cursor-pointer text-white">
              {anime.title}
            </h4>
          </Link>
          <p className="text-xs text-gray-400">Release: {anime.releaseDate}</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {anime.genreList?.map((genre, i) => (
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
  );
}
