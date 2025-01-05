import React, { useContext } from "react";
import { MdCancel } from "react-icons/md";
import { GlobalController } from "../Global";

const TheatreAdminForm = () => {
  const { addTheatreAdmin, setAddTheatreAdmin } = useContext(GlobalController);

  return (
    <div className="bg-black/40 top-0 left-0 right-0 fixed flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={() => setAddTheatreAdmin("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        {/* Form Title */}
        <h2 className="text-xl font-bold text-center mb-4">Add Theatre Admin</h2>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            id="adminName"
            placeholder="Admin Name"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            id="adminEmail"
            placeholder="Admin Email"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            id="adminPassword"
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default TheatreAdminForm;
