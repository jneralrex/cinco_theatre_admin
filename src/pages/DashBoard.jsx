import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../redux/slices/usersSlice"; // Adjust import based on your file structure

const DashBoard = () => {
 
  // Select the totalUsers from the Redux state
  const { totalUsers, loading, error } = useSelector((state) => state.users);

// const dispatch = useDispatch();
//   // Fetch the users data when the component mounts
//   useEffect(() => {
//     dispatch(getAllUser({ page: 1, limit: 10 }));
//   }, [dispatch]);

  return (
    <div className="max-h-screen grid grid-cols-1 md:grid-cols-3 w-full gap-2 p-3 md:pt-0 pb-16 lg:pb-5">
      {/* First card with dynamic totalUsers */}
      <div className="w-full h-52 m-auto border border-red-100 justify-center flex items-center text-white bg-gray-500 hover:bg-black/80">
        {loading ? 'Loading...' : error ? `Error: ${error}` : `Total Users: ${totalUsers}` }
      </div>

      {/* Static cards */}
      <div className="w-full h-52 m-auto border border-red-100 justify-center flex items-center text-white bg-yellow-200 hover:bg-black/80">
        20k users
      </div>

      <div className="w-full h-52 m-auto border border-red-100 justify-center flex items-center text-white bg-blue-200 hover:bg-black/80">
        20k users
      </div>

      {/* Additional static cards */}
      {/* (Other cards can be added here) */}
    </div>
  );
};

export default DashBoard;
