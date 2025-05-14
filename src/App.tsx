import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./page/login/Login";
import RegisterForm from "./page/register/Register";
import DesktopAnimeScheduleApp from "./page/schedule/Schedule";
import Navbar from "./components/Navbar";
import Ongoing from "./page/ongoing/ongoing";
import Completed from "./page/completed/completed";
import HistoryScreen from "./page/history/History";
import SearchResult from "./page/search/SearchResult";

function AppWrapper() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/schedule" element={<DesktopAnimeScheduleApp />} />
        <Route path="/ongoing" element={<Ongoing />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/history" element={<HistoryScreen/>}/>
        <Route path="/search" element={<SearchResult />} />
      </Routes>
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
