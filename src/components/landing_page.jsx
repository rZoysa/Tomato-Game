import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Landing_Page = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      // User is logged in
      navigate("/home");
    } else {
      // User is not logged in
      console.log("User is not logged in.");
    }
  }, [userId, navigate]); // Add navigate to the dependencies array

  const directToLogin = () => {
    navigate("/Login");
  };

  const directToRegistration = () => {
    navigate("/Registration");
  };

  const directToHome = () => {
    navigate("/home");
  };

  const text = "Tomato Quiz Game "; // Text to animate

  // Split the text into an array of letters
  const letters = text.split("");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6 flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <p className="text-6xl mr-5 select-none font-itim font-bold">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="letter"
                    initial={{ y: -100, opacity: 0 }} // Initial position above the container
                    animate={{ y: 0, opacity: 1 }} // Animation to drop down and fade in
                    transition={{ delay: index * 0.1 }} // Delay each letter animation
                  >
                    {letter}

                  </motion.span>
                ))}
              </p>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: text.length * 0.1 + 0.3 }} // Delay after text animation
              >
                <img src="" alt="" srcSet="Vector.png" className="select-none" />
              </motion.span>
              
            </div>

            <br />
            <motion.div
              className="box"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <h1 className="text-4xl mb-10 font-itim select-none">
                Ready to play!
              </h1>
            </motion.div>

            <motion.div
              className="flex flex-col items-center w-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <div className="mb-5 w-full flex items-center justify-center space-x-10">
                <button
                  type="button"
                  onClick={directToLogin}
                  className="bg-blue-500 text-white text-2xl w-3/12 px-4 py-2 rounded-md hover:scale-110 transition-all"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={directToRegistration}
                  className="bg-blue-500 text-white text-2xl w-3/12 px-4 py-2 rounded-md hover:scale-110 transition-all"
                >
                  Register
                </button>
              </div>

              <button
                type="button"
                onClick={directToHome}
                className="bg-blue-500 text-white text-2xl px-4 py-2 rounded-md hover:scale-110 transition-all"
              >
                Play as Guest
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing_Page;
