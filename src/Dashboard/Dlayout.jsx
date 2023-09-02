import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation,Link,useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// if toggle is true  -> menu is close
// if toggle is false -> menu is open
const Dlayout = () => {
    let location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (toggle == false) {
            // toggle is open
            // the close it 
            setToggle(true)
        }

    }, [location])
    const [toggle, setToggle] = useState(true);
    const handleMenu = () => {
        toggle ? setToggle(false) : setToggle(true);
    }
    const logout  = ()=>{
        localStorage.removeItem("accessToken")
        navigate("/login")
    }
    return (

        <>
            <Toaster />

            <header>
                <nav className=' shadow flex  min-h-16 flex-wrap items-center md:py-2 justify-between w-full'>

                    {/* logo */}
                    <Link to ="/"><div className='flex items-center font-bold  text-2xl  py-1 px-2' > Spark</div></Link>

                    {/* hamburger   menu */}
                    <div onClick={handleMenu} className='flex m-1  flex-col justify-evenly md:hidden  cursor-pointer '>
                        <div className='bg-black h-1 w-4 rounded mt-1'></div>
                        <div className='bg-black  h-1 w-4 rounded mt-1'></div>
                        <div className='bg-black  h-1 w-4 rounded mt-1'></div>
                    </div>

                    {/* all routes */}
                    <div className={`${toggle ? 'hidden  w-full md:flex md:block md:w-auto' : ' w-full md:flex md:block md:w-auto'}`} >
                        <ul className='  md:flex'>
                            <li className='text-center justify-around flex'>
                                <NavLink to="/dashboard" className= "font-semibold hover:bg-blue-200 rounded p-1 md:p-2  ">
                                    Dashboard</NavLink>
                            </li>
                            <li className='text-center'>
                                <button onClick={()=>{logout()}}  className=" bg-red-400 font-semibold hover:bg-blue-200 rounded p-1 md:p-2">
                                    Logout</button>
                            </li>
                        </ul>
                    </div>



                </nav>
            </header>

            <main className='min-h-screen  p-2 bg-gray-200'>

                <Outlet></Outlet>
            </main>

            <footer className='flex justify-center items-center'>

                made with love
            </footer>

        </>
    );
};

export default Dlayout;