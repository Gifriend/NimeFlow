// pages/genre/genre.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

type Genre = {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl: string;
};

export default function GenrePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/samehadaku/genres`);
        console.log("Genre response:", res.data);

        if (Array.isArray(res.data.data.genreList)) {
          setGenres(res.data.data.genreList);
        } else {
          console.warn("Genres is NOT an array!", typeof res.data.data);
        }
      } catch (err) {
        console.error("Error fetching genres:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
   <div className="bg-gray-900 text-white min-h-screen">
  <Sidebar />
  <main className="mr-64 mt-16 p-6">
    <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Daftar Genre</h2>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="grid grid-cols-5 gap-4">
        {genres.map((genre) => (
          <button
            key={genre.genreId}
            onClick={() => navigate(`/genre/${genre.genreId}`)}
            className="
              text-blue-400
              border
              border-blue-500
              rounded-md
              py-2
              transition-all
              duration-300
              hover:text-white
              hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            {genre.title}
          </button>
        ))}
      </div>
    )}
  </main>
</div>

  );
}
