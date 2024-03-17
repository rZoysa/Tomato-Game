import { useState, useEffect } from "react";
import { app } from "/firebaseConfig";
import { getDatabase, ref, query, orderByChild, limitToLast, get,} from "firebase/database";
import { Profile_btn } from "./profile_btn";

function Leaderboard() {
  const [difficulty, setDifficulty] = useState("easy");
  const [leaderboardData, setLeaderboardData] = useState([]);

  const dbRef = getDatabase(app);

  const fetchLeaderboardData = async () => {
    const difficultyRef = query(
      ref(dbRef, `users`, orderByChild(difficulty), limitToLast(10))
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
      setLeaderboardData(leaderboardData);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [difficulty]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6">
        <Profile_btn/>
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
          <div className="mb-4">
            <label htmlFor="difficulty">Select Difficulty:</label>
            <select
              id="difficulty"
              className="ml-2 p-2 border border-gray-300 rounded"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Rank</th>
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((data, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{data.username}</td>
                    <td className="border px-4 py-2">{data.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
