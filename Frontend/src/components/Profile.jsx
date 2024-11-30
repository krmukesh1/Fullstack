// import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const Profile = () => {
  const { data, loading } = useContext(AuthContext);

  return (
    <div>
      <p className="text-center font-semibold mt-3">
        {loading && "Data is loading..."}
      </p>
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Name : {data?.name}
          </h2>
          <p className="text-gray-700 text-base mb-2">Email: {data?.email}</p>
          <p className="text-gray-700 text-base">ID: {data?.id}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
