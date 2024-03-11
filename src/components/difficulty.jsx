import { Link } from "react-router-dom";

function Difficulty() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6">
          <div className=" flex ml-10 m-24 w-fit">
          <Link to="/Home">
            <img
              src=""
              alt=""
              srcSet="home.png"
              className="pr-1 w-16 cursor-pointer"
            />
            </Link>
            <h1 className="text-6xl font-bold ">Choose a Difficulty</h1>
          </div>
          <div className="flex items-center w-fit">
            <ul className="list-disc text-6xl font-itim font-bold text-white ml-10 inline-block">
              <li className="transition-all hover:text-7xl m-7 w-fit">
                <a href="/difficulty">Certified Cherry</a>
              </li>
              <li className="transition-all hover:text-7xl m-7 w-fit">
                <a href="/leaderboard">Getting There</a>
              </li>
              <li className="transition-all hover:text-7xl m-7 w-fit">
                <a href="/instructions">Tomato Crusher</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Difficulty;
