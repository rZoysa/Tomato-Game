import { Profile_btn } from "./profile_btn";

function instructions() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6">
        <Profile_btn />
        <div className="text-2xl font-itim ml-10 text-white">
          <h1>
           <span className="font-bold text-3xl"> Objective: </span>Your goal is to find the hidden number within the
            mathematical equations before time runs out and without losing all
            your lives.
          </h1>

          <h1>
            <p className="font-bold text-3xl">
            Difficulty Levels:
            </p>
            <div className="ml-16">
              <ul className="list-disc">
                <li>
                  <h1>Certified Cherry: You have 5 lives and 30 seconds per question.</h1>
                </li>
                <li>
                  <h1>Getting There: You have 3 lives and 20 seconds per question.</h1>
                </li>
                <li>
                  <h1>Tomato Crusher: You have 3 lives and 15 seconds per question.</h1>
                </li>
              </ul>
            </div>
          </h1>

          <h1>
          <p className="font-bold text-3xl">
            Gameplay:
            </p>
            <div className="ml-16">
              <ul className="list-disc">
                <li>
                  <h1>
                    Each question will display a mathematical equation with some
                    numbers hidden by a tomato.
                  </h1>
                </li>

                <li>
                  <h1>
                    If you select the correct number, you&apos;ll earn a point
                    and move on to the next question.
                  </h1>
                </li>
                <li>
                  <h1>
                    Be careful! Selecting the wrong number or if the timer runs
                    out it will cost you a life.
                  </h1>
                </li>
                <li>
                  <h1>
                    If you lose all your lives or run out of time, the game will
                    end.
                  </h1>
                </li>
              </ul>
            </div>
          </h1>

         

          <h1>
          <p className="font-bold text-3xl">
            Hints:
            </p>
            <div className="ml-16">
              <ul className="list-disc">
                <li>
                  <h1> Pay attention to the equations.</h1>
                </li>
                <li>
                  <h1>
                    Don&apos;t forget to keep an eye on the timer and your
                    remaining lives.
                  </h1>
                </li>
              </ul>
            </div>
          </h1>

          <h1>
          <span className="font-bold text-3xl">Restart: </span>If you wish to restart the game at any time, you can do so
            from the restart button.
          </h1>
          <h1 className="text-center text-4xl mt-7">
            Have Fun!: Enjoy the challenge and test your math skills in the
            Tomato Quiz Game!
          </h1>
        </div>
      </div>
    </div>
  );
}

export default instructions;
