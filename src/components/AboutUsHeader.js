import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import bg from '../images/hero0.png';
import { HiMenu, HiX } from 'react-icons/hi';

const AboutUsHeader = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const style = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div className="relative h-[75vh] w-full" style={style}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-30 pointer-events-none"></div>

      {/* Navbar */}
      <div className="absolute w-full h-[4rem] flex items-center px-6 z-[20]">
        <div className="flex-1">
          <h1 className="text-[#FFFFFF] font-bold text-[1.5rem] cursor-pointer">
            <NavLink to="/" className="text-[#FFFFFF] hover:underline">
              LitLink
            </NavLink>
          </h1>
        </div>

        {/* Hamburger Button for Mobile */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-white text-2xl focus:outline-none"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Navbar Links */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-[4rem] left-0 w-full bg-black sm:static sm:flex sm:space-x-10 sm:bg-transparent sm:items-center sm:justify-center z-30`}
        >
          <li className="border-b sm:border-none">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FFD700] font-bold text-[1.1rem] block p-2 hover:animate-pulse"
                  : "text-[#FFFFFF] font-bold text-[1.1rem] block p-2 hover:animate-pulse"
              }
            >
              HOME
            </NavLink>
          </li>
          <li className="border-b sm:border-none">
            <NavLink
              to="/books"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FFD700] font-bold text-[1.1rem] block p-2 hover:animate-pulse"
                  : "text-[#FFFFFF] font-bold text-[1.1rem] block p-2 hover:animate-pulse"
              }
            >
              BOOKS
            </NavLink>
          </li>
          <li className="border-b sm:border-none">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FFD700] font-bold text-[1.1rem] block p-2 hover:animate-pulse"
                  : "text-[#FFFFFF] font-bold text-[1.1rem] block p-2 hover:animate-pulse"
              }
            >
              ABOUT
            </NavLink>
          </li>
          <li className="border-b sm:border-none">
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FFD700] font-bold text-[1.1rem] block p-2 hover:animate-pulse"
                  : "text-[#FFFFFF] font-bold text-[1.1rem] block p-2 hover:animate-pulse"
              }
            >
              ACCOUNT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FFD700] font-bold text-[1.1rem] block p-2 hover:animate-pulse"
                  : "text-[#FFFFFF] font-bold text-[1.1rem] block p-2 hover:animate-pulse"
              }
            >
              LOGIN
            </NavLink>
          </li>
        </ul>
        <div className="hidden sm:flex-1"></div>
      </div>

      {/* Welcome Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-[4rem] pointer-events-none">
        <h1 className="text-[#FFFFFF] font-bold text-[5rem]">
          About Us
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default AboutUsHeader;


