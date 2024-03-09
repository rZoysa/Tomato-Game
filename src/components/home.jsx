import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  var userName = localStorage.getItem("userName");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  if (!userName) {
    userName = "Guest";
  }

  const clearUserSession = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6">
        <div className="flex justify-between items-center ">
          <div className="ml-10 mt-20">
            <h1 className="text-6xl font-bold">Tomato Quiz Game</h1>
          </div>
          <div
            onClick={toggleDropdown}
            className="cursor-pointer mr-10 bg-white inline-flex justify-center items-center rounded-full p-2"
          >
            <p className="text-3xl font-itim">{userName}</p>
            <img src="" alt="" srcSet="profile.png" />
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="top-10 right-0 bg-white rounded-md shadow-md">
                <ul>
                  <li>
                    <button onClick={clearUserSession}>Logout</button>
                  </li>
                </ul>
              </div>
            )}

            {isDropdownOpen && (
              <div className="top-10 right-0 bg-white rounded-md shadow-md">
                <ul>
                  <li>
                    <button onClick={clearUserSession}>Sign In</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <ul className="text-3xl font-itim text-white list-disc ml-10">
            <li className="hover:text-4xl">
              <a href="/difficulty">Play</a>
            </li>
            <li className="hover:text-4xl">
              <a href="/leaderboard">Leaderboard</a>
            </li>
            <li className="hover:text-4xl">
              <a href="/instructions">Instructions</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
