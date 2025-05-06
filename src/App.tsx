import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './page/login/Login';
import RegisterForm from './page/register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<RegisterForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
