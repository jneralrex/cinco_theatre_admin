import React, { useEffect } from 'react'
import { MdCancel } from "react-icons/md";
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Api from '../utils/AxiosInstance';
import axios from 'axios';



const Rowdetail = () => {
    const params = useParams()
    const id = params.id

    const [singleRow, setSingleRow] = useState({});
    const [error, SetError]= useState(null);
    
    const getSingleRow =async()=>{
        try {
            const resp = await Api.get(`row/rows/${id}`)
            if(resp.status === 200){
                setSingleRow(resp.data.data)
            }
        } catch (error) {
            SetError(error.message);
        }
    }
    useEffect(()=>{
        getSingleRow()
    },[id])

  return (
    <div className="bg-black/40 fixed inset-0 flex justify-center items-center min-h-screen z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            {/* Close Button */}
            <Link
            to={`/row-management/`}
              aria-label="Close"
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <MdCancel  size={24} />
            </Link>
    
            {/* Form */}
            <h2 className="text-xl font-bold text-center flex justify-center items-center mb-[-400px]">Class Detail</h2>
            <div>
            {
                singleRow ? (
                    <div className="flex justify-center items-center min-h-screen mt-[200px]">
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                        <p className="text-lg font-medium text-gray-700">Row Name: {singleRow.rowName}</p>
                        <p className="text-lg font-medium text-gray-700">Seat : {singleRow._id}</p>   
                    </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center min-h-screen">
                    <p className="text-center text-gray-500 text-xl">No post found</p>
                    </div>
                )
             }
            </div>
          </div>
        </div>
  )
}

export default Rowdetail
