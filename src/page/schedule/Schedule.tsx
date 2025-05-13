import { useState } from "react";

// Desktop App with horizontal navbar for NimeFlow
export default function DesktopAnimeScheduleApp() {
  // State management
  const [scheduleData] = useState({
    Senin: [
      {
        title: "One Piece",
        episode: 1085,
        rating: 9.5,
        time: "19:30",
        image: "/api/placeholder/80/120",
      },
      {
        title: "Demon Slayer",
        episode: 22,
        rating: 9.2,
        time: "22:00",
        image: "/api/placeholder/80/120",
      },
    ],
    Selasa: [
      {
        title: "One Piece",
        episode: 1086,
        rating: 9.5,
        time: "19:30",
        image: "/api/placeholder/80/120",
      },
      {
        title: "Jujutsu Kaisen",
        episode: 15,
        rating: 9.3,
        time: "20:00",
        image: "/api/placeholder/80/120",
      },
    ],
    Rabu: [
      {
        title: "One Piece",
        episode: 1087,
        rating: 9.5,
        time: "19:30",
        image: "/api/placeholder/80/120",
      },
      {
        title: "Spy x Family",
        episode: 28,
        rating: 9.1,
        time: "21:00",
        image: "/api/placeholder/80/120",
      },
    ],
    Kamis: [
      {
        title: "One Piece",
        episode: 1088,
        rating: 9.5,
        time: "19:30",
        image: "/api/placeholder/80/120",
      },
      {
        title: "My Hero Academia",
        episode: 8,
        rating: 8.9,
        time: "21:00",
        image: "/api/placeholder/80/120",
      },
    ],
    Jumat: [
      {
        title: "One Piece",
        episode: 1089,
        rating: 9.5,
        time: "19:30",
        image: "/api/placeholder/80/120",
      },
      {
        title: "Chainsaw Man",
        episode: 5,
        rating: 9.4,
        time: "22:30",
        image: "/api/placeholder/80/120",
      },
    ],
    Sabtu: [
      {
        title: "One Piece",
        episode: 1090,
        rating: 9.5,
        time: "19:30",
        image: "/api/placeholder/80/120",
      },
      {
        title: "Attack on Titan",
        episode: 12,
        rating: 9.7,
        time: "23:00",
        image: "/api/placeholder/80/120",
      },
      {
        title: "Dragon Ball Super",
        episode: 42,
        rating: 8.8,
        time: "20:00",
        image: "/api/placeholder/80/120",
      },
    ],
    Minggu: [
      {
        title: "One Piece",
        episode: 1091,
        rating: 9.5,
        time: "19:30",
        image: "/api/placeholder/80/120",
      },
      {
        title: "Bleach",
        episode: 367,
        rating: 9.3,
        time: "18:00",
        image: "/api/placeholder/80/120",
      },
    ],
  });


  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Main Content Area */}
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Jadwal</h2>
          <p className="text-gray-400">Weekly anime release schedule</p>
        </div>

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
      </main>

      {/* Status Bar */}
      <footer className="bg-gray-800 border-t border-gray-700 px-6 py-2 text-xs text-gray-400 flex justify-between">
        <span>Status: Online</span>
        <span>Last updated: 12 May 2025, 14:30</span>
      </footer>
    </div>
  );
}
