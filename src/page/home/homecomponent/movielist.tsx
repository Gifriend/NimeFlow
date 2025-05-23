import { useEffect, useRef, useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

const MovieList = () => {
  const [movieList, setMovieList] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await axios.get(`${apiUrl}/samehadaku/movies`);
        setMovieList(res.data.data.animeList);
      } catch (error) {
        console.error("Error fetching movie list", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mt-12">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Movie</h3>
        <Link to="/movie" className="text-sm text-purple-400 hover:underline">
          More
       </Link>
      </div>
      <div className="relative">
        {/* Panah kiri */}
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: -450, behavior: 'smooth' })}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        >
          <BiLeftArrowAlt size={24} />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth px-8"
        >
          {movieList.slice(0, 15).map((anime) => (
            <Link
              to={`/anime/${anime.animeId}`}
              key={anime.animeId}
              className="flex-shrink-0 w-40 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-400/50 transition"
            >
              <div className="relative">
                <img
                  src={anime.poster}
                  alt={anime.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-500 text-xs px-2 py-0.5 rounded">
                 {anime.type}
                </div>
                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded flex items-center">
                 <FaStar className="text-black mr-1" /> {anime.score || "N/A"}
                </div>
                <div className="absolute bottom-2 left-2 bg-gray-800/80 text-white text-[10px] px-2 py-0.5 rounded">
                 {anime.status}
                </div>
              </div>
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{anime.title}</h3>
                <p className="text-xs text-gray-500">{anime.releasedOn}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Panah kanan */}
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: 450, behavior: 'smooth' })}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        >
          <BiRightArrowAlt size={24} />
        </button>
      </div>
    </section>
  );
};

export default MovieList;
