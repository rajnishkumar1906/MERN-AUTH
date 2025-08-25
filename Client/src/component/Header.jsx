import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { userData, isLoggedIn } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center text-center mt-24">
      <img src={assets.header_img} alt="Profile" className="w-36 h-36 rounded-full mb-6" />
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        Hey {isLoggedIn && userData?.name ? userData.name : 'User'}
        <img src={assets.hand_wave} className="w-8 aspect-square" alt="Hand wave" />
      </h1>
      <h2>Welcome to our App</h2>

      <p className='mb-8 max-w-md'>
        Let's start with a quick product tour and we will have you up and running in no time!
      </p>

      <button className='border border-gray-500 rounded-full px-8 py-2 hover:bg-gray-100 transition-all cursor-pointer'>
        Get started
      </button>
    </div>
  );
};

export default Header;
