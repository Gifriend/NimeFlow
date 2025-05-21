import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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

function AppWrapper() {
  const location = useLocation();

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
      </Routes>

      {!hideLayout && <Footer />} {/* ✅ Tambahkan Footer di sini */}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
