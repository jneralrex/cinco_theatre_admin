import React, { useEffect } from 'react'
import { MdCancel } from "react-icons/md";
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Api from '../utils/AxiosInstance';



const Classdetail = () => {
    const params = useParams()
    const id = params.id;

    const [error,SetError]= useState(null)
    const [singleClasses, setSingleClasses] = useState({})

    const getSingleClass =async()=>{
        try {
            const resp = await Api.get(`class/classes/${id}`)            
            if(resp.status === 200){
                setSingleClasses(resp.data)
            }
        } catch (error) {
            SetError(error.message)
        }
    }

    useEffect(()=>{
        getSingleClass()
    },[id])

  return (
    <div className="bg-black/40 fixed inset-0 flex justify-center items-center min-h-screen z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            {/* Close Button */}
            <Link
            to={`/class/`}
              aria-label="Close"
              onClick={() => setAddClass("")}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <MdCancel  size={24} />
            </Link>
    
            {/* Form */}
            <h2 className="text-xl font-bold text-center flex justify-center items-center mb-[-400px]">Class Detail</h2>
            <div>
            {
                singleClasses ? (
                    <div className="flex justify-center items-center min-h-screen mt-[200px]">
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                        <p className="text-lg font-medium text-gray-700">Name: {singleClasses.className}</p>
                        <p className="text-lg font-medium text-gray-700">Price: {singleClasses.price}</p>
                        <p className="text-lg font-medium text-gray-700">Number of Rows: {singleClasses.numberOfRows}</p>
                        <p className="text-lg font-medium text-gray-700">
                        Availability: {singleClasses.availability ? (
                            <span className="text-green-600">Available</span>
                        ) : (
                            <span className="text-red-600">Not Available</span>
                        )}
                        </p>
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

export default Classdetail
