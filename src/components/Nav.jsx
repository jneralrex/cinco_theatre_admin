import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MdHome, MdOutlineManageAccounts } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";
import { FaMasksTheater } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    {
        icon: <MdHome />,
        label: "Overview",
        path: "/home/dashboard",
      },
    {
      icon: <MdOutlineManageAccounts />,
      label: "User Mgt",
      path: "/home/user-management",
    },
    {
      icon: <MdEvent />,
      label: "Event Mgt",
      path: "/home/event-management",
    },
    {
      icon: <BiCameraMovie />,
      label: "Movie Mgt",
      path: "/home/movie-management",
    },
    {
        icon: [<FaMasksTheater/>,<GrUserAdmin/>],
        label: "Theatre Admin Mgt",
        path: "/home/theatre-admin",
      },
      {
        icon: [<FaMasksTheater/>,<CiSettings/>],
        label: "Theatre Mgt",
        path: "/home/theatre-management",
      },
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between max-h-screen">
        {/* Hamburger Button */}
        <div className="bg-purple-500 text-white  p-4 flex lg:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div>
            
        </div>
        <div
        className={`w-[250px] min-h-screen flex-col bg-purple-700 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:fixed lg:flex transition-transform duration-300 ease-in-out z-50`}
      >
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={closeMenu} 
            >
              <div className="flex flex-row gap-4 items-center p-4 hover:bg-purple-600">
                <div className="flex flex-row gap-2">{item.icon}</div>
                <div>{item.label}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <div className="w-full absolute mt-14 lg:w-[76%] xl:w-[80%] lg:relative lg:mt-0 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Nav;
