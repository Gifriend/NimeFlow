import { useEffect, useState } from "react";
import axios from "axios";

const dayMap: Record<string, string> = {
  Monday: "Senin",
  Tuesday: "Selasa",
  Wednesday: "Rabu",
  Thursday: "Kamis",
  Friday: "Jumat",
  Saturday: "Sabtu",
  Sunday: "Minggu",
};

export default function DesktopAnimeScheduleApp() {
  const [scheduleData, setScheduleData] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/samehadaku/schedule`
        );

        const fetchedData = response.data.data.days;
        const transformedData: Record<string, any[]> = {};

        fetchedData.forEach((dayEntry: any) => {
          const dayName = dayMap[dayEntry.day] || dayEntry.day;
          transformedData[dayName] = dayEntry.animeList.map((anime: any) => ({
            title: anime.title,
            rating: parseFloat(anime.score),
            time: anime.estimation,
            image: anime.poster,
            episode: null, 
          }));
        });

        setScheduleData(transformedData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch schedule data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Jadwal</h2>
          <p className="text-gray-400">Weekly anime release schedule</p>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(scheduleData).map(([day, animes]) => (
              <div
                key={day}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500/50 transition-all hover:shadow-blue-500/10"
              >
                <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 px-4 py-3 border-b border-gray-700">
                  <h3 className="font-bold text-lg flex items-center">
                    <span className="mr-2">📅</span>
                    {day}
                  </h3>
                </div>
                <div className="p-4">
                  {animes.length > 0 ? (
                    <ul className="space-y-4">
                      {animes.map((anime, index) => (
                        <li
                          key={index}
                          className="flex gap-3 hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
                        >
                          <img
                            src={anime.image}
                            alt={anime.title}
                            className="w-12 h-16 object-cover rounded-md bg-gray-700"
                          />
                          <div>
                            <h4 className="font-medium">{anime.title}</h4>
                            <div className="flex items-center text-sm text-gray-400 mt-1">
                              <span className="flex items-center mr-3">
                                <span className="mr-1">🕒</span>
                                {anime.time}
                              </span>
                              <span className="flex items-center">
                                <span className="mr-1 text-yellow-500">⭐</span>
                                {anime.rating}
                              </span>
                            </div>
                            {anime.episode && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-blue-600/30 text-blue-300 rounded text-xs">
                                Episode {anime.episode}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center justify-center h-24 text-gray-500">
                      <p>No anime scheduled</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 px-6 py-2 text-xs text-gray-400 flex justify-between">
        <span>Status: Online</span>
        <span>Last updated: {new Date().toLocaleString("id-ID")}</span>
      </footer>
    </div>
  );
}
