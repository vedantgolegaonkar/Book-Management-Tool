import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const BookDetails = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    const { data, error } = await supabase.from("books").select("*").eq("id", id).single();
    if (error) {
      console.log("Error fetching book details:", error);
    } else {
      setBook(data);
    }
  };

  if (!book) return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Loading Spinner */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-3 text-lg text-gray-600 font-semibold">Loading Book Details...</p>
    </div>
  );
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 px-5 py-2 text-white text-lg font-semibold rounded-full 
                   bg-gradient-to-r from-blue-500 to-indigo-600 
                   shadow-md hover:scale-105 transition-transform duration-200"
      >
        ← Back to Books
      </button>

      {/* Book Details Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex gap-6">
        {/* Book Cover */}
        <img 
          src={book.cover_image_url} 
          alt={book.title} 
          className="w-48 h-64 object-cover rounded-lg shadow-md"
        />

        {/* Book Information */}
        <div className="flex flex-col justify-between">
          <h2 className="text-3xl font-bold text-gray-800">{book.title}</h2>
          <p className="text-gray-600 text-lg"><strong>Author:</strong> {book.author}</p>
          <p className="text-gray-600 text-lg"><strong>Type:</strong> {book.type}</p>
          <p className="text-gray-600 text-lg"><strong>Genre:</strong> {book.genre}</p>
          <p className="text-gray-600 text-lg"><strong>Publication:</strong> {book.publication}</p>
          <p className="text-gray-600 text-lg"><strong>Pages:</strong> {book.pages}</p>
          <p className="text-xl font-semibold text-green-600"><strong>Price:</strong> ${book.price}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
