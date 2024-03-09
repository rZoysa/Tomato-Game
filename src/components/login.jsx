import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth(app); // Get the authentication instance
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user.uid);
      // Here you can navigate to the home page or perform any other action upon successful login
      navigate("/home");
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-11/12 h-5/6 flex justify-center items-center">
        <div className="bg-white w-4/12 text-center rounded-3xl">
          <img
            src=""
            alt=""
            srcSet="noto_tomato.png"
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
                  required // Make password input required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/5 mb-8"
            >
              Log In
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
          <h1 className="text-lg mb-10">
            Don&apos;t have and Account?
            <a href="/Registration" className="cursor-pointer text-[#0090CE]">
              &nbsp;Sign Up
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
