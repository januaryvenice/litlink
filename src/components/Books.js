import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../services/api"; // Ensure this API call is correct
import fictionImg from "../images/fiction.JPG";
import nonFictionImg from "../images/non-fiction.JPG";
import romanceImg from "../images/romance.JPG";
import youngAdultImg from "../images/young-adult.JPG";
import fantasyImg from "../images/fantasy.JPG";
import humorImg from "../images/humor.JPG";

const Books = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [userTypeID, setUserTypeID] = useState(null);

  const categories = [
    { title: "Fiction", image: fictionImg, route: "/books-list/Fiction" },
    { title: "Non-Fiction", image: nonFictionImg, route: "/books-list/Non-Fiction" },
    { title: "Romance", image: romanceImg, route: "/books-list/Romance" },
    { title: "Young Adult", image: youngAdultImg, route: "/books-list/Young-Adult" },
    { title: "Fantasy", image: fantasyImg, route: "/books-list/Fantasy" },
    { title: "Humor", image: humorImg, route: "/books-list/Humor" },
  ];

  const placeholderSuggestions = [
    "The Great Gatsby",
    "Jane Eyre",
    "#Fantasy",
    "#Romance",
    "To Kill a Mockingbird",
    "Pride and Prejudice",
  ];

  useEffect(() => {
    const fetchUserType = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (userId && token) {
        try {
          const { data } = await fetchUserDetails(userId, token);
          setUserTypeID(data.UserTypeID);
        } catch (error) {
          console.error("Error fetching user type:", error);
        }
      }
    };

    fetchUserType();
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredSuggestions = placeholderSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/books-list?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-8 lg:px-16">
      {/* Search Bar Section */}
      <div className="w-full max-w-3xl mt-10 flex flex-col sm:flex-row items-center justify-between">
  <form onSubmit={handleSearch} className="relative w-full">
    <input
      type="text"
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="Search by title, author, or genre (#genre)..."
      className="w-full px-5 py-3 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
    <button
      type="submit"
      className="absolute right-3 top-2 px-5 py-2 bg-[#f5deb3] text-black font-semibold rounded-full hover:bg-[#e0cba5]"
    >
      Search
    </button>
    {suggestions.length > 0 && (
      <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto z-10">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => setSearchQuery(suggestion)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    )}
  </form>

  {/* Add Book Button */}
  {(userTypeID === 2 || userTypeID === 3) && (
    <button
      onClick={() => navigate("/publish")}
      className="mt-4 sm:mt-0 sm:ml-4 px-5 py-2 bg-[#f5deb3] text-black font-semibold rounded-full hover:bg-[#e0cba5]"
    >
      Add Book
    </button>
  )}
</div>


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
                <h3 className="text-white text-5xl font-semibold">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
