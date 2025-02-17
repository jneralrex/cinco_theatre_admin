import React, { useState, useContext } from "react";
import { MdCancel } from "react-icons/md";
import { GlobalController } from "../Global";
import { useDispatch } from "react-redux";
import { createTheatreAdmin } from "../../../redux/slices/TheatreAdminSlice";

const TheatreAdminForm = () => {
  const { setAddTheatreAdmin } = useContext(GlobalController);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    role: "",
    password:""
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, phoneNumber, email, role, password } = formData;

    if (!username || !phoneNumber || !email || !role || !password) {
      alert("All fields are required.");
      return;
    }

    dispatch(createTheatreAdmin(formData))
      .unwrap()
      .then(() => {
        setFormData({
          username: "",
          phoneNumber: "",
          email: "",
          role: "",
          password:"",
        });
        setAddTheatreAdmin(""); 
      })
      .catch((error) => {
        console.error("Failed to create theatre admin:", error);
      });
  };

  return (
    <div className="bg-black/40 top-0 left-0 right-0 fixed flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        <button
          aria-label="Close"
          onClick={() => setAddTheatreAdmin("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Add Theatre Admin</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Admin Name"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            id="phoneNumber"
            placeholder="Phone Number"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="Admin Email"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            id="role"
            placeholder="Role (e.g. web-admin)"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.role}
            onChange={handleChange}
          />
           <input
            type="password"
            id="password"
            placeholder="*********"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
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
