import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaStar } from 'react-icons/fa';

export default function DesktopOngoingAnimeApp() {
  const [ongoingAnimeData] = useState([
    {
      title: "#Compass 2.0 Animation Project",
      rating: 5.31,
      image: "/api/placeholder/300/400?text=Compass",
    },
    {
      title: "Summer Pockets",
      rating: 7.20,
      image: "/api/placeholder/300/400?text=Summer+Pockets",
    },
    {
      title: "One Piece",
      rating: 9.50,
      image: "/api/placeholder/300/400?text=One+Piece",
    },
    {
      title: "Jujutsu Kaisen",
      rating: 8.90,
      image: "/api/placeholder/300/400?text=Jujutsu+Kaisen",
    },
    {
      title: "Demon Slayer",
      rating: 9.10,
      image: "/api/placeholder/300/400?text=Demon+Slayer",
    },
    {
      title: "Attack on Titan",
      rating: 9.60,
      image: "/api/placeholder/300/400?text=Attack+on+Titan",
    },
  ]);

  return (
  <div className="bg-gray-900 text-white min-h-screen">
    {/* Sidebar tetap di luar main content */}
    <Sidebar />

    {/* Main Content */}
    <main className="mr-64 mt-16 p-6"> {/* 🟣 mt-16 agar tidak ketabrak navbar */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Anime Sedang Tayang</h2>
        <p className="text-gray-400">Daftar anime yang sedang tayang minggu ini</p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {ongoingAnimeData.map((anime, index) => (
          <div
            key={index}
            className="bg-gray-800 w-56 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all"
          >
            <div className="relative">
              <img
                src={anime.image}
                alt={anime.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-500 text-xs px-2 py-0.5 rounded">
                TV
              </div>
              <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded flex items-center">
                <FaStar className="text-black mr-1" /> {anime.rating}
              </div>
            </div>

            <div className="p-3">
              <p className="text-xs bg-gray-700 px-2 py-0.5 rounded mb-2 inline-block">
                Ongoing
              </p>
              <h3 className="font-medium text-sm leading-tight">{anime.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
);
}