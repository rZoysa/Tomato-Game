import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Your login logic goes here
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#3191B0] bg-opacity-80 rounded-3xl w-4/5 h-4/5 flex justify-center items-center">
        <div className="bg-white w-2/5 h-4/5 text-center rounded-3xl">
          <img src="" alt="" srcSet="noto_tomato.png" className="w-3/12 mx-auto block mb-5"/>
          <form>
            <div className="mx-auto w-5/6">
          <div className="mb-4 flex flex-col">
          <label htmlFor="email" className="text-gray-700 text-sm font-bold mb-2 text-left">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-md p-2 mb-2"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="password" className="text-gray-700 text-sm font-bold mb-2 text-left">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md p-2 mb-2"
          />
        </div>
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Log In
        </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
