import React from 'react';
import { useNavigate } from 'react-router-dom';
import fictionImg from '../images/fiction.JPG';
import nonFictionImg from '../images/non-fiction.JPG';
import romanceImg from '../images/romance.JPG';
import youngAdultImg from '../images/young-adult.JPG';
import fantasyImg from '../images/fantasy.JPG';
import humorImg from '../images/humor.JPG';

const Books = () => {
  const navigate = useNavigate(); 
  const categories = [
    { title: "Fiction", image: fictionImg, route: "/fiction" },
    { title: "Non Fiction", image: nonFictionImg, route: "/non-fiction" },
    { title: "Romance", image: romanceImg, route: "/romance" },
    { title: "Young Adult", image: youngAdultImg, route: "/young-adult" },
    { title: "Fantasy", image: fantasyImg, route: "/fantasy" },
    { title: "Humor", image: humorImg, route: "/humor" },
  ];

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-8 lg:px-16">
      {/* Categories Section */}
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mt-12 mb-8">
          Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-10">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(category.route)} 
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <h3 className="text-white text-5xl font-semibold">{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
