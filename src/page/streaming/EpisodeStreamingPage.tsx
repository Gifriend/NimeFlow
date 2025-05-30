import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/backbutton';

export default function EpisodeStreamingPage() {
  const navigate = useNavigate();
  const { episodeId } = useParams<{ episodeId: string }>();
  const [episodeData, setEpisodeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1];

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/otakudesu/episode/${episodeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEpisodeData(response.data.data);
      } catch (err) {
        setError('Gagal memuat data episode.');
      } finally {
        setLoading(false);
      }
    };

    if (episodeId) {
      fetchEpisode();
    }
  }, [episodeId]);

  const handleEpisodeNavigation = (episode: any) => {
    if (episode && episode.episodeId) {
      navigate(`/episode/${episode.episodeId}`);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-xl mx-auto mt-12 bg-red-100 text-red-700 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Terjadi Kesalahan</h2>
        <p>{error}</p>
      </div>
    );

  if (!episodeData)
    return (
      <div className="text-center text-white mt-10 text-lg">
        Episode tidak ditemukan.
      </div>
    );

  return (
    <div className="text-white min-w-full mx-auto mt-10">
      <div className="bg-gray-800 p-6 rounded-xl shadow-md">
        <BackButton onClick={() => navigate(-1)} />
        
        {/* Episode Navigation */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => handleEpisodeNavigation(episodeData.prevEpisode)}
            disabled={!episodeData.hasPrevEpisode}
            className={`px-4 py-2 rounded-md ${
              episodeData.hasPrevEpisode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Prev Episode
          </button>
          
          <h1 className="text-3xl font-bold text-center">{episodeData.title}</h1>
          
          <button
            onClick={() => handleEpisodeNavigation(episodeData.nextEpisode)}
            disabled={!episodeData.hasNextEpisode}
            className={`px-4 py-2 rounded-md ${
              episodeData.hasNextEpisode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Next Episode
          </button>
        </div>

        {/* Streaming Player */}
        <div className="mb-6 aspect-video">
          <iframe
            src={episodeData.defaultStreamingUrl}
            className="w-full h-full rounded-md"
            allowFullScreen
            title="Anime Player"
          />
        </div>

        {/* Download Section */}
        {episodeData.downloadUrl && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Download Options</h2>
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
                  {episodeData.downloadUrl.qualities.map(
                    (quality: any, index: number) => (
                      quality.urls.map((urlItem: any, urlIndex: number) => (
                        <tr 
                          key={`${index}-${urlIndex}`}
                          className="hover:bg-gray-700"
                        >
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
                          <td className="p-3 border border-gray-700">
                            {urlItem.title}
                          </td>
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
                    )
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