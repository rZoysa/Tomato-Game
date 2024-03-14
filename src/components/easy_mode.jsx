import { useState, useEffect } from "react";
import { Profile_btn } from "./profile_btn";
import { Game_summary } from "./game_summary";
import { motion } from "framer-motion";

function Easy_mode() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [livesCount, setLivesCount] = useState(5);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [timer, setTimer] = useState(10); // Timer set to 10 seconds
  const [intervalId, setIntervalId] = useState(null);
  const questionTime = 10;

  useEffect(() => {
    fetchData();
    startTimer();
  }, []); // Fetch data and start timer on component mount

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
        setFeedback("Wrong!");
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

  if (loading) {
    return <div>Loading...</div>;
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
    setLivesCount(5);
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
        />
      )}
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6 ">
        <Profile_btn />
        <div className="flex justify-center items-center">
          <div className="flex-col justify-center items-center w-fit">
            <div className="inline-flex justify-between w-full">
              <div className="inline-flex justify-center items-center">
                <p className="mr-2 font-bold text-4xl font-itim text-white">
                  Lives:{" "}
                </p>
                {[...Array(livesCount)].map(
                  (
                    _,
                    index // Loop to render the image multiple times
                  ) => (
                    <img
                      key={index}
                      src="easy.png"
                      className={`w-8 h-8 mr-2 transition-opacity duration-500 ${
                        index < livesCount ? "opacity-100" : "opacity-0"
                      }`}
                      alt=""
                    />
                  )
                )}
              </div>
              <p>{feedback}</p>
              <p className="font-bold text-4xl font-itim text-white">
                Score: {score}
              </p>
              <p className="absolute top-0 right-0 text-white m-4 font-bold">
                Timer: {timer}
              </p>
            </div>

            <div>
              <img src={imageUrl} alt="Tomato" className="w-full" />
            </div>
            <p>Solution: {solution}</p>

            <div className="flex items-center justify-between">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
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

export default Easy_mode;
