import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/login";
import Home from './components/home';
import Registration from './components/Registration';


function App() {


  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/Registration' element={<Registration/>}></Route>
        
      </Routes>
    </Router>
  );
}

export default App;
