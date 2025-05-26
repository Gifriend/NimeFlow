import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type AnimeItem = {
  title: string;
  animeId: string;
  href: string;
  otakudesuUrl: string;
};

type AnimeGroup = {
  startWith: string;
  animeList: AnimeItem[];
};

const AnimeList = () => {
  const [groupedAnime, setGroupedAnime] = useState<AnimeGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/otakudesu/anime`
        );

        const groups = Array.isArray(res.data.data.list) ? res.data.data.list : [];
        setGroupedAnime(groups);
      } catch (error) {
        console.error("Error fetching anime list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeList();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen relative">
        <main className="p-6 mr-64">
          <p>Loading anime list...</p>
        </main>
        {/* <Sidebar /> */}
      </div>
    );
  }

  if (groupedAnime.length === 0) {
    return (
      <div className="bg-gray-900 text-white min-h-screen relative">
        <main className="p-6 mr-64">
          <p>No anime found.</p>
        </main>
        {/* <Sidebar /> */}
      </div>
    );
  }

  const filteredGroups = groupedAnime
    .map((group) => ({
      ...group,
      animeList: group.animeList.filter((anime) =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((group) => group.animeList.length > 0);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex">
      {/* <Sidebar /> */}
      <main className="flex-1 p-6 mt-16 overflow-auto">
        <h2 className="text-2xl md:text-2xl font-bold mb-2">Anime List</h2>

        <input
          type="text"
          placeholder="Search anime list..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 p-2 w-full max-w-md rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        {filteredGroups.map((group, index) => (
          <div key={group.startWith}>
            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">{group.startWith}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
                {group.animeList.map((anime) => (
                  <Link
                    key={anime.animeId}
                    to={`/anime/${anime.animeId}`}
                    className="p-1 rounded transition block text-sm md:text-base text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-600">
                    {anime.title}
                  </Link>
                ))}
              </div>
            </section>
            {index < filteredGroups.length - 1 && (
              <hr className="border-t border-gray-700 mb-6" />
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default AnimeList;
