import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { searchBooks } from "../services/api";

const BooksList = () => {
  const [book, setBook] = useState([]); // List of books fetched
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = useParams();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || category || "";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await searchBooks({ category, search: searchTerm });
        setBook(data); // Set fetched books to state
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
  
    fetchBooks();
  }, [category, searchTerm]);
  
  

  // Search bar suggestion handler
  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      try {
        const { data } = await searchBooks(query); // Fetch suggestions dynamically
        const titles = [...new Set(data.map((book) => book.Title))]; // Remove duplicates
        setSuggestions(titles);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Navigate to search results
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/books-list?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-8 lg:px-16 mb-20">
      {/* Search Bar Section */}
      <div className="w-full max-w-3xl mt-10">
        <form onSubmit={handleSearch} className="relative">
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
      </div>

      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mt-12 mb-8">
        {category ? `${category} Books` : "Search Results"}
      </h2>

      {/* Books List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {book.length > 0 ? (
          book.map((book) => (
            <div
              key={book.BookID}
              className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center space-y-4"
            >
              {/* Book Cover */}
              <div className="w-40 h-64 border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <img
                  src={book.Cover ? `http://localhost:5000${book.Cover}` : "/images/default_image.jpg"}
                  alt={book.Title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Book Details */}
              <h3 className="text-xl font-bold">{book.Title}</h3>
              <p className="text-sm text-gray-500">by {book.AuthorName}</p>
              <p className="text-sm text-gray-700">
                {Array.isArray(book.Genres) ? book.Genres.join(", ") : book.Genres}
              </p>
              <p className="text-sm text-gray-600 text-center">{book.Description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BooksList;
