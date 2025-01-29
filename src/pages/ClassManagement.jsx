import React, { useContext, useEffect, useState } from 'react'
import AddEvent from "../components/globalController/triggers/AddEvent";
import AddClass from '../components/globalController/triggers/AddClass';
import axios from 'axios';
import { GlobalController } from '../components/globalController/Global';
const mockUsers = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  status: `filled`,
  phone: `123-456-789${index % 10}`,
}));

const ClassManagement = () => {
      const { newClass} = useContext(GlobalController);
    
    
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
            alert("all classes gotten successfully")
            setAllClasses(resp.data.allClasses)
            console.log(resp.data.allClasses);
          }
        } catch (error) {
          console.log(error.message); 
        }
      }
      
      useEffect (()=>{
      getClass()
    },[])

    //delete class
    const [classToDelete, setClassToDelete] = useState(null)

    const handleDeleteClick = (postid)=>{
      setClassToDelete(postid),
      setIsModalOpen(true)
    }

    const deleteClass = async()=>{
        try {
            const resp = await Api.delete(`class/classes/${postid}`);
            if(resp.status === 200){
              alert("class deleted successfully")
            }
            else{
              console.log(resp.data.data);
            }
        } catch (error) {
          console.log(error.message);
        }
    }

    const confirmDelete = () => {
      if (classToDelete) {
          deleteClass(classToDelete); 
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

    const validateForm =()=>{
      let errors={};
      if(!newEditClass.className.trim()){
        errors.className ="Class name cannot be empty"
      }
      if(!newEditClass.numberOfRows.trim()){
        errors.numberOfRows ="Number of rows cannot be empty"
      }
      if(!newEditClass.price.trim()){
        errors.price ="price cannot be empty"
      }
      if(!newEditClass.availability.trim()){
        errors.availability ="This cannot be empty"
      }
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
  }

    const handleEditClick = (id,newClass) => {
      setClassToEdit(id),
      setNewEditClass({
        className: newClass.className || '', 
        numberOfRows: newClass.numberOfRows || '',
        price: newClass.price || '',
        availability: newClass.availability || '',
      })
      setIsModalEditOpen(true)
    }



    const handleSubmit = async(e)=>{
      e.preventDefault()

      if(validateForm()){
          try {
            const resp = await Api.put(`class/classes/${classToEdit}`,newEditClass)
            if(resp.status === 200){
              alert("class updated successfully")
              setEditedClass(resp.data.data)
              setIsModalEditOpen(false)
            }
          } catch (error) {
            console.log(error.message); 
          }    
      }else{
        console.log("error in validation");    
      }
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
          <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Number</th>
                <th className="p-2 border">Availability</th>
              </tr>
            </thead>
            <tbody>
              {allClasses.map((classs) => (
                <tr key={classs.id} className="hover:bg-gray-100">
                  <td className="p-2 border">{classs.className}</td>
                  <td className="p-2 border">{classs.price}</td>
                  <td className="p-2 border">{classs.numberOfRows}</td>
                  <td className="p-2 border">{classs.availability}</td>
                  <td className="p-2 border">
                    <select className="border p-1">
                    <option value="">action</option>
                      <option onClick={()=>handleEditClick(classs.id)} value="">Edit</option>
                      <option onClick={()=>handleDeleteClick(classs.id, classs)} value="">Delete</option>
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
                        <p>Are you sure you want to delete this post?</p>
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
                    <div className="modal">
                      <h2>Edit Class</h2>
                      <form onSubmit={handleSubmit}>
                        <label>
                          Class Name:
                          <select name="className" value={newEditClass.className} onChange={handleChange} className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" >
                            <option value="">Select</option>
                            <option value="vip">VIP</option>
                            <option value="Standard">Standard</option>
                            <option value="Economy">Economy</option>
                          </select>
                          {formErrors.className && (
                            <p className='text-red-700 text-[9px] absolute mt-[50px]'>{formErrors.className}</p>
                          )}
                        </label>
                        <label>
                          Number of Rows:
                          <input
                            type="number"
                            name="numberOfRows"
                            value={newEditClass.numberOfRows}
                            onChange={handleChange}
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {formErrors.numberOfRows && (
                            <p className="error-text">{formErrors.numberOfRows}</p>
                          )}
                        </label>
                        <label>
                          Price :
                          <input
                            type="text"
                            name="price"
                            value={newEditClass.price}
                            placeholder="Price"
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleChange}
                          />
                          {formErrors.price && (
                            <p className="error-text">{formErrors.price}</p>
                          )}
                        </label>
                        <label>
                          Availability :
                          <select   name="availability" value={newEditClass.availability} onChange={handleChange} className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                          {formErrors.availability && (
                            <p className="error-text">{formErrors.availability}</p>
                          )}
                        </label>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsModalEditOpen(false)}>
                          Cancel
                        </button>
                      </form>
                    </div>
                  )}

      </div>
      
    );
}

export default ClassManagement