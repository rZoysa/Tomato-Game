
import { Link } from "react-router-dom";
import { Profile_btn } from "./profile_btn";


const Home = () => {
  

  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6">
        
        <Profile_btn />

        <div className="flex items-center justify-center">
          <div className="flex items-center justify-between w-11/12">
            <div className="flex items-center">
              <ul className="list-disc text-6xl font-itim font-bold text-white ml-10 inline-block">
                <li className="transition-all hover:scale-125 m-7 w-fit">
                  <Link to="/difficulty">Play</Link>
                </li>
                <li className="transition-all hover:scale-125 m-7 w-fit">
                  <Link to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="transition-all hover:scale-125 m-7 w-fit">
                  <Link to="/instructions">Instructions</Link>
                </li>
              </ul>
            </div>
            <div>
              <img src="" alt="" srcSet="bg-icon.png" className="m-8 w-fit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
