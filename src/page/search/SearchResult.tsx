import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

interface AnimeItem {
  title: string;
  poster: string;
  episodes?: string | number;
  releaseDay?: string;
  latestReleaseDate?: string;
  lastReleaseDate?: string;
  animeId: string;
  href: string;
  score?: string;
  otakudesuUrl?: string;
  status?: string;
}

const SkeletonCard = () => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg animate-pulse">
    <div className="w-full h-48 bg-gray-700 rounded mb-4"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-700 rounded w-1/2 mb-1"></div>
    <div className="h-3 bg-gray-700 rounded w-1/3"></div>
  </div>
);

const SearchResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const q = searchParams.get('q') ?? '';

  useEffect(() => {
    const fetchResults = async () => {
      if (!q) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/otakudesu/search`,
          { params: { q } }
        );
        console.log('Search response:', response.data);

        const animeList = response?.data?.data?.animeList;
        if (Array.isArray(animeList)) {
          setResults(animeList);
        } else {
          console.warn('animeList is not an array:', response.data);
          setResults([]);
        }
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [q]);

  return (
    <div className="p-4 mt-20 text-white">
      <h2 className="text-2xl mb-4">Search Results for "{q}"</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {results.map((item: AnimeItem) => (
            <Link
              to={`/anime/${item.animeId}`}
              key={item.animeId}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-purple-400/50 transition block"
            >
              <img
                src={item.poster}
                alt={item.title}
                className="w-full h-auto rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
              <p className="text-sm text-gray-300">Status: {item.status}</p>
              <p className="text-sm text-gray-300">
                Score: {item.score || 'N/A'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
