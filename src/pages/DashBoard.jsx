import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllScreen } from "../redux/slices/ScreenSlice";

const DashBoard = () => {
  const dispatch = useDispatch();
   const loggedAdmin = useSelector(
      (state) => state.theatre?.theatre?.theatre?._id
    );

  // Users state

  const { loading: screensLoading, error: screensError, screens } = useSelector((state) => state.screens);


  // Fetch the users and locations data when the component mounts
  useEffect(() => {
    dispatch(getAllScreen(loggedAdmin));
  }, [dispatch]);

  return (
    <div className="max-h-screen grid grid-cols-1 md:grid-cols-3 w-full gap-2 p-3 md:pt-0 pb-16 lg:pb-5">
    
      {/* Screens Card */}
      <div className="w-full h-52 m-auto border border-red-100 justify-center flex items-center text-gray-900 bg-blue-200 hover:bg-black/80 hover:text-white ">
        {screensLoading ? (
          "Loading Screens..."
        ) : screensError ? (
          `Error: ${screensError}`
        ) : (
          `Total Screens: ${screens?.length || 0}`
        )}
      </div>
    </div>
  );
};

export default DashBoard;
