import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../redux/slices/usersSlice";

const UserManagement = () => {
  const dispatch = useDispatch();

  // Extracting loading, error, and users from the Redux store
  const { loading, error, users } = useSelector((state) => state.users);

  // Fetch all users when the component mounts
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  return (
    <div className="max-h-screen w-full pt-2 pb-20 lg:pb-20">
      <h1 className="text-center text-xl font-bold mb-4">User Management</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : users.length > 0 ? (
        <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="p-2 border">{user.username || "N/A"}</td>
                <td className="p-2 border">{user.email || "N/A"}</td>
                <td className="p-2 border">{user.phoneNumber || "N/A"}</td>
                <td className="p-2 border">
                  <select className="border p-1">
                    <option value="">Select Action</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No users available.</p>
      )}
    </div>
  );
};

export default UserManagement;
