import React from 'react';
import { toast } from 'react-hot-toast';
import { Form, redirect } from 'react-router-dom'
const Login = () => {
    return (
        <div className='flex   justify-center h-full items-center '>

            <div className='m-5 bg-gray-100 shadow p-5'>

                <div className='font-semibold text-2xl text-center'>
                    Login
                </div>
                <Form method='post' action='/login'>

                    <div>
                        <input className='focus:outline-none  focus:ring focus:border-blue-500 rounded my-3 p-1' type="email" placeholder='email' name='email' />
                    </div>


                    <div>
                        <input className='focus:outline-none  focus:ring focus:border-blue-500 rounded my-3 p-1' type="password" placeholder='password' name='password' />
                    </div>
                    <div className='border-2 bg-gradient-to-r from-cyan-500 to-blue-100 text-center m-4 rounded  text-white '>

                        <button type='submit'> Login</button>
                    </div>

                </Form>
            </div>

        </div>
    );
};

export default Login;


export const loginAction = async ({ request }) => {



    let data = Object.fromEntries(await request.formData());

    return redirect('/dashboard')

}