import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import { FiLogIn } from 'react-icons/fi'; // Import login icon

const UserBookManagement = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("active", true); // Fetch only active books
    if (error) {
      console.log("Error fetching books:", error);
    } else {
      setBooks(data);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Login Icon Button */}
      <button
        onClick={() => navigate('/login')} 
        className="absolute top-4 right-4 text-2xl text-blue-600 hover:text-blue-800"
      >
        <FiLogIn />
      </button>
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Library Books
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3">Cover</th>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Type</th>
              <th className="p-3">Genre</th>
              <th className="p-3">Publication</th>
              <th className="p-3">Pages</th>
              <th className="p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book.id}
                onClick={() => navigate(`/book-details/${book.id}`)}
                className="cursor-pointer hover:bg-gray-200 transition"
              >
                <td className="p-3">
                  <img
                    src={book.cover_image_url}
                    alt={book.title}
                    className="h-16 w-12 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.type_of_book}</td>
                <td className="p-3">{book.genre}</td>
                <td className="p-3">{book.publication}</td>
                <td className="p-3">{book.pages}</td>
                <td className="p-3 font-semibold text-blue-600">
                  ${book.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBookManagement;
