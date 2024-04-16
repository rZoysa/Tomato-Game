import { useState, useEffect } from "react";
import { app } from "/firebaseConfig";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  limitToLast,
  get,
} from "firebase/database";
import { Profile_btn } from "./profile_btn";
import { Tab } from "@headlessui/react";

function Leaderboard() {
  const [difficulty, setDifficulty] = useState("easy");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const currentUserName = localStorage.getItem("userName");

  const dbRef = getDatabase(app);

  const tabs = [
    { label: "Certified Cherry", value: "easy" },
    { label: "Getting There", value: "medium" },
    { label: "Tomato Crusher", value: "hard" },
  ];

  const fetchLeaderboardData = async () => {
    const difficultyRef = query(
      ref(dbRef, "users"),
      orderByChild(difficulty), // Sort by the selected difficulty level
      limitToLast(10) // Limit the results to the top 10
    );

    const snapshot = await get(difficultyRef);
    if (snapshot.exists()) {
      const leaderboardData = [];
      snapshot.forEach((childSnapshot) => {
        const user = childSnapshot.val();
        leaderboardData.push({
          username: user.username,
          score: user[difficulty],
        });
      });

      // Sort the leaderboard data by score in descending order
      leaderboardData.sort((a, b) => b.score - a.score);

      setLeaderboardData(leaderboardData);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [difficulty]);

  const topThreeUsers = leaderboardData.slice(0, 3);
  const tableData = leaderboardData.slice(3);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6 select-none">
        <Profile_btn />

        <div className="mb-4 ml-20 text-2xl font-bold font-itim">
          <h1 className="text-5xl text-white mb-4 font-bold font-itim">
            Leaderboard
          </h1>
          <label htmlFor="difficulty" className="text-3xl ml-10">
            Select Difficulty:
          </label>
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 w-2/6">
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    `w-full rounded-xl text-2xl font-itim font-bold ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 p-1 ${
                      selected
                        ? "bg-white text-black shadow"
                        : "text-white hover:bg-white/[0.12] hover:text-white"
                    }`
                  }
                  onClick={() => setDifficulty(tabs[index].value)}
                >
                  {tab.label}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>

        <div className="inline-flex justify-between w-full mt-24">
          <div className="inline-flex align-bottom items-baseline w-fit ml-20">
            {topThreeUsers.map((user, index) => {
              let renderIndex = index === 0 ? 1 : index === 1 ? 0 : 2;
              const renderedUser = topThreeUsers.find(
                (u, i) => i === renderIndex
              );

              return (
                <div
                  key={renderIndex}
                  className={`relative w-44 ${
                    renderIndex === 0 ? "h-60" : "h-48"
                  } bg-gradient-to-b from-[#1F0541] justify-center items-center flex`}
                >
                  <img
                    src={`/${renderIndex + 1}.png`}
                    srcSet={`/${renderIndex + 1}.png`}
                    alt=""
                    className="h-4/6"
                  />
                  <p className="absolute top-0 left-0 right-0 text-right text-white font-bold font-itim text-2xl mr-1">
                    {renderedUser.username}
                  </p>
                  <p className="absolute bottom-0 left-0 right-0 text-right text-white font-bold font-itim text-3xl mr-1">
                    {renderedUser.score}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-[#D9D9D9] bg-opacity-55 w-fit rounded-xl p-4 mr-20">
            <div className="w-fit text-white font-itim text-4xl ml-10 ">
              <ol className="list-decimal" start={4}>
                {tableData.map((data, index) => (
                  <li
                    key={index}
                    className={
                      data.username === currentUserName
                        ? "bg-green-500 bg-opacity-60"
                        : ""
                    }
                  >
                    <div className="border-b-4 underline-offset-2 flex justify-between">
                      <span className="mr-64">{data.username}</span>
                      <span className="">{data.score}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
