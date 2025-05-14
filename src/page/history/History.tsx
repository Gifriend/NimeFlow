// pages/HistoryScreen.tsx
import React from "react";
import { Link } from "react-router-dom";

const watchHistory = [
  {
    id: 1,
    title: "Attack on Titan",
    thumbnail: "/images/aot.jpg",
    lastWatchedEpisode: "Episode 12",
    path: "/anime/attack-on-titan",
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    thumbnail: "/images/jujutsu.jpg",
    lastWatchedEpisode: "Episode 8",
    path: "/anime/jujutsu-kaisen",
  },
  {
    id: 3,
    title: "Demon Slayer",
    thumbnail: "/images/demonslayer.jpg",
    lastWatchedEpisode: "Episode 4",
    path: "/anime/demon-slayer",
  },
];

const HistoryScreen: React.FC = () => {
  return (
    <div className="pt-20 px-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-4">History Tontonan</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {watchHistory.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            className="flex-shrink-0 w-40 hover:scale-105 transform transition duration-300"
          >
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium truncate">{item.title}</p>
              <p className="text-xs text-gray-400">{item.lastWatchedEpisode}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HistoryScreen;
