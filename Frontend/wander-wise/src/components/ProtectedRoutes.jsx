import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setAuthChecked(true);
    }
  }, [loading]);

  if (!authChecked) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div></div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
