import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, isLoggedIn, setIsLoggedIn, setUserData } = useContext(AppContext);

  // Debug log
  useEffect(() => {
    console.log("Navbar - isLoggedIn:", isLoggedIn, "userData:", userData);
  }, [isLoggedIn, userData]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/login');
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 bg-white shadow-md fixed top-0 z-50">
      {/* Logo */}
      <img
        className="w-32 sm:w-35 cursor-pointer"
        src={assets.logo}
        alt="Navbar logo"
        onClick={() => navigate('/')}
      />

      {/* User avatar or Login button */}
      {isLoggedIn && userData ? (
        <div className="relative group">
          {/* Avatar */}
          <div className="w-10 h-10 flex justify-center items-center text-white bg-black rounded-full cursor-pointer">
            {userData.name?.[0]?.toUpperCase() || 'U'}
          </div>

          {/* Dropdown menu (hover) */}
          <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md min-w-[150px] hidden group-hover:flex flex-col z-50">
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/email-verify')}
              >
                Verify Email
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 border border-gray-500 px-6 py-2 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
        >
          Login <img src={assets.arrow_icon} alt="Arrow icon" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
