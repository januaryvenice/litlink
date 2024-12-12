import React from "react";
import bg from '../images/hero1.jpg';

const Footer = () => {
  return (
    <div
      className="relative h-40 flex items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Text content */}
      <p className="relative text-white text-center italic text-sm md:text-lg z-10">
        “And so we beat on, boats against the current, borne back ceaselessly into the past.”
        <span className="font-bold"> — The Great Gatsby</span>
      </p>
    </div>
  );
};

export default Footer;
