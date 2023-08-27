import React from 'react';

const Homepage = () => {
    return (
        <div className='flex flex-col h-full md:flex md:flex-row md:justify-center md:items-center '>

            <div className=' flex justify-center items-center h-1/2 '>
                {/* logo  */}

                <img src="/sparklogo.svg" className='rounded-full w-1/4  md:w-1/2' alt="" />
            </div>

            <div className=' flex justify-center flex-col items-center  '>
                {/* Informations */}
                <p className=' text-xl font-bold'>
                    {/*  title     */}
                    KITS SPARK 
                </p>

                <p>
                    IT is an association of kits department 
                </p>
            </div>
        </div>
    );
};

export default Homepage;