import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-16 right-6 md:right-32 rounded-md p-4 space-y-4">
      <h3 className="text-yellow-400 text-sm cursor-pointer">
        <Link to="/">Home</Link>
      </h3>
      {!user && (
        <h3 className="text-yellow-400 text-sm cursor-pointer">
          <Link to="/login">Login</Link>
        </h3>
      )}
      {!user && (
        <h3 className="text-yellow-400 text-sm cursor-pointer">
          <Link to="/register">Register</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-yellow-400 text-sm cursor-pointer">
          <Link to={"/profile/" + user._id}>Profile</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-yellow-400 text-sm cursor-pointer">
          <Link to="/write">Write</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-yellow-400 text-sm cursor-pointer">
          <Link to={"/myblogs/" + user._id}>My blogs</Link>
        </h3>
      )}
      {user && (
        <h3
          onClick={handleLogout}
          className="text-yellow-400 text-sm cursor-pointer"
        >
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;
