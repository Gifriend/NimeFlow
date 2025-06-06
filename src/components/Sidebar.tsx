// Sidebar.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Anime {
  animeId: string;
  poster: string;
  title: string;
}

export default function Sidebar() {
  const [completedList, setCompletedList] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchCompletedList = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await axios.get(`${apiUrl}/otakudesu/completed`);
        const data = res.data?.data;
        setCompletedList(data?.animeList || []);
      } catch (error) {
        console.error("Error fetching completed list for sidebar:", error);
      }
    };

    fetchCompletedList();
  }, []);

  return (
    <aside className="fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto hidden md:block z-40 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Anime Completed</h3>
        <Link to="/completed" className="text-sm text-purple-400 hover:underline">
          More
        </Link>
      </div>
      {completedList.slice(0, 8).map((anime) => (
        <div
          key={anime.animeId}
          className="flex bg-gray-800 rounded-lg overflow-hidden shadow-md"
        >
          <Link to={`/anime/${anime.animeId}`} className="flex-shrink-0">
            <img
              src={anime.poster}
              alt={anime.title}
              className="w-24 h-32 object-cover"
            />
          </Link>
          <div className="p-3 flex flex-col justify-center flex-1">
            <Link to={`/anime/${anime.animeId}`} className="hover:underline">
              <h4 className="text-sm font-semibold line-clamp-3 cursor-pointer text-white">
                {anime.title}
              </h4>
            </Link>
          </div>
        </div>
      ))}
    </aside>
  );
}