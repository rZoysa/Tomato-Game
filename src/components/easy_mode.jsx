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

  const openSummary = () => {
    setIsSummaryOpen(true);
  };
  const closeSummary = () => {
    setIsSummaryOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

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
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (number) => {
    if (number === solution) {
      setFeedback("Correct!");
      setScore(score + 1);
    } else {
      setFeedback("Wrong!");
      setLivesCount(livesCount - 1);
      console.log(livesCount);
      if (livesCount === 1) {
        openSummary(score);
      }
    }
    fetchData();
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
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={openSummary}>show summary</button>
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
              <p>Score: {score}</p>
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
