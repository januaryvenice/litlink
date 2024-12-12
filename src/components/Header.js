import React from 'react';
import bg from '../images/hero0.png'; // Adjust path based on your file structure

const Header = ({ children }) => {
  const style = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div className="relative h-[75vh] w-full" style={style}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Navbar */}
      <div className="absolute w-full h-[4rem] flex items-center px-6 z-10">
        <div className="flex-1">
          <h1 className="text-[#FFFFFF] font-bold text-[1.5rem] cursor-pointer">
            LitLink
          </h1>
        </div>
        <ul className="flex items-center justify-center space-x-10 flex-1">
          <li className="text-[#FFFFFF] font-bold text-[1.1rem] cursor-pointer hover:animate-pulse">
            HOME
          </li>
          <li className="text-[#FFFFFF] font-bold text-[1.1rem] cursor-pointer hover:animate-pulse">
            BOOKS
          </li>
          <li className="text-[#FFFFFF] font-bold text-[1.1rem] cursor-pointer hover:animate-pulse">
            ABOUT
          </li>
          <li className="text-[#FFFFFF] font-bold text-[1.1rem] cursor-pointer hover:animate-pulse">
            ACCOUNT
          </li>
          <li className="text-[#FFFFFF] font-bold text-[1.1rem] cursor-pointer hover:animate-pulse">
            LOGIN
          </li>
        </ul>
        <div className="flex-1"></div>
      </div>

      {/* Welcome Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-[4rem]">
        <h1 className="text-[#FFFFFF] font-bold text-[5rem]">
          Welcome to LitLink
        </h1>
        <h3 className="text-white text-[2rem] font-thin">
          Community for All Book Lovers
        </h3>
      </div>

      {/* Main Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default Header;
