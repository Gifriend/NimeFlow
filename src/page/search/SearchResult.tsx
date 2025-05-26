import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SearchResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<any[]>([]);
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
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {results.map((item: any, index: number) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <img
                src={item.poster}
                alt={item.title}
                className="w-full h-auto rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
              <p className="text-sm text-gray-300">Status: {item.status}</p>
              <p className="text-sm text-gray-300">Score: {item.score}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
