import React, { useState } from "react";
import { publishBook } from "../services/api";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [genres, setGenres] = useState([""]);
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const handleGenreChange = (index, value) => {
    const updatedGenres = [...genres];
    updatedGenres[index] = value.startsWith("#") ? value : `#${value}`;
    setGenres(updatedGenres);
  };

  const addGenreField = () => setGenres([...genres, ""]);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    if (!title || !description || !coverImage || !authorName || genres.some((g) => g === "")) {
      alert("All fields are required, including author and cover image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("cover", coverImage);
    formData.append("genres", JSON.stringify(genres)); // Send genres as JSON
    formData.append("authorName", authorName);
  
    try {
      const token = localStorage.getItem("token");
      const response = await publishBook(formData, token);
      console.log(response.data);
      alert("Book published successfully!");
    } catch (error) {
      console.error("Error publishing book:", error.response?.data?.message || error.message);
      alert("Failed to publish book.");
    }
  };
  

  return (
    <div className="w-full flex justify-center px-4 sm:px-8 lg:px-16 py-8 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Publish a Book</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-full text-lg"
              required
            />
          </div>

          {/* Author Name Field */}
<div>
  <label className="block text-lg font-medium mb-2">Author Name</label>
  <input
    type="text"
    placeholder="Author Name"
    value={authorName}
    onChange={(e) => setAuthorName(e.target.value)}
    className="w-full px-5 py-3 border border-gray-300 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    required
  />
</div>


          {/* Description Field */}
          <div>
            <label className="block text-lg font-medium mb-2">Description</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-lg h-40 resize-none"
              required
            />
          </div>

          {/* Genres Field */}
          <div>
            <label className="block text-lg font-medium mb-2">Genres</label>
            {genres.map((genre, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={genre}
                  onChange={(e) => handleGenreChange(index, e.target.value)}
                  placeholder="#Genre"
                  className="w-full px-5 py-3 border border-gray-300 rounded-full text-lg"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addGenreField}
              className="px-5 py-2 bg-[#f5deb3] text-black rounded-full hover:bg-[#e0cba5]"
            >
              Add Genre
            </button>
          </div>

          {/* Cover Upload */}
          <div className="flex flex-col items-center space-y-4">
            <label className="text-lg font-medium">Upload Cover</label>
            <label className="cursor-pointer px-5 py-3 bg-[#f5deb3] text-black rounded-full hover:bg-[#e0cba5]">
              Choose File
              <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
            </label>
            {coverPreview && (
              <div className="w-40 h-64 border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-5 py-3 bg-[#f5deb3] text-black rounded-full hover:bg-[#e0cba5] text-lg"
          >
            Publish Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Publish;
