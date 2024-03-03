import React from 'react';
import working from "../assets/images/working.gif";

const InDevelopment = () => {
  return (
    <section className='flex flex-col items-center justify-center h-screen bg-gray-100 mb-10'>
      <div className='text-center p-8 bg-white rounded-lg shadow-md'>
        <h2 className='font-semibold text-4xl text-blue-600 mb-4'>
          🚧 This Feature is Still in Development! 🚧
        </h2>
        <p className='text-lg text-gray-600 mb-8'>
          We're working hard to bring you this exciting new feature. Please check back later!
        </p>
        <div className='flex justify-center'>
        <img
          src={working}
          alt='Development in Progress'
          className='mb-4 rounded-lg'
          style={{ maxWidth: '400px' }}
        />

        </div>
       
      </div>
    </section>
  );
};

export default InDevelopment;
