import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Landing_Page from './components/landing_page';
import Login from "./components/login";
import Home from './components/home';
import Registration from './components/Registration';
import Difficulty from './components/difficulty';
import GameController from './components/gameController';
import Leaderboard from './components/leaderboard';
import Time from './components/time';
import Instructions from './components/instructions';


function App() {


  return(
    <Router>
      <Routes>
        <Route path='/' element={<Landing_Page/>}/>
        <Route path="/login" element={<Login />} />
        <Route path='/Registration' element={<Registration/>}/>
        <Route path="/home" element={<Home />} />
        <Route path='/Difficulty' element={<Difficulty/>}/>  
        <Route path='/GameController/:difficulty' element={<GameController/>}/>    
        <Route path='/leaderboard' element={<Leaderboard/>}></Route>
        <Route path='/instructions' element={<Instructions/>}></Route>
      </Routes>
      
        <Time/>
      
    </Router>
  );
}

export default App;
