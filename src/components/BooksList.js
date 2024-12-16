import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


const BooksList = () => {
  const [books, setBooks] = useState([]); // To be populated via backend API in the future
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const booksPerPage = 10;
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = useParams();
  const userType = localStorage.getItem("userType"); // Assuming you store user type in localStorage


  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || category;

  // Simulate suggestions for the search bar
  const placeholderSuggestions = [
    "The Great Gatsby",
    "Jane Eyre",
    "#Fantasy",
    "#Romance",
    "To Kill a Mockingbird",
    "Pride and Prejudice",
  ];

  useEffect(() => {
    // Placeholder logic: Replace this with API fetch logic in the future
    setBooks([]);
  }, [searchTerm]);

  // Pagination logic
  const startIndex = (currentPage - 1) * booksPerPage;
  const displayedBooks = books.slice(startIndex, startIndex + booksPerPage);
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle input change for the search bar
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

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/books-list?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  
  
  
  // Render Add Book button if the user is an admin (userTypeID = 2) or an author (userTypeID = 3)
  {(userType === "2" || userType === "3") && (
    <button
      onClick={() => navigate("/publish-book")}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 my-4"
    >
      Add Book
    </button>
  )}
  


  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-8 lg:px-16 mb-20">
      {/* Search Bar */}
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
        {(userType === "2" || userType === "3") && (
  <button
    onClick={() => navigate("/publish-book")}
    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 my-4"
  >
    Add Book
  </button>
)}

      </div>

      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mt-12 mb-8">
        {searchTerm.startsWith("#") ? `${searchTerm.slice(1)} Books` : searchTerm}
      </h2>

      {/* Books List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {displayedBooks.length > 0 ? (
          displayedBooks.map((book, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center space-y-4"
            >
              <img
                src={book.CoverImage || "path_to_default_image.jpg"}
                alt={book.Title}
                className="w-32 h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold">{book.Title}</h3>
              <p className="text-sm text-gray-500">by {book.Author}</p>
              <p className="text-sm text-gray-700">{book.Genres?.join(", ")}</p>
              <p className="text-sm text-gray-600 text-center">{book.Description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No books found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8 space-x-2">
          {/* Previous Button */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-gray-200 rounded-md shadow-md hover:bg-gray-300"
            >
              &lt;
            </button>
          )}

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 bg-white border rounded-md shadow-md ${
                currentPage === i + 1 ? "underline font-bold" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next Button */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-gray-200 rounded-md shadow-md hover:bg-gray-300"
            >
              &gt;
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BooksList;
