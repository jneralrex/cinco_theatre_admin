import React, { useEffect, useState } from 'react'
import AddAds from '../components/globalController/triggers/AddAds';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAds } from '../redux/slices/AdsSlice';

const Ads = () => {
 const {loading,ads,error} = useSelector((state)=>state.ads)

 const dispatch = useDispatch();

 
 useEffect(()=>{
  dispatch(getAllAds())
 },[dispatch])

 const handleAction = (action, ads) => {
  switch (action) {
    case "edit":
      // handleEditScreen(screen);
      break;
    case "delete":
      // handleDeleteScreen(screen._id);
      break;
    case "view":
      // handleViewScreen(screen._id);
      break;
    default:
      break;
  }
};
return (
  <div className="max-h-screen w-full pt-2 pb-20 lg:pb-20">
    <div className="flex flex-row items-center justify-between w-[90%] m-auto">
    <AddAds/>
    <div className="text-center text-xl font-bold mb-4">
        Theatre Management
      </div>
    </div>
    {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : ads.length > 0 ? (
        <>
          <table className="w-[90%] m-auto text-center border border-gray-300 shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border"> Title</th>
                <th className="p-2 border">Duration</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad._id} className="hover:bg-gray-100">
                  <td className="p-2 border">{ad.adsTitle}</td>
                  <td className="p-2 border">{ad.durationDays}</td>
                  <td className="p-2 border">{ad.active? "Active" : "Inactive" }</td>
                  <td className="p-2 border">
                    <select
                      className="border p-1"
                      onChange={(e) => {
                        const action = e.target.value;
                        if (!action) return;
                        handleAction(action, ads);
                        e.target.value = "";
                      }}
                    >
                      <option value="">Action</option>
                      <option value="edit">Edit</option>
                      <option value="delete">Delete</option>
                      <option value="view">View</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-center">No Ads available.</p>
      )}

  </div>
)
}

export default Ads