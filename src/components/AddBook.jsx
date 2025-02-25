import { useState } from "react";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    type_of_book: "",
    genre: "",
    publication: "",
    pages: "",
    price: "",
    cover_image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setBook((prev) => ({ ...prev, cover_image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let coverImageUrl = "";

    if (book.cover_image) {
      const fileName = `covers/${Date.now()}_${book.cover_image.name}`;
      const { data, error } = await supabase.storage
        .from("book-covers")
        .upload(fileName, book.cover_image);

      if (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
        setLoading(false);
        return;
      }

      coverImageUrl = supabase.storage
        .from("book-covers")
        .getPublicUrl(fileName).data.publicUrl;
    }

    const { error } = await supabase.from("books").insert([
      {
        title: book.title,
        author: book.author,
        type_of_book: book.type,
        genre: book.genre,
        publication: book.publication,
        pages: book.pages,
        price: book.price,
        cover_image_url: coverImageUrl,
        active: true,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    } else {
      alert("Book added successfully!");
      setBook({
        title: "",
        author: "",
        type_of_book: "",
        genre: "",
        publication: "",
        pages: "",
        price: "",
        cover_image: null,
      });
      navigate("/book-management");

      document.getElementById("coverImageInput").value = "";
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 px-5 py-2 text-white text-lg font-semibold rounded-full 
                   bg-gradient-to-r from-blue-500 to-indigo-600 
                   shadow-md hover:scale-105 transition-transform duration-200"
      >
        ← Back to Books
      </button>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Book Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="type"
            value={book.type}
            onChange={handleChange}
            placeholder="Type"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            placeholder="Genre"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="publication"
            value={book.publication}
            onChange={handleChange}
            placeholder="Publication"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="pages"
            value={book.pages}
            onChange={handleChange}
            placeholder="Pages"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <input
          type="number"
          step="0.01"
          name="price"
          value={book.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="flex items-center space-x-4">
          <label className="font-semibold text-gray-700">Cover Image:</label>
          <input
            type="file"
            id="coverImageInput"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
