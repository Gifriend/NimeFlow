import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaStar } from 'react-icons/fa';

export default function Completed() {
  const [completedAnimeData] = useState([
    {
      title: "Fullmetal Alchemist: Brotherhood",
      rating: 9.25,
      image: "/api/placeholder/300/400?text=FMA+Brotherhood",
    },
    {
      title: "Death Note",
      rating: 8.70,
      image: "/api/placeholder/300/400?text=Death+Note",
    },
    {
      title: "Steins;Gate",
      rating: 9.10,
      image: "/api/placeholder/300/400?text=Steins+Gate",
    },
    {
      title: "Naruto Shippuden",
      rating: 8.30,
      image: "/api/placeholder/300/400?text=Naruto+Shippuden",
    },
    {
      title: "Code Geass",
      rating: 8.90,
      image: "/api/placeholder/300/400?text=Code+Geass",
    },
    {
      title: "Your Lie in April",
      rating: 8.60,
      image: "/api/placeholder/300/400?text=Your+Lie+in+April",
    },
  ]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="mr-64 mt-16 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Anime Selesai Tayang</h2>
          <p className="text-gray-400">Daftar anime yang sudah tamat dan selesai penayangan</p>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {completedAnimeData.map((anime, index) => (
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
                  Completed
                </div>
                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded flex items-center">
                  <FaStar className="text-black mr-1" /> {anime.rating}
                </div>
              </div>

              <div className="p-3">
              <p className="text-xs bg-gray-700 px-2 py-0.5 rounded mb-2 inline-block">
                Completed
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
