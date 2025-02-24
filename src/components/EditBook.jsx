import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    type: "",
    genre: "",
    publication: "",
    pages: "",
    price: "",
    cover_image_url: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching book details:", error);
      } else {
        setBookData(data);
      }
      setLoading(false);
    };
    fetchBookDetails();
  }, [id]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;

    setUploading(true);
    const fileName = `covers/${Date.now()}-${selectedFile.name}`;

    const { data, error } = await supabase.storage
      .from("book-covers")
      .upload(fileName, selectedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed!");
      setUploading(false);
      return null;
    }

    // Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("book-covers")
      .getPublicUrl(fileName);
    setUploading(false);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = bookData.cover_image_url;

    if (selectedFile) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        alert("Image upload failed! Please try again.");
        return;
      }
    }

    const updatedBookData = { ...bookData, cover_image_url: imageUrl };

    const { error } = await supabase
      .from("books")
      .update(updatedBookData)
      .eq("id", id);
    if (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book. Please try again.");
    } else {
      alert("Book updated successfully!");
      navigate("/book-management");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 px-5 py-2 text-white text-lg font-semibold rounded-full 
                   bg-gradient-to-r from-blue-500 to-indigo-600 
                   shadow-md hover:scale-105 transition-transform duration-200"
      >
        ← Back to Books
      </button>
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-2">Author:</label>
        <input
          type="text"
          name="author"
          value={bookData.author}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-2">Type:</label>
        <input
          type="text"
          name="type"
          value={bookData.type}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-2">Genre:</label>
        <input
          type="text"
          name="genre"
          value={bookData.genre}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-2">Publication:</label>
        <input
          type="text"
          name="publication"
          value={bookData.publication}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-2">Pages:</label>
        <input
          type="number"
          name="pages"
          value={bookData.pages}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <label className="block mb-2">Price:</label>
        <input
          type="number"
          name="price"
          value={bookData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        {/* Cover Image URL */}
        <label className="block mb-2">Cover Photo URL:</label>
        <input
          type="text"
          name="cover_image_url"
          value={bookData.cover_image_url}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        {/* Image Upload */}
        <label className="block mb-2">Upload New Cover Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded mb-4"
        />

        {/* Image Preview */}
        {selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="New Cover Preview"
            className="mt-2 h-32 w-auto rounded shadow-md"
          />
        ) : bookData.cover_image_url ? (
          <img
            src={bookData.cover_image_url}
            alt="Current Cover"
            className="mt-2 h-32 w-auto rounded shadow-md"
          />
        ) : null}

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition duration-200 ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Update Book"}
        </button>
      </form>
    </div>
  );
}

export default EditBook;
