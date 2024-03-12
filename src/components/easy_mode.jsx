import { useState, useEffect } from "react";
import { Profile_btn } from "./profile_btn";

function Easy_mode() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [livesCount, setLivesCount] = useState(5);

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
      setScore(0);
      setLivesCount(livesCount - 1);
    }
    fetchData();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!imageUrl) {
    return <div>Error: No image found</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6 ">
        <Profile_btn />
        <div className="flex justify-center items-center">
          <div className="flex-col justify-center items-center w-fit">
            <div className="inline-flex justify-between w-full">
              <div className="inline-flex justify-center items-center">
                <p className="mr-2 font-bold text-2xl font-itim">Lives: </p>
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
            <img src={imageUrl} alt="Tomato" />
            <p>Solution: {solution}</p>

            <div>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <button
                  key={number}
                  onClick={() => handleButtonClick(number)}
                  className="w-11 h-11 bg-[#D62E2E] text-white mr-6 mt-2 rounded-xl font-itim font-bold text-4xl hover:scale-125 transition-all"
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Easy_mode;
