import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { app } from "/firebaseConfig";
import { getDatabase, ref, get, child, update } from "firebase/database";
import { useEffect, useState } from "react";

function Game_summary({ restartGame, onClose, score, difficulty }) {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [isUserLogged, setIIsUserLogged] = useState(false);
  const dbRef = ref(getDatabase(app));

  const playAgain = () => {
    restartGame();
    onClose();
  };

  useEffect(() => {
    fetchUserData();

    if (userId) {
      setIIsUserLogged(true);
    }
  }, []);

  const fetchUserData = async () => {
    if (userId) {
      const snapshot = await get(child(dbRef, `users/${userId}`));
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        console.log("No data available");
      }
    }
  };

  const updateHighScore = async () => {
    if (userId) {
      let scoreUpdates = {};
      if (difficulty === "easy") {
        scoreUpdates.easy = score;
      } else if (difficulty === "medium") {
        scoreUpdates.medium = score;
      } else {
        scoreUpdates.hard = score;
      }

      await update(child(dbRef, `users/${userId}`), scoreUpdates);
      setIsNewHighScore(true);
      console.log("User data updated successfully");
    }
  };

  useEffect(() => {
    if (userData !== null) {
      let difficultyValue;
      switch (difficulty) {
        case "easy":
          difficultyValue = userData.easy;
          break;
        case "medium":
          difficultyValue = userData.medium;
          break;
        case "hard":
          difficultyValue = userData.hard;
          break;
      }

      if (difficultyValue < score) {
        updateHighScore();
      }
    }
  }, [userData]);

  return (
    <div className="bg-black fixed flex justify-center items-center w-screen h-screen bg-opacity-45 select-none z-50">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg z-50 w-2/5 h-3/5"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-red-600">Game Over!</h2>
          <p className="text-2xl mt-4">Your Score: {score}</p>
          {isNewHighScore && (
            <p className="text-xl text-green-600 font-bold mt-2">
              Congratulations! New high score.
            </p>
          )}

          {!isUserLogged && (
            <p className="text-xl text-black-600 font-bold mt-2">
              Login to Save your Score!
            </p>
          )}
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-between w-2/4">
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              onClick={playAgain}
            >
              Play Again
            </button>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-600">
              <Link to={"/home"}>Go to Home</Link>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

Game_summary.propTypes = {
  restartGame: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export { Game_summary };
