import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true });
      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      setUserData(null);
      setIsLoggedIn(false);
    }
  };

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, { withCredentials: true });
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AppContext.Provider value={{
      backendUrl,
      isLoggedIn,
      setIsLoggedIn,
      userData,
      setUserData,
      getUserData
    }}>
      {children}
    </AppContext.Provider>
  );
};
