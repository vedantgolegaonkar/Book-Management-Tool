import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import { FiLogIn } from "react-icons/fi";
import { FaBook } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.role === "admin") {
          navigate("/book-management");
        } else {
          navigate("/user-book-management");
        }
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Authenticate user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Incorrect email or password.");
      return;
    }

    if (!data?.user) {
      setError("Login failed. Please try again.");
      return;
    }

    // Fetch user role
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("email", email)
      .maybeSingle();

    if (userError || !userData) {
      setError("Failed to fetch user role.");
      return;
    }

    const userRole = userData.role || "user";

    // Store user info
    localStorage.setItem("user", JSON.stringify({ email, role: userRole }));

    // Redirect based on role
    navigate(
      userRole === "admin" ? "/book-management" : "/user-book-management"
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <FaBook
        className="text-5xl text-white-600 cursor-pointer hover:text-white-800 transition duration-200 absolute top-5 left-1/2 transform -translate-x-1/2"
        onClick={() => navigate("/user-book-management")}
      />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <div className="flex items-center justify-center mb-6">
          <FiLogIn className="text-blue-600 text-4xl" />
          <h2 className="text-2xl font-bold text-gray-700 ml-2">Admin Login</h2>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Test@1234"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
