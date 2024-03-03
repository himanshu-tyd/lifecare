import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      <div className='text-center'>
        <h2 className='font-semibold text-4xl text-headingColor mb-4'>
          Oops! 😮 The page you are looking for is not found.
        </h2>
        <p className='text-lg text-gray-600 mb-8'>
          It seems like you've taken a wrong turn. Let's get you back on track!
        </p>
        <Link to='/' className='text-blue-500 hover:underline text-lg'>
          Go Back Home 🏠
        </Link>
      </div>
    </section>
  );
};

export default Page404;
