import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Api from '../utils/AxiosInstance';
import { useSelector } from 'react-redux';

const SeatingManagement = () => {
    // handle modal
    const [openModal, setOpenModal] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState (false)

    // handle error
    const [error, SetError]= useState(null);

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const loggedAdmin = useSelector(
      (state) => state.theatre?.theatre?.theatre?._id
    );
    // post seat
    const [seat, setSeat] = useState ({
        seatNumber:"",
        isBlocked: false,
        isBought:false,
        theatre: loggedAdmin   
      })

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setSeat((prevState) => ({
            ...prevState,
            [name]: name === "isBlocked" || name === "isBought" ? value === "true" : value
        }));
    
    };
    
    

      const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
            const resp = await Api.post(`seat`,seat)
            if(resp.status===201){
                getAllSeats()
            }
        } catch (error) {
          SetError(error.response.data.message);
        }
      }

      // get all seats

      const [allseats, setAllSeats] = useState([])

      const getAllSeats = async () => {
        try {
            const resp = await Api.get(`seat`)
            if (Array.isArray(resp.data.data)) {
              setAllSeats(resp.data.data);
          } else {
              setAllSeats([]); 
          }
        } catch (error) {
            SetError(error.message);
        }
      }

      useEffect(()=>{
        getAllSeats()
      },[])

      // delete seat
      const [deleteSeat, setDeleteSeat] = useState({})

      const handleDeleteClick =(id)=>{
        setDeleteSeat(id);
        setIsModalOpen(true)
      }
      const deletingSeat = async (id)=>{
          try {
              const resp = await Api.delete(`seat/${id}`)
              if(resp.status ===200){
                getAllSeats()
              }
          } catch (error) {
            SetError(error.message)
          }
      }

      const confirmDelete =async()=>{
        if(deleteSeat){
          await deletingSeat(deleteSeat);
          setDeleteSeat(null)
          setIsModalOpen(false)
        }
      }

      // edit seat

       // Edit class
    const [editedSeat, setEditedSeat] = useState('')
    const [seatToEdit, setseatToEdit] = useState(null)
    const [newEditseat, setNewEditseat]=useState({
      seatNumber:"",
      isBlocked: false,
      isBought:false
      })
    const [formErrors, setFormErrors]=useState({
      seatNumber:"",
      isBlocked: false,
      isBought:false
      })
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  
   
    const handleEditChange = (e) => {
      const { name, value } = e.target;
  
      setNewEditseat((prevState) => ({
          ...prevState,
          [name]: name === "isBlocked" || name === "isBought" ? value === "true" : value
      }));
  
  };

    const validateForm = () => {
      let errors = {};
    
      if (!newEditseat.seatNumber.trim()) {
        errors.seatNumber = "Seat Number cannot be empty";
      }
      if (!newEditseat.isBlocked) {
        errors.isBlocked = "This cannot be empty";
      }
      if (!newEditseat.isBought) {
        errors.isBought = "This cannot be empty";
      }
    
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };
   

    const handleEditSubmit = async(e)=>{
      e.preventDefault()
      if(validateForm()){
          try {
            const resp = await Api.put(`seat/${seatToEdit}`,newEditseat)
                      
            if(resp.status === 200){
              setEditedSeat(newEditseat)
              getAllSeats()
              setIsModalEditOpen(false)
            }
          } catch (error) {
            SetError(error.message); 
          }    
      }else{
        SetError("error in validation");
      }
    }
    const handleEditClick = (id,newSeat) => {
      setseatToEdit(id);
      setNewEditseat({
        seatNumber: newSeat.seatNumber || '', 
        isBlocked: newSeat.isBlocked || '',
        isBought: newSeat.isBought || '',
      });
      setIsModalEditOpen(true)
    }

  return (
    <div className='pb-7'>
        <form onSubmit={handleSubmit}  className='pt-[20px] pr-4'>
                <h1 className='font-bold text-[20px] mb-[20px]'>Seat Management</h1>
            <div>
                <p className='text-[18px] mb-2'>Seat Number</p>
                <input name='seatNumber' value={seat.seatNumber} placeholder='0' className="border p-2 rounded w-full mt-1" type="number" onChange={handleChange} />
            </div>
            <div>
                <p className='text-[18px] my-2 '>Is Blocked</p>
                <select
                    name="isBlocked"
                    value={seat.isBlocked}
                    className="border p-2 rounded w-full mt-1"
                    onChange={handleChange}
                    >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
                </select>
            </div>
            <div>
                <p className='text-[18px] my-2'>Is Bought</p>
                <select
                    name="isBought"
                    value={seat.isBought}
                    className="border p-2 rounded w-full mt-1"
                    onChange={handleChange}
                    >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
                </select>
            </div>
            <div className='flex justify-between mb-8'>
                <button
                
                type='submit'
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
                >
                Submit
                </button>
                <button
                onClick={handleOpenModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
                >
                All seats
                </button>
            </div>
            {   openModal && (
                    <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm ">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="p-2 border">SeatNumber</th>
                        <th className="p-2 border">Blocked</th>
                        <th className="p-2 border">Bought</th>
                        <th className="p-2 border">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {allseats.map((seat) => (
                            <tr key={seat._id} className="hover:bg-gray-100">
                              <td className="p-2 border">
                                <Link 
                                  to={`/seat-detail/${seat._id}`} 
                                >
                                  {seat.seatNumber}
                                </Link>
                              </td>
                              <td className="p-2 border">{seat.isBlocked? "Yes": "No"}</td>
                              <td className="p-2 border">{seat.isBought? "Yes": "No"}</td>
                              <td className="p-2 border">
                                <select
                                  className="border p-1"
                                  onChange={(e) => {
                                    const selectedAction = e.target.value;
                                    if (selectedAction === "edit") {
                                      handleEditClick(seat._id, seat); 
                                    } else if (selectedAction === "delete") {
                                      handleDeleteClick(seat._id);
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
            )
                 
            }
        </form>
        {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
                        <h3 className="font-bold text-lg">Confirm Delete?</h3>
                        <p>Are you sure you want to delete this seat?</p>
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
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Seat Number</label>
                      <input type="text" name="seatNumber" value={newEditseat.seatNumber} onChange={handleEditChange}  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
                      {formErrors.seatNumber && (
                        <p className="text-red-500 mt-1 text-[11px] ">{formErrors.seatNumber}</p>
                      )}
                    </div>
                    <div>
                      <p className="block text-sm font-medium text-gray-700">Is Blocked</p>
                      <select
                          name="isBlocked"
                          value={newEditseat.isBlocked}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          onChange={handleEditChange}
                          >
                      <option value="">Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                      </select>
                      {formErrors.isBlocked && (
                        <p className="text-red-500 text-[11px] mt-1">{formErrors.isBlocked}</p>
                      )}
                    </div>
                    <div>
                      <p className="block text-sm font-medium text-gray-700">Is Bought</p>
                      <select
                          name="isBought"
                          value={newEditseat.isBought}
                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          onChange={handleEditChange}
                          >
                      <option value="">Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                      </select>
                      {formErrors.isBought && (
                        <p className="text-red-500 text-[11px] mt-1">{formErrors.isBought}</p>
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

  )
}

export default SeatingManagement
