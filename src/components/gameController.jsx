import { useState, useEffect } from "react";
import { Profile_btn } from "./profile_btn";
import { Game_summary } from "./game_summary";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

function GameController() {
  const { difficulty } = useParams();
  const initialTimer =
    difficulty === "easy" ? 30 : difficulty === "medium" ? 20 : 15;

  const initialLivesCount =
    difficulty === "easy" ? 5 : difficulty === "medium" ? 3 : 3;

  const initialLivesImg =
    difficulty === "easy"
      ? "/easy.png"
      : difficulty === "medium"
      ? "/mid.png"
      : "/hard.png";

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [livesCount, setLivesCount] = useState(initialLivesCount);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [timer, setTimer] = useState(initialTimer);
  const [intervalId, setIntervalId] = useState(null);
  const questionTime = initialTimer;
  const [progress, setProgress] = useState(1);
  const [numbers, setNumbers] = useState([...Array(10).keys()]);

  useEffect(() => {
    fetchData();
    startTimer();
  }, []); // Fetch data and start timer on component mount

  useEffect(() => {
    if (difficulty === "hard") {
      shuffleNumbers();
    }
  }, [solution, difficulty]);

  const shuffleNumbers = () => {
    setNumbers(numbers.sort(() => Math.random() - 0.5));
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(id); // Stop the timer when it reaches 0
        }
        return prevTimer - 1;
      });
    }, 1000);
    setIntervalId(id); // Store the interval ID
  };

  const stopTimer = () => {
    clearInterval(intervalId); // Stop the timer using the stored interval ID
  };

  const openSummary = () => {
    setIsSummaryOpen(true);
  };
  const closeSummary = () => {
    setIsSummaryOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://marcconrad.com/uob/tomato/api.php?out=json&base64=no"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setImageUrl(data.question);
      setSolution(data.solution);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Check if timer reaches 0
    if (timer === 0) {
      if (livesCount === 1) {
        stopTimer();
        openSummary(score);
      } else {
        setLivesCount(livesCount - 1);
        fetchData();
        setTimer(questionTime);
        startTimer();
        setFeedback("Times Up!");
      }
    }
  }, [timer, livesCount, score]);

  const handleButtonClick = (number) => {
    if (number === solution) {
      setFeedback("Correct!");
      setScore(score + 1);
      setTimer(questionTime);
      fetchData();
    } else {
      setFeedback("Wrong!");
      if (livesCount === 1) {
        openSummary(score);
        stopTimer();
      } else {
        setLivesCount(livesCount - 1);
        setTimer(questionTime);
        fetchData();
      }
    }
  };

  // Clear feedback
  useEffect(() => {
    if (feedback !== "") {
      const timeoutId = setTimeout(() => {
        setFeedback("");
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [feedback]);

  useEffect(() => {
    const newProgress = timer / initialTimer; // Assuming the timer starts from 60 seconds
    setProgress(newProgress);
  }, [timer]);

  if (loading) {
    return (
      <div className="text-5xl h-screen place-content-center flex justify-center items-center">
        <p className="spinner border-4 border-t-4 border-gray-400 h-12 w-12 rounded-full animate-spin">
          -
        </p>
        <p className="text-white border-black p-4">Loading...</p>
      </div>
    );
  }

  if (!imageUrl) {
    return <div>Error: No image found</div>;
  }

  const RestartBtn = () => {
    const confirmed = window.confirm("Are you sure you want to restart?");
    if (confirmed) {
      handleRestart();
    }
  };

  const handleRestart = () => {
    setFeedback("");
    setScore(0);
    setLivesCount(initialLivesCount);
    fetchData();
    setTimer(questionTime);
    startTimer();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {isSummaryOpen && (
        <Game_summary
          onClose={closeSummary}
          score={score}
          restartGame={handleRestart}
          difficulty={difficulty}
        />
      )}
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6 ">
        <Profile_btn />

        <div className="flex justify-center items-center">
          <div className="flex-col justify-center items-center w-fit">
            <p className="font-bold text-4xl font-itim text-white text-center mb-1 select-none">
              Score: {score}
            </p>
            <div className="inline-flex justify-between w-full">
              <div className="inline-flex justify-center items-center select-none">
                <p className="mr-2 font-bold text-4xl font-itim text-white">
                  Lives:{" "}
                </p>
                {[...Array(livesCount)].map((_, index) => (
                  <img
                    key={index}
                    src={initialLivesImg}
                    className={`w-8 h-8 mr-2 transition-opacity duration-500 ${
                      index < livesCount ? "opacity-100" : "opacity-0"
                    }`}
                    alt=""
                  />
                ))}
              </div>
              <p
                className={`${
                  feedback === ""
                    ? "transition-opacity duration-500"
                    : "transition-opacity duration-500"
                } ${
                  feedback === "Correct!" ? "text-green-500" : "text-red-600"
                } font-itim text-3xl select-none`}
                style={{ opacity: feedback ? 1 : 0 }}
              >
                {feedback}
              </p>

              <div className="inline-flex items-center font-itim select-none">
                <p className="text-white font-bold font-itim text-4xl">
                  Timer:
                </p>
                <svg
                  id="progress"
                  width="75"
                  height="55"
                  viewBox="10 20 75 55"
                  className="top-4 left-4"
                >
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="20"
                    className={`${
                      timer > 3 ? "text-white" : "text-red-600"
                    } stroke-current `}
                    strokeDasharray={2 * Math.PI * 20} //Circumference of the circle
                    strokeDashoffset={2 * Math.PI * 20 * (1 - progress)}
                    fill="none"
                    strokeWidth="8"
                    transform="rotate(-90 50 50)"
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 20 * (1 - progress),
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />

                  <text
                    x="50"
                    y="50"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="text-white font-bold text-2xl fill-current"
                  >
                    {timer}
                  </text>
                </svg>
              </div>
            </div>

            <div>
              <img src={imageUrl} alt="Tomato" className="w-full" />
            </div>

            <div className="flex items-center justify-between mt-5">
              {numbers.map((number) => (
                <motion.div
                  key={number}
                  className="box"
                  whileHover={!isSummaryOpen ? { scale: 1.2 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <button
                    onClick={() => handleButtonClick(number)}
                    disabled={isSummaryOpen}
                    className="w-11 h-11 bg-[#D62E2E] text-white rounded-xl font-itim font-bold text-4xl transition-all"
                  >
                    {number}
                  </button>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                className="mt-6 bg-[#248C00] text-white rounded-3xl px-10 py-2 text-3xl font-bold font-itim"
                onClick={RestartBtn}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameController;
