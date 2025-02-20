import React, { useContext, useState } from "react";
import { GlobalController } from "../Global";
import { MdCancel } from "react-icons/md";
import Api from "../../../utils/AxiosInstance";
import Loader from "../Loader";
import { useSelector } from "react-redux";

const ClassForm = () => {
  const { addClass, setAddClass } = useContext(GlobalController);
  const [loader , SetLoader] = useState(false)
  const loggedAdmin = useSelector(
    (state) => state.theatre?.theatre?.theatre?._id
  );

  // Define an initial state constant
const initialNewClassState = {
  className: "",
  numberOfRows: "",
  price: "",
  availability: "",
  theatre: loggedAdmin,
};

const [error, setError] = useState(null);


const [newClass, setNewClass] = useState(initialNewClassState);
const [newClassError, setNewClassError] = useState({});

const handleChange = (e) => {
  const { name, value } = e.target;
  setNewClass((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

const formValidate = () => {
  const newError = {};

  if (newClass.className === "") {
    newError.className = "Class Name is required";
  }
  if (newClass.numberOfRows === "") {
    newError.numberOfRows = "Number of rows is required";
  }
  if (newClass.price === "") {
    newError.price = "Price is required";
  }
  if (newClass.availability === "") {
    newError.availability = "This is required";
  }
  if (!newClass.theatre) {
    newError.theatre = "Theatre is required";
  }

  setNewClassError(newError);
  return Object.keys(newError).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formValidate()) {
    try {
      SetLoader(true)
      const resp = await Api.post(`class/classes`, newClass);
      if (resp.status === 201) {
        setNewClass(initialNewClassState);
        setError(null);
        SetLoader(false)
        window.location.reload();
      }
    } catch (error) {
      SetLoader(false)
      setError(error.message);
    }
  } else {
    setError("Error in validation");
  }
};


  return (
    <div className="bg-black/40 fixed inset-0 flex justify-center items-center min-h-screen z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={() => setAddClass("")}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <MdCancel size={24} />
        </button>

        {/* Form */}
        
        <h2 className="text-xl font-bold text-center mb-4">Add Class</h2>
        {
          loader ? <Loader /> : 
        (<form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select name="className" value={newClass.className} onChange={handleChange} className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" >
            <option value="">Select</option>
            <option value="vip">VIP</option>
            <option value="Standard">Standard</option>
            <option value="Economy">Economy</option>
          </select>
          {newClassError.className&& <p className='text-red-700 text-[9px] absolute mt-[50px]'>{newClassError.className}</p>}

          <input
            type="text"
            name="numberOfRows"
            value={newClass.numberOfRows}
            placeholder="Number of Sit"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          {newClassError.numberOfRows&& <p className='text-red-700 text-[9px] absolute mt-[115px]'>{newClassError.numberOfRows}</p>}
          <input
            type="text"
            name="price"
            value={newClass.price}
            placeholder="Price"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          {newClassError.price&& <p className='text-red-700 text-[9px] absolute mt-[180px]'>{newClassError.price}</p>}
          <select   name="availability" value={newClass.availability} onChange={handleChange} className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {newClassError.availability&& <p className='text-red-700 text-[9px] absolute mt-[245px]'>{newClassError.availability}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Class
          </button>
        </form>)
        }
      </div>
    </div>
        
  );
};

export default ClassForm;
