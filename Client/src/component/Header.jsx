import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    // items-center means vertically alignment
    // justfy-center means horizontally alignment
    <div className="flex flex-col items-center justify-center text-center mt-24">
      <img
        src={assets.header_img}
        alt="Profile"
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        Hey Developer
        <img src={assets.hand_wave} className="w-8 aspect-square" alt="Hand wave" />
      </h1>
      <h2>
        Welcome to our App
      </h2>

      <p className='mb-8  max-w-md'>Let's atart with quick product tour ans we will have you up and running in no time!</p>

      <button className='border border-gray-500 rounded-full px-8 py-2 hover:bg-gray-100 transition-all cursor-pointer'> Get started</button>
    </div>
  );
};

export default Header;