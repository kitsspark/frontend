import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import { replace } from 'formik';
// if toggle is true  -> menu is close
// if toggle is false -> menu is open
const Layout = () => {
    let location = useLocation();
    useEffect(() => {
        if (toggle == false) {
            // toggle is open
            // the close it 
            setToggle(true)
        }

    }, [location])


    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('accessToken');
        if (token) {

            navigate('/dashboard', { replace: true })
        }
    })

    const [toggle, setToggle] = useState(true);
    const handleMenu = () => {
        toggle ? setToggle(false) : setToggle(true);
    }
    return (

        <>
            <Toaster />

            <header>
                <nav className=' shadow flex  min-h-16 flex-wrap items-center md:py-2 justify-between w-full'>

                    {/* logo */}
                    <div className='flex items-center font-bold  text-2xl  py-1 px-2' > Spark</div>

                    {/* hamburger   menu */}
                    <div onClick={handleMenu} className='flex m-1  flex-col justify-evenly md:hidden  cursor-pointer '>
                        <div className='bg-black h-1 w-4 rounded mt-1'></div>
                        <div className='bg-black  h-1 w-4 rounded mt-1'></div>
                        <div className='bg-black  h-1 w-4 rounded mt-1'></div>
                    </div>

                    {/* all routes */}
                    <div className={`${toggle ? 'hidden  w-full md:flex md:block md:w-auto' : ' w-full md:flex md:block md:w-auto'}`} >
                        <ul className='  md:flex'>
                            <li className='text-center'>
                                <NavLink to="/" className={({ isActive }) =>
                                    isActive ? "bg-blue-500 rounded text-black p-1 md:p-2 font-semibold  " : "   font-semibold hover:bg-blue-200 rounded p-1 md:p-2 "
                                }
                                >Home</NavLink>
                            </li>

                            <li className='text-center'>
                                <NavLink to="/notes" className={({ isActive }) =>
                                    isActive ? "bg-blue-500 rounded text-black p-1 md:p-2 text-white font-semibold" : "  font-semibold hover:bg-blue-200 rounded p-1 md:p-2"
                                }  >Notes</NavLink>
                            </li>
                            <li className='text-center'>
                                <NavLink to="/timetables" className={({ isActive }) =>
                                    isActive ? "bg-blue-500 rounded text-black p-1 md:p-2 text-white font-semibold" : " font-semibold hover:bg-blue-200 rounded p-1 md:p-2"
                                }  >Timetables</NavLink>
                            </li>
                            <li className='text-center'>
                                <NavLink to="/login" className={({ isActive }) =>
                                    isActive ? "bg-blue-500 rounded text-black p-1 md:p-2 text-white font-semibold " : " font-semibold hover:bg-blue-200 rounded p-1 md:p-2"
                                } >Login</NavLink>
                            </li>
                        </ul>
                    </div>



                </nav>
            </header>


            <main className='min-h-screen  p-2 bg-gray-200'>

                <Outlet></Outlet>
            </main>

            <Footer />

        </>
    );
};

export default Layout;