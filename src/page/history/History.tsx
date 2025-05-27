import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import { format } from 'date-fns'; // Tambahkan date-fns untuk formatting tanggal

const HistoryScreen: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => Cookies.get('token');

  // Format tanggal tontonan
  const formatWatchedDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy '•' HH:mm");
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = getToken();
        if (!token) throw new Error("No token found");

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/otakudesu/history`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const historyData = res.data.data;
        
        const episodes = await Promise.all(
          historyData.map(async (item: any) => {
            const episodeRes = await axios.get(
              `${import.meta.env.VITE_API_BASE_URL}/otakudesu/episode/${item.episodeId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            
            return {
              ...item,
              title: episodeRes.data.data.title,
              formattedEpisode: item.episodeId
                .replace(/-/g, ' ')
                .replace(/(episode)/i, 'Episode')
                .replace(/sub indo/i, ''),
              formattedDate: formatWatchedDate(item.watchedAt)
            };
          })
        );

        setHistory(episodes);
      } catch (error) {
        console.error("Failed to fetch history:", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          window.location.href = '/';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="pt-20 px-4 md:px-8 lg:px-16 bg-gray-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">Riwayat Tontonan</h1>
        
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-800 rounded-lg"></div>
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-2xl text-gray-400 mb-4">📺</div>
            <p className="text-gray-400">Belum ada riwayat tontonan</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {history.map((item) => (
              <Link
                to={`/episode/${item.episodeId}`}
                key={item.id}
                className="group block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-200 shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-300 group-hover:text-blue-200 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                      <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs">
                        {item.formattedEpisode}
                      </span>
                      <span>•</span>
                      <span>{item.formattedDate}</span>
                    </div>
                  </div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-gray-400 group-hover:text-blue-400 transition-colors" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;