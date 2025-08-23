import React from 'react';
import Navbar from '../component/Navbar';
import Header from '../component/Header';
import { assets } from '../assets/assets';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover" 
         style={{ backgroundImage: `url('${assets.bg_img}')` }}>
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
