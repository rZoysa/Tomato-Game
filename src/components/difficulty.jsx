import { Link } from "react-router-dom";
import { Profile_btn } from "./profile_btn";

function Difficulty() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6">
          <Profile_btn />

          <div className="ml-10">
            <p className="text-6xl font-itim font-bold text-white m-5 select-none">Choose a Diffuculty</p>
            <div className="flex items-center w-fit">
              <ul className="list-none text-6xl font-itim font-bold text-white ml-10 inline-block">
                <li className="flex items-center transition-all hover:scale-125 m-7 w-fit">
                  <img
                    src="easy.png"
                    alt="Bullet Point Image"
                    className="w-10 h-10 mr-2"
                  />
                  <Link href="/difficulty">Certified Cherry</Link>
                </li>
                <li className="flex items-center transition-all hover:scale-125 m-7 w-fit">
                  <img
                    src="mid.png"
                    alt="Bullet Point Image"
                    className="w-12 h-10 mr-2"
                  />
                  <Link href="/leaderboard">Getting There</Link>
                </li>
                <li className="flex items-center transition-all hover:scale-125 m-7 w-fit">
                  <img
                    src="hard.png"
                    alt="Bullet Point Image"
                    className="w-10 h-10 mr-2"
                  />
                  <Link href="/instructions">Tomato Crusher</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Difficulty;
