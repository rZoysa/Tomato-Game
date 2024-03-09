const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6 flex justify-center items-center">
        <div>
          <h1>Welcome to Your Text-Based Browser Game!</h1>
          <p>
            This is the home page of your game. From here, you can navigate to
            various sections of the game.
          </p>
          <ul>
            <li>
              <a href="/difficulty">Play</a>
            </li>
            <li>
              <a href="/leaderboard">Leaderboard</a>
            </li>
            <li>
              <a href="/instructions">Instructions</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
