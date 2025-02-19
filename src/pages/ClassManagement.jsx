import React, { useContext, useEffect, useState } from 'react'
import AddEvent from "../components/globalController/triggers/AddEvent";
import AddClass from '../components/globalController/triggers/AddClass';
import axios from 'axios';
import { GlobalController } from '../components/globalController/Global';
import { Link } from 'react-router-dom';
import Api from '../utils/AxiosInstance';
const mockUsers = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  status: `filled`,
  phone: `123-456-789${index % 10}`,
}));

const ClassManagement = () => {
      const { newClass} = useContext(GlobalController);
    
    const [error, SetError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    
    const totalPages = Math.ceil(mockUsers.length / rowsPerPage);
    const displayedUsers = mockUsers.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
    
    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };
    
    const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };
    
    //get all classes
    const [allClasses, setAllClasses] = useState ([])
    
    const getClass= async ()=>{
      try {
         const resp = await Api.get(`class/classes`);
        if(resp.status === 200){
            setAllClasses(resp.data)
          }
        } catch (error) {
          SetError(error.message);
        }
      }
      useEffect (()=>{
      getClass()
    },[])

          //delete class
          const [classToDelete, setClassToDelete] = useState()

          const handleDeleteClick = (postid)=>{
            setClassToDelete(postid);
            setIsModalOpen(true);
          }

          const deleteClass = async(postid)=>{
              try {
                 const resp = await Api.delete(`class/classes/${postid}`);
                  if(resp.status === 200){
                    getClass()
                  }
              } catch (error) {
                SetError(error.message)
              }
          }

          const confirmDelete = async() => {
            if (classToDelete) {
               await deleteClass(classToDelete); 
                setClassToDelete(null); 
                setIsModalOpen(false); 
            }
        };
       


    // Edit class
    const [editedClass, setEditedClass] = useState('')
    const [classToEdit, setClassToEdit] = useState(null)
    const [newEditClass, setNewEditClass]=useState({
        className:"",
        numberOfRows:"",
        price:"",
        availability:""
      })
    const [formErrors, setFormErrors]=useState({
        className:"",
        numberOfRows:"",
        price:"",
        availability:""
      })
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewEditClass((prevState) => ({
          ...prevState,
          [name]: value
      }));
      
    };

    const validateForm = () => {
      let errors = {};
    
      if (!newEditClass.className.trim()) {
        errors.className = "Class name cannot be empty";
      }
      if (!String(newEditClass.numberOfRows).trim() || isNaN(newEditClass.numberOfRows)) {
        errors.numberOfRows = "Number of rows must be a valid number";
      }
      if (!String(newEditClass.price).trim() || isNaN(newEditClass.price)) {
        errors.price = "Price must be a valid number";
      }
      if (!newEditClass.availability) {
        errors.availability = "This cannot be empty";
      }
    
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };
   

    const handleSubmit = async(e)=>{
      e.preventDefault()
      if(validateForm()){
          try {
            const resp = await Api.put(`class/classes/${classToEdit}`,newEditClass)
            if(resp.status === 200){
              setEditedClass(newEditClass)
              setAllClasses((prevClasses) =>
                prevClasses.map((classs) =>
                  classs.id === classToEdit ? { ...classs, ...newEditClass } : classs
                )
              );
              getClass()
              setIsModalEditOpen(false)
            }
          } catch (error) {
            SetError(error.message)
          }    
      }else{
        SetError("error in validation")
      }
    }
    const handleEditClick = (id,newClass) => {
      setClassToEdit(id);
      setNewEditClass({
        className: newClass.className || '', 
        numberOfRows: newClass.numberOfRows || '',
        price: newClass.price || '',
        availability: newClass.availability || '',
      });
      setIsModalEditOpen(true)
    }

    return (
      <div>
        <div className="max-h-screen w-full  pt-2 pb-20 lg:pb-20">
          <div className="flex flex-row items-center justify-between w-[90%] m-auto">
            <AddClass />
            <div className="text-center text-xl font-bold mb-4">
              Class Management
            </div>
          </div>
          <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm mt-3">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Number</th>
                <th className="p-2 border">Availability</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
            {allClasses.map((classs) => (
                    <tr key={classs._id} className="hover:bg-gray-100">
                      <td className="p-2 border">
                        <Link 
                          to={`/class-detail/${classs._id}`} 
                        >
                          {classs.className}
                        </Link>
                      </td>
                      <td className="p-2 border">{classs.price}</td>
                      <td className="p-2 border">{classs.numberOfRows}</td>
                      <td className="p-2 border">{classs.availability? "Yes": "No"}</td>
                      <td className="p-2 border">
                        <select
                          className="border p-1"
                          onChange={(e) => {
                            const selectedAction = e.target.value;
                            if (selectedAction === "edit") {
                              handleEditClick(classs._id, classs); 
                            } else if (selectedAction === "delete") {
                              handleDeleteClick(classs._id);
                            }
                          }}
                        >
                          <option value="">action</option>
                          <option value="edit">Edit</option>
                          <option value="delete">Delete</option>
                        </select>
                      </td>
                    </tr>
                  ))}
            
            </tbody>
          </table>
          <div className="flex justify-between items-center w-[90%] m-auto mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
        {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
                        <h3 className="font-bold text-lg">Confirm Delete?</h3>
                        <p>Are you sure you want to delete this class?</p>
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={confirmDelete}
                                className="btn bg-red-600 text-white rounded-xl px-4 py-2"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="btn bg-gray-300 text-black rounded-xl px-4 py-2"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isModalEditOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
                  <h3 className="font-bold text-lg mb-4">Edit Class</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Class Name</label>
                      <select
                        name="className"
                        value={newEditClass.className}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select</option>
                        <option value="vip">VIP</option>
                        <option value="Standard">Standard</option>
                        <option value="Economy">Economy</option>
                      </select>
                      {formErrors.className && (
                        <p className="text-red-500 mt-1 text-[11px] ">{formErrors.className}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Number of Rows</label>
                      <input
                        type="number"
                        name="numberOfRows"
                        value={newEditClass.numberOfRows}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                      {formErrors.numberOfRows && (
                        <p className="text-red-500 text-[11px] mt-1">{formErrors.numberOfRows}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="text"
                        name="price"
                        value={newEditClass.price}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                      {formErrors.price && (
                        <p className="text-red-500 text-[11px] mt-1">{formErrors.price}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Availability</label>
                      <select
                        name="availability"
                        value={newEditClass.availability}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                      {formErrors.availability && (
                        <p className="text-red-500 text-[11px] mt-1">{formErrors.availability}</p>
                      )}
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => setIsModalEditOpen(false)}
                        className="px-4 py-2 bg-gray-300 text-black rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
      </div>
      
    );
}

export default ClassManagement