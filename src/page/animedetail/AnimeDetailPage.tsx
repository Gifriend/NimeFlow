import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Score {
  value: string;
  users: string;
}

interface Synopsis {
  paragraphs: string[];
  connections: {
    title: string;
    animeId: string;
    href: string;
    samehadakuUrl: string;
  }[];
}

interface Genre {
  title: string;
  genreId: string;
  href: string;
  samehadakuUrl: string;
}

interface Episode {
  title: number;
  episodeId: string;
  href: string;
  samehadakuUrl: string;
}

interface AnimeDetailData {
  english: string;
  japanese: string;
  poster: string;
  score: Score;
  synopsis: Synopsis;
  status: string;
  type: string;
  source: string;
  duration: string;
  episodes: number;
  season: string;
  studios: string;
  producers: string;
  aired: string;
  genreList: Genre[];
  episodeList: Episode[];
}

export default function AnimeDetail() {
  const { animeId } = useParams<{ animeId: string }>();
  const [anime, setAnime] = useState<AnimeDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/samehadaku/anime/${animeId}`
        );
        setAnime(response.data.data);
      } catch (err) {
        setError('Gagal memuat data anime.');
      } finally {
        setLoading(false);
      }
    };

    if (animeId) {
      fetchAnime();
    }
  }, [animeId]);

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!anime) return <p className="text-white p-4">Anime tidak ditemukan.</p>;

  return (
    <div className="p-6 text-white max-w-4xl mx-auto bg-gray-900 min-w-full">
      <h1 className="text-3xl font-bold mb-4">
        {anime.english || anime.japanese}
      </h1>

      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <img
          src={anime.poster}
          alt={anime.english}
          className="w-48 rounded shadow-lg"
        />

        <div>
          <p><strong>Score:</strong> {anime.score.value} ({anime.score.users} users)</p>
          <p><strong>Status:</strong> {anime.status}</p>
          <p><strong>Type:</strong> {anime.type}</p>
          <p><strong>Source:</strong> {anime.source}</p>
          <p><strong>Duration:</strong> {anime.duration}</p>
          <p><strong>Episodes:</strong> {anime.episodes}</p>
          <p><strong>Season:</strong> {anime.season}</p>
          <p><strong>Studio:</strong> {anime.studios}</p>
          <p><strong>Producers:</strong> {anime.producers}</p>
          <p><strong>Aired:</strong> {anime.aired}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Sinopsis</h2>
        {anime.synopsis?.paragraphs?.length ? (
          anime.synopsis.paragraphs.map((p, i) => (
            <p key={i} className="mb-2">{p}</p>
          ))
        ) : (
          <p>Tidak ada sinopsis.</p>
        )}
      </div>

      {anime.genreList.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {anime.genreList.map((genre) => (
              <span
                key={genre.genreId}
                className="px-3 py-1 bg-blue-700 rounded text-sm"
              >
                {genre.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {anime.episodeList.length > 0 && (
  <div>
    <h2 className="text-2xl font-semibold mb-2">Daftar Episode</h2>
    <ul className="space-y-2">
      {anime.episodeList
        .sort((a, b) => a.title - b.title)
        .map((ep) => (
          <li key={ep.episodeId}>
            <Link
              to={`/episode/${ep.episodeId}`} 
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Episode {ep.title}
            </Link>
          </li>
        ))}
    </ul>
  </div>
)}
    </div>
  );
}
