import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/login.jsx";
import Home from './components/home.jsx';

function App() {


  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default App;
