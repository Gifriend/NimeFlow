import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, Star, Users, Play } from 'lucide-react';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/backbutton';

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
    otakudesuUrl: string;
  }[];
}

interface Genre {
  title: string;
  genreId: string;
  href: string;
  otakudesuUrl: string;
}

interface Episode {
  title: number;
  episodeId: string;
  href: string;
  otakudesuUrl: string;
}

interface AnimeDetailData {
  tilte: string;
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

// const LoadingSpinner = () => (
//   <div className="flex items-center justify-center">
//     <div className="w-8 h-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent"></div>
//   </div>
// );

const DetailSkeleton = () => (
  <div className="p-6 text-white max-w-6xl mx-auto bg-gray-900 min-h-screen animate-pulse">
    <div className="h-8 bg-gray-700 rounded mb-6 w-2/3"></div>
    
    <div className="flex flex-col lg:flex-row gap-8 mb-8">
      <div className="w-full lg:w-80 h-96 bg-gray-700 rounded-lg"></div>
      
      <div className="flex-1 space-y-4">
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
    
    <div className="space-y-4">
      <div className="h-6 bg-gray-700 rounded w-1/4"></div>
      <div className="h-4 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    </div>
  </div>
);

export default function AnimeDetail() {
  const { animeId } = useParams();
  const [anime, setAnime] = useState<AnimeDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/otakudesu/anime/${animeId}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Fetched Anime Data:', result.data);
        setAnime(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal memuat data anime.');
      } finally {
        setLoading(false);
      }
    };

    if (animeId) {
      fetchAnime();
    }
  }, [animeId]);

  if (loading) return <DetailSkeleton />;
  
  if (error) {
    return (
      <div className="p-6 text-white max-w-6xl mx-auto bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error Loading Anime</div>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (!anime) {
    return (
      <div className="p-6 text-white max-w-6xl mx-auto bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">Anime tidak ditemukan</div>
          <button 
            onClick={() => window.history.back()} 
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
          >
            <ArrowLeft className="inline w-4 h-4 mr-2" />
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="relative mt-15">
        <div 
          className="h-64 bg-cover bg-center bg-gray-800"
          style={{ 
            backgroundImage: `url(${anime.poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px) brightness(0.3)'
          }}
        ></div>
        
        <div className="absolute top-6 left-6 z-20">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-black/50 hover:bg-black/70 px-4 py-2 rounded-lg transition"
          >
            <ArrowLeft size={20} />
            Kembali
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative -mt-32 z-20 px-6 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={anime.poster}
                alt={anime.english || anime.japanese}
                className="w-full lg:w-80 h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {anime.english || anime.japanese || anime.tilte}
              </h1>
              
              {anime.english && anime.japanese && anime.english !== anime.japanese && (
                <p className="text-xl text-gray-300 mb-4">{anime.japanese}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span><strong>Score:</strong> {anime.score?.value || 'N/A'}</span>
                  {anime.score?.users && (
                    <span className="text-gray-400">({anime.score.users} users)</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span><strong>Status:</strong> {anime.status}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-green-500" />
                  <span><strong>Type:</strong> {anime.type}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span><strong>Duration:</strong> {anime.duration}</span>
                </div>
                
                <div>
                  <strong>Episodes:</strong> {anime.episodes}
                </div>
                
                <div>
                  <strong>Season:</strong> {anime.season}
                </div>
                
                <div className="md:col-span-2">
                  <strong>Studio:</strong> {anime.studios}
                </div>
                
                <div className="md:col-span-2">
                  <strong>Source:</strong> {anime.source}
                </div>
                
                <div className="md:col-span-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <span><strong>Aired:</strong> {anime.aired}</span>
                </div>
              </div>

              {/* Genres */}
              {anime.genreList && anime.genreList.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.genreList.map((genre) => (
                      <span
                        key={genre.genreId}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-medium"
                      >
                        {genre.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Synopsis */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              {anime.synopsis?.paragraphs?.length ? (
                anime.synopsis.paragraphs.map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-300 leading-relaxed last:mb-0">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 italic">Tidak ada sinopsis tersedia.</p>
              )}
            </div>
          </div>

          {/* Related Anime */}
          {anime.synopsis?.connections && anime.synopsis.connections.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Related Anime</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {anime.synopsis.connections.map((connection) => (
                  <a
                    key={connection.animeId}
                    href={`/anime/${connection.animeId}`}
                    className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition"
                  >
                    <h3 className="font-semibold text-blue-400 hover:underline">
                      {connection.title}
                    </h3>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Episode List */}
          {anime.episodeList && anime.episodeList.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Episode List</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {anime.episodeList
                    .sort((a, b) => a.title - b.title)
                    .map((episode) => (
                      <a
                        key={episode.episodeId}
                        href={`/episode/${episode.episodeId}`}
                        className="bg-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-lg p-3 text-center transition group"
                      >
                        <div className="text-sm font-medium group-hover:text-white">
                          Episode {episode.title}
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}