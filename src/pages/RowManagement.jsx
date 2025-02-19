
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Api from '../utils/AxiosInstance';
import { useSelector } from 'react-redux';
import axios from 'axios';

const RowManagement = () => {


    // handle modal
    const [openModal, setOpenModal] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState (false)

    //handle error
    const [error,SetError] = useState(null);

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const loggedAdmin = useSelector(
      (state) => state.theatre?.theatre?.theatre?._id
    );
    // post row
    const [row, setRow] = useState({
      rowName: "",
      seatIds: [],  
      theatre: loggedAdmin
  });
  
  const handleChange = (e) => {
      const { name, value, options } = e.target;
  
      if (name === "seatIds") {
          const selectedSeats = options ? 
              Array.from(options)
                  .filter(option => option.selected)
                  .map(option => option.value) 
              : [];
  
          setRow((prevState) => ({
              ...prevState,
              seatIds: selectedSeats.length > 0 ? selectedSeats : [] 
          }));
      } else {
          setRow((prevState) => ({
              ...prevState,
              [name]: value,
          }));
      }
  
  };
  
  const handleSubmit = async (e) => {
      e.preventDefault();  
      try {
          const payload = {
              ...row,
              seatIds: row.seatIds || []  
          };
          const resp = await Api.post(`/row/rows`,payload)
          getAllRow();
      } catch (error) {
        SetError(error.response?.data?.message || "An error occurred");
      }
  };
  

      // get all seats for the select field (select)
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
            SetError(error.message)
        }
      };

      // get all rows
      const [allRow, setAllRow] = useState([])
      
      const getAllRow = async () => {
        try {
            const resp = await Api.get(`row/all-rows/${loggedAdmin}`)
            if (Array.isArray(resp.data.data)) {
              setAllRow(resp.data.data);
          } else {
            setAllRow([]); 
          }
        } catch (error) {
            SetError(error)
        }
      }

      useEffect(()=>{
        getAllSeats()
        getAllRow()
      },[]);


      // delete row
      const [deleteRow, setDeleteRow] = useState({})

      const handleDeleteClick =(id)=>{
        setDeleteRow(id);
        setIsModalOpen(true)
      }
      const deletingRow= async (id)=>{
          try {
              const resp = await Api.delete(`row/rows/${id}`)
              if(resp.status ===200){
                getAllRow()
              }
          } catch (error) {
            SetError(error.message)
          }
      }

      const confirmDelete =async()=>{
        if(deleteRow){
          await deletingRow(deleteRow);
          setDeleteRow(null)
          setIsModalOpen(false)
        }
      }


       // Edit row
    const [editedRow, setEditedRow] = useState('')
    const [rowToEdit, setRowToEdit] = useState(null)
    const [newEditRow, setNewEditRow]=useState({
      rowName:"",
      seatIds: ""
      })
    const [formErrors, setFormErrors]=useState({
      rowName:"",
      seatIds: ""
      })
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  
   
    const handleEditChange = (e) => {
      const { name, value } = e.target;
      setNewEditRow((prevState) => ({
          ...prevState,
          [name]: value
      }));
    };

    const validateForms = () => {
      let errors = {};
    
      
      if (!newEditRow.rowName) {
        errors.rowName = "Row name cannot be empty";
      }
    
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };
   

    const handleEditSubmit = async(e)=>{
      e.preventDefault()
      if(validateForms()){
          try {
            const resp = await Api.put(`row/rows/${rowToEdit}`,newEditRow)
            if(resp.status === 200){
              setEditedRow(newEditRow)
              getAllRow()
              setIsModalEditOpen(false)
            }
          } catch (error) {
            SetError(error.message)
          }    
      }else{
        SetError("error in validation")
      }
    }
    const handleEditClick = (id,newRow) => {
      setRowToEdit(id); 
      setNewEditRow({
        rowName: newRow.rowName || '', 
        seatIds: newRow.seatIds || '',
        
      });
      setIsModalEditOpen(true)
    }

  return (
    <div className='pb-7'>
        <form onSubmit={handleSubmit}  className='pt-[20px] pr-4'>
          <div>

                  <h1 className='font-bold text-[20px] mb-[20px]'>Row Management</h1>
              <div>
                  <p className='text-[18px] mb-2'>Row Name</p>
                  <input name='rowName' value={row.rowName} placeholder='' className="border p-2 rounded w-full mt-1" type="text" onChange={handleChange} />
              </div>
              <div>
                  <p className='text-[18px] mb-2'>Seat</p>
                  <select name="seatIds" value={row.seatIds} id="" className="border p-2 rounded w-full mt-1" multiple onChange={handleChange}>
                      <option value="">Select</option>
                      {
                        allseats.map((seat)=>(
                          <option key={seat._id} value={seat._id}>{seat.seatNumber}</option>
                        ))
                      }
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
                  All Rows
                  </button>
              </div>
          </div>
            {   openModal && (
                    <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm ">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="p-2 border">Row Name</th>
                        <th className="p-2 border">Seats</th>
                        <th className="p-2 border">Actions</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                    {allRow.map((row) => (
                            <tr key={row._id} className="hover:bg-gray-100">
                              <td className="p-2 border">
                                <Link 
                                  to={`/row-detail/${row._id}`} 
                                >
                                  {row.rowName}
                                </Link>
                              </td>
                              <td className="p-2 border">{row._id}</td>
                              <td className="p-2 border">
                                <select
                                  className="border p-1"
                                  onChange={(e) => {
                                    const selectedAction = e.target.value;
                                    if (selectedAction === "edit") {
                                      handleEditClick(row._id, row); 
                                    } else if (selectedAction === "delete") {
                                      handleDeleteClick(row._id);
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
                      <label className="block text-sm font-medium text-gray-700">Row Name</label>
                      <input type="text" name="rowName" value={newEditRow.rowName} onChange={handleEditChange}  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/>
                      {formErrors.rowName && (
                        <p className="text-red-500 mt-1 text-[11px] ">{formErrors.rowName}</p>
                      )}
                    </div>
                    <div>
                      <p className='text-[18px] mb-2'>Seat</p>
                      <select name="seatIds" value={newEditRow.seatIds}  id="" className="mt-1 block w-full p-2 border border-gray-300 rounded-md"  onChange={handleEditChange}>
                          <option value="">Select</option>
                          {
                            allseats.map((seat)=>(
                              <option key={seat._id} value={seat._id}>{seat.seatNumber}</option>
                            ))
                          }
                      </select>
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

export default RowManagement
