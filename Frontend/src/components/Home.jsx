import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  let token = Cookies.get("authToken");
  const navigate = useNavigate();
  const fetchData = () => {
    axios
      .get(
        "http://localhost:3001/blog/blogs",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setData(res.data);
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
    <div className="flex flex-wrap justify-center gap-4 p-4 cursor-pointer">
      {data?.map((item) => (
        <div
          onClick={() => navigate(`/${item?._id}`)}
          key={item._id}
          className="border border-gray-200 shadow-md rounded-lg p-6 m-2 max-w-sm bg-white transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {item?.title}
          </h2>
          <p className="text-gray-600 mb-4">
            {item?.content?.substring(0, 100)}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm mb-2">
              Author: {item?.author}
            </p>
            <p className="text-gray-400 text-xs">
              {new Date(item?.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
