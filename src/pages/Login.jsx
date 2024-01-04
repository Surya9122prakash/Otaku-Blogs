import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import transition from "../components/Transition";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.error("Login Error:", err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg text-yellow-400 md:text-xl font-extrabold">
          <Link to="/">Otaku Blogs</Link>
        </h1>
        <h3 className="text-black font-semibold">
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left text-yellow-400">
            Log in to your account
          </h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-yellow-400 outline-0 bg-black text-yellow-400 placeholder:text-yellow-400"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-yellow-400 outline-0 bg-black text-yellow-400 placeholder:text-yellow-400"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-black bg-yellow-400 rounded-lg hover:bg-yellow-300"
          >
            Log in
          </button>
          {error && (
            <h3 className="text-orange-400 text-sm ">Something went wrong</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p className="text-yellow-400">New here?</p>
            <p className="text-orange-400 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default transition(Login);
