import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "/firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when logging in

    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user.uid);

      const db = getDatabase(app);
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setUserSession(user.uid, userData.username);
      }

      navigate("/home", {replace : true});
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/user-disabled":
          setError("Your account has been disabled.");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;
        default:
          setError(
            "An error occurred during login. Please try again later."
          );
          break;
      }
    } finally {
      setLoading(false); // Set loading state to false when login process finishes
    }
  };

  const setUserSession = (userId, userName) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6 flex justify-center items-center">
        <div className="absolute top-28 left-28 mt-4 ml-4">
          <Link to="/">
            <img src="back.png" alt="" />
          </Link>
        </div>
        <div className="bg-white w-4/12 text-center rounded-3xl">
          <img
            src="noto_tomato.png"
            alt=""
            className="w-3/12 mx-auto block mb-10"
          />
          <form onSubmit={handleLogin}>
            <div className="mx-auto w-5/6">
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="email"
                  className="text-gray-700 text-sm font-bold mb-2 text-left"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-md p-2 mb-2 shadow-md border-solid border-[#1D87C3]"
                  required
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="password"
                  className="text-gray-700 text-sm font-bold mb-2 text-left"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-md p-2 mb-6 shadow-md border-solid border-[#1D87C3]"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md w-1/5 mb-8 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm2-2.582V20c4.418 0 8-3.582 8-8h-4a3.993 3.993 0 01-3.532 3.984l-.734.147z"
                  ></path>
                </svg>
              ) : (
                "Log In"
              )}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
          <h1 className="text-lg mb-10">
            Don&apos;t have an Account?
            <Link to="/Registration" className="cursor-pointer text-[#0090CE]">
              &nbsp;Sign Up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
