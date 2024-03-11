import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Home = () => {
  var userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  if (!userName) {
    userName = "Guest";
  }

  const clearUserSession = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6">
        <div className="flex justify-between items-center ">
          <div className="ml-10 m-24 inline-flex justify-center items-center">
            <Link to="/Home">
            <img
              src=""
              alt=""
              srcSet="home.png"
              className="pr-1 w-16 cursor-pointer"
            />
            </Link>
            <h1 className="text-6xl font-bold">Tomato Quiz Game</h1>
          </div>
          <Menu as="div" className="w-fit mr-28 flex-col ">
            <Menu.Button className="cursor-pointer w-fit bg-white inline-flex justify-center items-center rounded-full p-2 shadow-lg">
              <p className="text-3xl font-itim select-none font-bold p-1">
                {userName}
              </p>
              <img src="" alt="" srcSet="profile.png" className="pr-1" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="div"
                className="absolute right-0 mt-2 mr-44 w-40 origin-top-right divide-y divide-gray-100 rounded-md p-1 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              >
                {!userId ? (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/login"
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-xl font-bold font-itim`}
                        >
                          Log In
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/Registration"
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-xl font-bold font-itim`}
                        >
                          Register
                        </Link>
                      )}
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`${
                            active ? "bg-blue-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-xl font-bold font-itim`}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={clearUserSession}
                          className={`${
                            active ? "bg-red-500 text-white" : "text-red-600"
                          } group flex w-full items-center rounded-md px-2 py-2 text-xl font-bold font-itim`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div className="flex items-center w-fit">
          <ul className="list-disc text-6xl font-itim font-bold text-white ml-10 inline-block">
            <li className="transition-all hover:text-7xl m-7 w-fit">
              <Link to="/difficulty">Play</Link>
            </li>
            <li className="transition-all hover:text-7xl m-7 w-fit">
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
            <li className="transition-all hover:text-7xl m-7 w-fit">
              <Link to="/instructions">Instructions</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
