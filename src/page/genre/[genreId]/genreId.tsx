// pages/genre/[genreId]/genreId.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Tambahkan Link
import axios from "axios";
import { FaStar } from "react-icons/fa";
import BackButton from "../../../components/backbutton";
import Sidebar from "../../../components/Sidebar";

export default function GenreDetailPage() {
  const { genreId } = useParams();
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreAnime = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/otakudesu/genres/${genreId}`);
        setAnimeList(res.data.data.animeList);
      } catch (error) {
        console.error("Error fetching genre anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreAnime();
  }, [genreId]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Sidebar />
      <main className="mr-80 mt-15 p-6">
        <BackButton to="/genre" />
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 capitalize">{genreId} Anime</h2>
          <p className="text-gray-400">Daftar anime dengan genre {genreId}</p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {animeList.map((anime, index) => (
              <Link 
                to={`/anime/${anime.animeId}`} // Tambahkan Link navigasi
                key={index}
                className="bg-gray-800 w-54 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all"
              >
                <div className="relative">
                  <img
                    src={anime.poster}
                    alt={anime.title}
                    className="w-full h-56 object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/path/to/fallback-image.jpg';
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-500 text-xs px-2 py-0.5 rounded">
                    {anime.type}
                  </div>
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded flex items-center">
                    <FaStar className="text-black mr-1" /> {anime.score || "N/A"}
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs bg-gray-700 px-2 py-0.5 rounded mb-2 inline-block">
                    {anime.status}
                  </p>
                  <h3 className="font-medium text-sm leading-tight">{anime.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}