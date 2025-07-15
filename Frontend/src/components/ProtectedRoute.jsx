import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
//   const { user, loading } = value;
  console.log("ProtectedRoute user:", user);

  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-lg">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
    // return (
    //   <div className="min-h-screen flex items-center justify-center">
    //     <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"> loading...</div>
    //   </div>
    // );
  }
  return children
};

export default ProtectedRoute;