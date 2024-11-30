import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./context/AuthContext";
import Cookies from "js-cookie";

function Header() {
  const navigate = useNavigate();

  const { setIsAuthenticated, isAuthenticated, data } = useContext(AuthContext);

  const handleLogout = () => {
    Cookies.remove("authToken");
    toast("Logout Successful");
    setIsAuthenticated(false);
    navigate("/login");
  };
  return (
    <div className="border border-b border-gray-400 bg-gray-100 h-14 flex justify-between px-5">
      <div className="flex items-center space-x-5">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/register">Register</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      {isAuthenticated && (
        <div>
          <p>{data?.name}</p>
          <p>{data?.email}</p>
        </div>
      )}
    </div>
  );
}

export default Header;
