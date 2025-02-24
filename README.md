# Books Management Tool

## Overview
This is a Books Management Tool designed to maintain a list of books in a library. The tool provides functionalities to view, add, edit, and deactivate books with detailed information. The application is built using **React (Vite) and Tailwind CSS** for the frontend and **PostgreSQL (via Supabase)** for the backend.

## Features

### 1. **List of Books**
- Displays a table with the following details for each book:
  - **Book Title**
  - **Author**
  - **Type of Book** (Auto-biography, Novel, Stories, Poems)
  - **Genre** (History, Science, Arts, Science Fiction)
  - **Publication**
  - **Number of Pages**
  - **Price**
  - **Cover Photo** (Uploaded image of the book cover)
- Only **active** books are listed in the table.

### 2. **Book Details Page**
- Clicking on a book from the list navigates to a **detailed view** of the selected book, showing all the book's details, including the cover photo.

### 3. **Add New Book**
- Users can add a new book by providing the following details:
  - Book Title
  - Author
  - Type of Book (Dropdown from Master Table)
  - Genre (Dropdown from Master Table)
  - Publication
  - Number of Pages
  - Price
  - Cover Photograph (File Upload)
- Upon submission, the book is saved in the database.

### 4. **Edit Book Details**
- Users can edit an existing book's details using a form similar to the **Add Book** page.
- Any detail, including the cover photograph, can be updated.
- Upon saving, the details are updated in the database.

### 5. **Deactivate a Book**
- Users can mark a book as **Inactive**.
- Inactive books will not be displayed in the books list.

## Technologies Used

### **Frontend**
- React (Vite) ⚡
- Tailwind CSS 🎨
- React Router (for navigation)
- React Icons (for UI enhancements)

### **Backend**
- PostgreSQL (via Supabase) 🛢️
- Supabase Auth (for authentication)

## Installation & Setup

### **Prerequisites**
- Node.js & npm installed
- Supabase account & project setup
- PostgreSQL database configured in Supabase

### **Steps to Set Up Locally**

1. **Clone the repository**
   ```sh
   git clone https://github.com/vedantgolegaonkar/Book-Management-Tool.git
   cd Book-Management-Tool
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Create a `.env` file and add the following environment variables:**
   ```sh
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Run the development server**
   ```sh
   npm run dev
   ```
5. **Open the application**
   - The app will be available at `http://localhost:5173/`

## Future Enhancements 🚀
- User authentication (User roles)
- Book search and filtering
- Book borrowing and return tracking
- Review and rating system for books
- The application can be deployed using **Vercel** or **Netlify**.

## Contributing 🤝
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

---
### **📌 Author:**
Developed by [Vedant](https://github.com/vedantgolegaonkar) ✨

Happy Coding! 🚀📚

