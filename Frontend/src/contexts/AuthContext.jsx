import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// it is used to create a context for authentication
// this context will be used to provide authentication state and functions to the components
// it is like a global storage for authentication
const AuthContext = createContext();


// AuthProvider component will wrap the application and provide authentication state and functions
// through this function our data is passed to the components
// here there are props to pass data to the components
export const AuthProvider = ({ children }) => {
  // const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const storetokenInLS = (servertoken) => {
    // return localStorage.setItem('token', servertoken);
    localStorage.setItem('token', servertoken);
    setToken(servertoken);
  };

  //jwt Authentication and to get the currently logged in user data
  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/user",{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.ok){
        const data = await response.json();
        console.log("user auth se aaya data",data.userData);
        setUser(data.userData);
      }
    } catch (error) {
      console.error("error fetching user data");
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem('token');
  };
  
  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setUser(null); // Clear user if no token
    }
  }, [token]);

  // useEffect(() => {
  //   userAuthentication();
  // }, [token]);

  return (
    <AuthContext.Provider value={{storetokenInLS, user, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


  // useEffect(() => {
  //   // Check if user is logged in (simulate with localStorage)

  //   const savedUser = localStorage.getItem('user');
  //   console.log("Saved user from localStorage:", savedUser);
  //   if (savedUser) {
  //     setUser(JSON.parse(savedUser));
  //   }
  //   setLoading(false);
  // }, []); // array dependency it run for first time only

  // const login = async (email, password) => {
  //   // Simulate API call
  //   const mockUser = {
  //     id: 1,
  //     name: 'John Doe',
  //     email: email,
  //     year: '2nd Year',
  //     tokens: 125,
  //     streak: 3,
  //     avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  //   };
    
  //   setUser(mockUser);
  //   localStorage.setItem('user', JSON.stringify(mockUser));
  //   return mockUser;
  // };

  // const register = async ({id, tokens , streak, name, email, year}) => {
  //   console.log("Registering user:", { id, tokens, streak, name, email, year });
  //   // Simulate API call
  //   const mockUser = {
  //     id: id,
  //     name: name,
  //     email: email,
  //     year: year,
  //     tokens: tokens,
  //     streak: streak,
  //     avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  //   };

  //   setUser(mockUser);
  //   localStorage.setItem('user', JSON.stringify(mockUser));
  //   return mockUser;
  // };

  // const logout = () => {
  //   setUser(null);
  //   localStorage.removeItem('user');
  // };

  // const logout = () => {
  //   setToken("");
  //   localStorage.removeItem('token');
  // };

  // const updateTokens = (newTokens) => {
  //   const updatedUser = { ...user, tokens: newTokens };
  //   setUser(updatedUser);
  //   localStorage.setItem('user', JSON.stringify(updatedUser));
  // };

  // const value = {
  //   user,
  //   login,
  //   register,
  //   logout,
  //   updateTokens,
  //   loading
  // };
