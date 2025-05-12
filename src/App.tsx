import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./page/login/Login";
import RegisterForm from "./page/register/Register";
import AnimeSchedule from "./page/schedule/Schedule";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/schedule" element={<AnimeSchedule />} />
      </Routes>
    </Router>
  );
}

export default App;
