import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Clock, Play, Download } from 'lucide-react';

const EpisodeDetailSkeleton = () => (
  <div className="p-6 text-white max-w-4xl mx-auto bg-gray-900 min-h-screen animate-pulse">
    <div className="h-8 w-3/4 bg-gray-700 rounded mb-6"></div>

    <div className="aspect-video w-full bg-gray-700 rounded mb-6"></div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-6 bg-gray-700 rounded w-full"></div>
      ))}
    </div>

    <div className="flex justify-between items-center mt-8">
      <div className="h-10 w-24 bg-gray-700 rounded"></div>
      <div className="h-10 w-24 bg-gray-700 rounded"></div>
    </div>

    <div className="mt-8 space-y-4">
      <div className="h-6 w-40 bg-gray-700 rounded"></div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-700 text-sm">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3 border border-gray-600">Quality</th>
              <th className="p-3 border border-gray-600">Size</th>
              <th className="p-3 border border-gray-600">Host</th>
              <th className="p-3 border border-gray-600">Link</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, i) => (
              <tr key={i}>
                <td className="p-3 border border-gray-700"><div className="h-4 bg-gray-600 rounded w-20"></div></td>
                <td className="p-3 border border-gray-700"><div className="h-4 bg-gray-600 rounded w-16"></div></td>
                <td className="p-3 border border-gray-700"><div className="h-4 bg-gray-600 rounded w-20"></div></td>
                <td className="p-3 border border-gray-700"><div className="h-4 bg-gray-600 rounded w-20"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default function EpisodeDetail() {
  const navigate = useNavigate();
  const { episodeId } = useParams<{ episodeId: string }>();
  const [episode, setEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/otakudesu/episode/${episodeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEpisode(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal memuat data episode.');
      } finally {
        setLoading(false);
      }
    };

    if (episodeId) {
      fetchEpisode();
    }
  }, [episodeId]);

  const handleNavigation = (ep: any) => {
    if (ep && ep.episodeId) {
      navigate(`/episode/${ep.episodeId}`);
    }
  };

  if (loading) return <EpisodeDetailSkeleton />;
  if (error)
    return (
      <div className="p-6 text-white max-w-4xl mx-auto bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error Loading Episode</div>
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

  if (!episode)
    return (
      <div className="p-6 text-white max-w-4xl mx-auto bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-4">Episode tidak ditemukan.</div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
          >
            <ArrowLeft size={20} />
            Kembali
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
  
      <div className="px-6 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-black/50 hover:bg-black/70 px-4 py-2 rounded-lg transition"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{episode.title}</h1>

        <div className="mb-6 aspect-video">
          <iframe
            src={episode.defaultStreamingUrl}
            title={episode.title}
            allowFullScreen
            className="w-full h-full rounded-md shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span><strong>Durasi:</strong> {episode.duration || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-green-500" />
            <span><strong>Status:</strong> {episode.status || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-yellow-500" />
            <span><strong>Total Download:</strong> {episode.downloadCount || 'N/A'}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => handleNavigation(episode.prevEpisode)}
            disabled={!episode.hasPrevEpisode}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              episode.hasPrevEpisode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Prev Episode
          </button>
          <button
            onClick={() => handleNavigation(episode.nextEpisode)}
            disabled={!episode.hasNextEpisode}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              episode.hasNextEpisode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Next Episode
          </button>
        </div>

        {episode.downloadUrl && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Opsi Download</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-700 text-sm">
                <thead>
                  <tr className="bg-gray-700 text-left">
                    <th className="p-3 border border-gray-600">Kualitas</th>
                    <th className="p-3 border border-gray-600">Ukuran</th>
                    <th className="p-3 border border-gray-600">Penyedia</th>
                    <th className="p-3 border border-gray-600">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {episode.downloadUrl.qualities.map(
                    (quality: any, index: number) =>
                      quality.urls.map((urlItem: any, urlIndex: number) => (
                        <tr key={`${index}-${urlIndex}`} className="hover:bg-gray-700">
                          {urlIndex === 0 && (
                            <>
                              <td
                                rowSpan={quality.urls.length}
                                className="p-3 border border-gray-700 align-top"
                              >
                                {quality.title}
                              </td>
                              <td
                                rowSpan={quality.urls.length}
                                className="p-3 border border-gray-700 align-top"
                              >
                                {quality.size}
                              </td>
                            </>
                          )}
                          <td className="p-3 border border-gray-700">{urlItem.title}</td>
                          <td className="p-3 border border-gray-700">
                            <a
                              href={urlItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}