import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import { AuthContext } from "../AuthContext"; 

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); 

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("active", true);
    if (error) {
      console.log("Error fetching books:", error);
    } else {
      setBooks(data);
    }
  };

  const handleDeactivate = async (bookId, event) => {
    event.stopPropagation(); // Prevent row click event
    const { error } = await supabase
      .from("books")
      .update({ active: false })
      .eq("id", bookId);

    if (error) {
      console.log("Error deactivating book:", error);
    } else {
      alert("Book deactivated successfully!");
      fetchBooks();
    }
  };

  const handleLogout = async () => {
    await logout(); 
    navigate("/login");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">Book Management</h2>
        {user && (
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg transition duration-200"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        )}
      </div>

      <div className="mb-4 flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full shadow-lg transition duration-200"
          onClick={() => navigate(`/add-book`)}
        >
          ➕ Add New Book
        </button>
      </div>

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
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book.id}
                className="hover:bg-gray-200 transition cursor-pointer"
                onClick={() => navigate(`/book-details/${book.id}`)}
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
                <td className="p-3 font-semibold text-blue-600">${book.price}</td>
                <td className="p-3 flex space-x-2 items-center">
                  <button
                    className="text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-lg shadow-md transition duration-200 flex items-center space-x-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-book/${book.id}`);
                    }}
                  >
                    ✏️ <span>Edit</span>
                  </button>

                  <button
                    className="text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg shadow-md transition duration-200 flex items-center space-x-2"
                    onClick={(e) => handleDeactivate(book.id, e)}
                  >
                    <span className="text-white text-lg opacity-100">❌</span>
                    <span>Deactivate</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;
