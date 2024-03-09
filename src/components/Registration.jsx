import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, child } from "firebase/database";
import { app } from "/firebaseConfig";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }

    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const uid = user.uid;

      const dbRef = ref(getDatabase(app));

      await set(child(dbRef, `users/${uid}`), {
        username: username,
        email: email,
      });

      console.log("User registered:", user.uid);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordMatchError("*Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordMatchError("*Passwords do not match");
    } else {
      setPasswordMatchError("");
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
          <form onSubmit={handleRegistration}>
            <div className="mx-auto w-5/6">
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="username"
                  className="text-gray-700 text-sm font-bold mb-2 text-left"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border rounded-md p-2 mb-2 shadow-md border-solid border-[#1D87C3]"
                  required
                />
              </div>
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
                  onChange={handlePasswordChange}
                  className="border rounded-md p-2 mb-2 shadow-md border-solid border-[#1D87C3]"
                  required
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-700 text-sm font-bold mb-2 text-left"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="border rounded-md p-2 mb-2 shadow-md border-solid border-[#1D87C3]"
                  required
                />
                {passwordMatchError && (
                  <p className="text-red-500">{passwordMatchError}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/5 mb-8"
            >
              Register
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
          <h1 className="text-lg mb-10">
            Already have an account?
            <a href="/Login" className="cursor-pointer text-[#0090CE]">
              &nbsp;Log In
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Registration;
