import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Completed() {
  const [completedAnimeData, setCompletedAnimeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]); 

  useEffect(() => {
    const fetchCompletedAnime = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/samehadaku/completed`,
          {
            params: {
              page: currentPage,
            },
          }
        );

        console.log("Response API:", res.data);

        setCompletedAnimeData(res.data.data.animeList);
        setTotalPages(res.data.pagination.totalPages); 
      } catch (error) {
        console.error("Error fetching completed anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedAnime();
  }, [currentPage]);

  useEffect(() => {
    const pageLimit = 5; 
    const startPage = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
    const endPage = Math.min(startPage + pageLimit - 1, totalPages);
    const newPageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
    setPageNumbers(newPageNumbers);
  }, [currentPage, totalPages]);

  // Fungsi untuk berpindah halaman
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Sidebar />

      <main className="mr-64 mt-16 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Anime Selesai Tayang</h2>
          <p className="text-gray-400">Daftar anime yang sudah tamat dan selesai penayangan</p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="grid grid-cols-5 gap-4">
              {completedAnimeData.map((anime, index) => (
                 <Link to={`/anime/${anime.animeId}`} key={index} className="block" >
                <div
                  className="bg-gray-800 w-56 h-full rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all"
                >
                  <div className="relative">
                    <img
                      src={anime.poster}
                      alt={anime.title}
                      className="w-full h-74 object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
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
                    <div className="absolute bottom-2 left-2 bg-gray-800/80 text-white text-[10px] px-2 py-0.5 rounded">
                    {anime.status}
                  </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm leading-tight">{anime.title}</h3>
                  </div>
                </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 bg-gray-800 text-white rounded-l-md disabled:opacity-50"
              >
                Prev
              </button>

              {/* Nomor halaman yang bisa diklik */}
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 bg-gray-800 text-white ${pageNumber === currentPage ? 'bg-purple-500' : ''} hover:bg-purple-600`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 bg-gray-800 text-white rounded-r-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
