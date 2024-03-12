import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing_Page from './components/landing_page';
import Login from "./components/login";
import Home from './components/home';
import Registration from './components/Registration';
import Difficulty from './components/difficulty';
import Easy_mode from './components/easy_mode';


function App() {


  return(
    <Router>
      <Routes>
        <Route path='/' element={<Landing_Page/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path='/Registration' element={<Registration/>}></Route>
        <Route path="/home" element={<Home />} />
        <Route path='/Difficulty' element={<Difficulty/>}></Route>  
        <Route path='/Easy_mode' element={<Easy_mode/>}></Route>      
      </Routes>
    </Router>
  );
}

export default App;
