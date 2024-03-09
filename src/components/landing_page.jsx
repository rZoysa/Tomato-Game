import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Landing_Page = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      // User is logged in
      navigate('/home');
    } else {
      // User is not logged in
      console.log('User is not logged in.');
    }
  }, [userId, navigate]); // Add navigate to the dependencies array
  
  const directToLogin = () => {
    navigate("/Login");
  };

  const directToRegistration = () => {
    navigate("/Registration");
  };

  const directToHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6 flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <p className="text-6xl mr-5 select-none">Tomato Quiz Game </p>
              <img src="" alt="" srcSet="Vector.png" className="select-none"/>
            </div>
            <br />
            <h1 className="text-4xl mb-10 font-itim select-none">Ready to play!</h1>

            <div className="flex flex-col items-center w-full">
              <div className="mb-5 w-full flex items-center justify-center space-x-10">
                <button
                  type="button"
                  onClick={directToLogin}
                  className="bg-blue-500 text-white text-2xl w-3/12 px-4 py-2 rounded-md"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={directToRegistration}
                  className="bg-blue-500 text-white text-2xl w-3/12 px-4 py-2 rounded-md"
                >
                  Register
                </button>
              </div>

              <button
                type="button"
                onClick={directToHome}
                className="bg-blue-500 text-white text-2xl px-4 py-2 rounded-md"
              >
                Play as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing_Page;
