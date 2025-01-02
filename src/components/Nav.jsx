import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MdHome, MdOutlineManageAccounts } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";
import { FaMasksTheater, FaPen } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";
import { BsTicket } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa";
import { PiTelevisionSimpleThin } from "react-icons/pi";



const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { icon: <MdHome />, label: "Overview", path: "/dashboard" },
    { icon: <MdOutlineManageAccounts />, label: "User Mgt", path: "/user-management" },
    { icon: <MdEvent />, label: "Event Mgt", path: "/event-management" },
    { icon: <BiCameraMovie />, label: "Movie Mgt", path: "/movie-management" },
    { icon: [<FaMasksTheater/>,<GrUserAdmin/>], label: "Theatre Admin Mgt", path: "/theatre-admin" },
    { icon: [<FaMasksTheater/>,<CiSettings/>], label: "Theatre Mgt", path: "/theatre-management" },
    { icon: <BsTicket/>, label: "Tickets", path: "/ticket" },
    { icon: <FaLocationArrow/>, label: "Location", path: "/locations" },
    { icon: <FaRegNewspaper/>, label: "News", path: "/news" },
    { icon: <PiTelevisionSimpleThin/>, label: "Ads", path: "/ads" },
    { icon: <FaPen/>, label: "Report", path: "/report" },
   { icon: <CiSettings/>, label: "General Settings", path: "/settings" },

  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between max-h-screen">
        {/* Hamburger Button */}
        <div className="bg-purple-500 text-white fixed w-full p-2 flex lg:hidden z-50">
          <button onClick={toggleMenu} className="text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div
        className={`w-[250px] h-[100%] flex-col fixed bg-purple-700 pb-9 mt-10 text-white transform overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:fixed lg:mt-0 lg:flex transition-transform lg:pb-2 duration-300 ease-in-out z-10`}
      >
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={closeMenu} 
            >
              <div className="flex flex-row gap-2 items-center p-2 lg:p-4 hover:bg-purple-600 ">
                <div className="flex flex-row gap-2 ">{item.icon}</div>
                <div>{item.label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <div className="w-full absolute mt-14 lg:w-[76%] xl:w-[80%] lg:relative lg:mt-0 lg:ml-auto min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Nav;
