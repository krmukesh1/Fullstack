import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = () => {
  // const token = localStorage.getItem("token");
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="login" />
  );
};

export default ProtectedRoute;
