import {
  HashRouter,
  Route,
  useLocation,
  Routes,
} from 'react-router-dom';
import Login from './page/login/Login';
import RegisterForm from './page/register/Register';
import DesktopAnimeScheduleApp from './page/schedule/Schedule';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Ongoing from './page/ongoing/ongoing';
import Completed from './page/completed/completed';
import HistoryScreen from './page/history/History';
import SearchResult from './page/search/SearchResult';
import AnimeList from './page/animelist/animelist';
import GenrePage from './page/genre/genre';
import GenreDetailPage from './page/genre/[genreId]/genreId';
import EpisodeStreamingPage from './page/streaming/EpisodeStreamingPage';
import AnimeDetail from './page/animedetail/AnimeDetailPage';
import HomePage from './page/home/home';
import Recent from './page/recent/recent';
import Movie from './page/movie/movie';
import Popular from './page/popular/popular';
import Batch from './page/batch/batch';
import ScrollToTop from './components/scrolltop';

function AppWrapper() {
  const location = useLocation();
  console.log('Current route:', location.pathname);

  const hideLayout =
    location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {!hideLayout && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/schedule" element={<DesktopAnimeScheduleApp />} />
        <Route path="/ongoing" element={<Ongoing />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/animelist" element={<AnimeList />} />
        <Route path="/genre" element={<GenrePage />} />
        <Route path="/genre/:genreId" element={<GenreDetailPage />} />
        <Route path="/anime/:animeId" element={<AnimeDetail />} />
        <Route path="/episode/:episodeId" element={<EpisodeStreamingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/batch" element={<Batch />} />
      </Routes>

      {!hideLayout && <Footer />} {/* ✅ Tambahkan Footer di sini */}
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AppWrapper />
    </HashRouter>
  );
}

export default App;
