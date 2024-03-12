import { Link } from "react-router-dom";
import { Profile_btn } from "./profile_btn";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6">
        <Profile_btn />

        <div className="flex items-center justify-center">
          <div className="flex items-center justify-between w-11/12">
            <div className="flex items-center">
              <ul className="list-disc text-6xl font-itim font-bold text-white ml-10 inline-block select-none">
                
                <li className="transition-all hover:scale-125 m-7 w-fit">
                <motion.div
                  className="box"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/difficulty">Play</Link>
                  </motion.div>
                </li>
                
                <li className="transition-all hover:scale-125 m-7 w-fit">
                <motion.div
                  className="box"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/leaderboard">Leaderboard</Link>
                  </motion.div>
                </li>
                <li className="transition-all hover:scale-125 m-7 w-fit">
                <motion.div
                  className="box"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/instructions">Instructions</Link>
                  </motion.div>
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
