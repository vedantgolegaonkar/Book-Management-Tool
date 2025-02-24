import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {AuthProvider} from './AuthContext'
import ProtectedRoute from '../ProtectedRoute'
import Login from "./components/Login";
import BookManagement from "./components/BookManagement";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import UserBookManagement from "./components/UserBookManagement";
import BookDetails from "./components/BookDetails";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default page should be User Book Management */}
          <Route path="/" element={<Navigate to="/user-book-management" />} />

          {/* Public Route */}
          <Route path="/user-book-management" element={<UserBookManagement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-details/:id" element={<BookDetails />} />

          {/* Protected Routes for Admin Only */}
          <Route
            path="/book-management"
            element={
              <ProtectedRoute>
                <BookManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-book"
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-book/:id"
            element={
              <ProtectedRoute>
                <EditBook />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/book-details/:id"
            element={
              <ProtectedRoute>
                <BookDetails />
              </ProtectedRoute>
            }
          /> */}
          
        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default App;
