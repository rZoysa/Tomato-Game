import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Profile_btn() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  var userName = localStorage.getItem("userName");

  if (!userName) {
    userName = "Guest";
  }

  const clearUserSession = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center ">
      <div className="ml-10 m-14 inline-flex justify-center items-center">
        <motion.div
          className="box"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link to="/Home">
            <img
              src=""
              alt=""
              srcSet="/home.png"
              className="pr-1 w-16 cursor-pointer mr-10 select-none"
            />
          </Link>
        </motion.div>
        <h1 className="text-6xl font-bold select-none">Tomato Quiz Game</h1>
      </div>
      <Menu as="div" className="w-fit mr-28 flex-col relative">
        <motion.div
          className="box"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Menu.Button className="cursor-pointer w-fit bg-white inline-flex justify-center items-center rounded-full p-2 shadow-lg">
            <img
              src=""
              alt=""
              srcSet="/profile.png"
              className="pr-1 select-none"
            />
            <p className="text-3xl font-itim select-none font-bold p-1">
              {userName}
            </p>
          </Menu.Button>
        </motion.div>
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
            className="absolute w-full mt-2 origin-top-right divide-y divide-gray-100 rounded-md p-1 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
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
  );
}

export { Profile_btn };
