import { Navigate, Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = () => {
  // const token = localStorage.getItem("token");
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="login" />;
};

export default ProtectedRoute;
