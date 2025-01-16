import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, deleteUser } from "../redux/slices/usersSlice";
import EditUser from "../components/globalController/forms/EditUser";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { loading, error, users, currentPage, totalPages } = useSelector(
    (state) => state.users
  );
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    dispatch(getAllUser({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(getAllUser({ page, limit: 10 }));
    }
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      dispatch(deleteUser(userId))
        .unwrap()
        .then(() => {
          dispatch(getAllUser({ page: currentPage, limit: 10 }));
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
        });
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null); 
  };

  return (
    <div className="max-h-screen w-full pt-2 pb-20 lg:pb-20">
      <h1 className="text-center text-xl font-bold mb-4">User Management</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : users.length > 0 ? (
        <>
          <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="p-2 border">{user.username || "N/A"}</td>
                  <td className="p-2 border">{user.email || "N/A"}</td>
                  <td className="p-2 border">{user.phoneNumber || "N/A"}</td>
                  <td className="p-2 border">{user.role || "N/A"}</td>
                  <td className="p-2 border">
                    <select
                      className="border p-1"
                      onChange={(e) => {
                        if (e.target.value === "edit") {
                          handleEditUser(user); 
                        }
                        if (e.target.value === "delete") {
                          handleDeleteUser(user._id);
                        }
                      }}
                    >
                      <option value="">Select Action</option>
                      <option value="edit">Edit</option>
                      <option value="delete">Delete</option>
                      <option value="view">View</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-gray-300 text-white rounded-md"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-gray-300 text-white rounded-md"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {/* Edit User Modal */}
          <EditUser
            isOpen={isModalOpen}
            onClose={closeModal}
            user={selectedUser}
          />
        </>
      ) : (
        <p className="text-center">No users available.</p>
      )}
    </div>
  );
};

export default UserManagement;
