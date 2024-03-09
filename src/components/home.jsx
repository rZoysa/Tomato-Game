const Home = () => {
  const userId = localStorage.getItem("userId");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6">

        <div className="flex justify-between items-center ">
          <div className="ml-10 mt-20">
            <h1 className="text-6xl font-bold">Tomato Quiz Game</h1>
          </div>
          <div className="mr-10">
            <p>{userId}</p>
          </div>
        </div>

        <div className="flex items-center">
        <ul className="text-3xl font-itim text-white list-disc ml-10">
          <li className="hover:text-4xl">
            <a href="/difficulty">Play</a>
          </li>
          <li className="hover:text-4xl">
            <a href="/leaderboard">Leaderboard</a>
          </li>
          <li className="hover:text-4xl">
            <a href="/instructions">Instructions</a>
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default Home;
