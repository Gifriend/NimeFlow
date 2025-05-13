import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./page/login/Login";
import RegisterForm from "./page/register/Register";
import DesktopAnimeScheduleApp from "./page/schedule/Schedule";
import Navbar from "./components/Navbar";
import Ongoing from "./page/ongoing/ongoing";
import Completed from "./page/completed/completed";

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
