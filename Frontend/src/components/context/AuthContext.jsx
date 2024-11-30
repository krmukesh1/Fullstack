import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  let token = Cookies.get("authToken");
  const fetchData = () => {
    axios
      .post(
        "http://localhost:3001/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setData(res.data.data);
          setIsAuthenticated(res.data.status);
          setLoading(false);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("error while feting profile data", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ data, isAuthenticated, loading, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
