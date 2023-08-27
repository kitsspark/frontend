import React from 'react';
import { useRouteError, Link } from 'react-router-dom'

const Errorpage = () => {

  const error = useRouteError();


  return (
    <div className='h-screen flex justify-center items-center'>
      <div>


        <h1 className='text-2xl font-bold'>Oops!</h1>
        <p className='text-gray-400 pb-4 '>Sorry, an unexpected error has occurred.</p>
        <p>
          <i className='text-red-500'>{error.statusText || error.message}</i>
        </p>

        <div className='mt-4'>
          <Link to="/" className='border-2 border-blue-100   p-3 rounded hover:bg-blue-200 hover:text-white'> Go Back to Home</Link>
        </div>
      </div>

    </div>
  );
};

export default Errorpage;