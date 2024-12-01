import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

function BlogView() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchData = () => {
    axios
      .get(
        `http://localhost:3001/blog/blogs/${id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error while fetch data", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex p-4">
      <div className="p-6 m-2 max-w-fit bg-white transition-transform transform">
        {data ? (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {data?.title}
            </h2>
            <p className="text-gray-600 mb-4">{data?.content}</p>
            <p className="text-gray-500 text-sm mb-2">Author: {data?.author}</p>
            <p className="text-gray-400 text-xs">
              {new Date(data?.updatedAt).toLocaleDateString()}
            </p>
          </>
        ) : (
          <p>Blog not found</p>
        )}
      </div>
    </div>
  );
}

export default BlogView;
