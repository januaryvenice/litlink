import React from 'react'; 

const Romance = () => {
  const books = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A classic novel about the Jazz Age.",
      image: require("../images/gatsby.jpg"), // Dynamically import the image
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A novel about racial injustice in the Deep South.",
      image: require("../images/mockingbird.jpg"),
    },
    {
      title: "1984",
      author: "George Orwell",
      description: "A dystopian novel about a totalitarian regime.",
      image: require("../images/1984.jpg"),
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Fiction</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-gray-700">by {book.author}</p>
            <p className="text-gray-500">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Romance;
