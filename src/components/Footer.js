import React from "react";
import bg from '../images/hero1.jpg';

const Footer = () => {
  return (
    <div
      className="relative min-h-40 flex items-center justify-center bg-cover bg-center px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Text content */}
      <p className="relative text-white text-center italic text-sm sm:text-base md:text-lg z-10 leading-relaxed">
        “And so we beat on, boats against the current, borne back ceaselessly into the past.”
        <span className="font-bold"> — The Great Gatsby</span>
      </p>
    </div>
  );
};

export default Footer;
