import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "./supabaseClient";

const ProtectedRoute = ({ children }) => {
  const [authCheck, setAuthCheck] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setAuthCheck(true);
      } else {
        setAuthCheck(false);
      }
    };
    checkAuth();
  }, []);

  if (authCheck === null) return <div>Loading...</div>;
  return authCheck ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
