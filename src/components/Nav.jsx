import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MdOutlineManageAccounts } from "react-icons/md";
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
      icon: <MdOutlineManageAccounts />,
      label: "User Mgt",
      path: "/user-management",
    },
    {
      icon: <MdEvent />,
      label: "Event Mgt",
      path: "/event-management",
    },
    {
      icon: <BiCameraMovie />,
      label: "Movie Mgt",
      path: "/movie-management",
    },
    {
        icon: [<FaMasksTheater/>,<GrUserAdmin/>],
        label: "Theatre Admin Mgt",
        path: "/theatre-admin",
      },
      {
        icon: [<FaMasksTheater/>,<CiSettings/>],
        label: "Theatre Mgt",
        path: "/theatre-management",
      },
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between max-h-screen">
        {/* Hamburger Button */}
        <div className="bg-purple-700 text-white p-4 flex lg:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div
          className={`bg-purple-700 w-[300px] min-h-screen absolute lg:static transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300`}
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
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Nav;
