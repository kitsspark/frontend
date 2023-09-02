import React ,{useState} from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';
import { AxiosInstance } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const validationSchema = yup.object({
    email : yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required")
})

const Login = () => {
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState();
    return (
        <div className='flex   justify-center h-screen items-center '>

            <div className='m-5 bg-gray-100 shadow p-5'>

                     <div className='text-red-600 uppercase font-semibold '>
                        <p> {loginStatus} </p>
                    </div>
                <div className='font-semibold text-2xl text-center'>
                    Login
                </div>
                <Formik 
                initialValues={{
                    email:"",
                    password:""
                }}

                validationSchema={validationSchema}
                onSubmit={(values)=>{
                    toast(' trying to logging');
                    AxiosInstance.post("/login",values).then((response)=>{
                        setLoginStatus(response.data.message)
                        if(response.data.token){
                            localStorage.setItem('accessToken', response.data.token);
                            navigate("/dashboard" , {replace:true})
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })
                }}
                >
                <Form>
                    <div className='grid'>
                        <Field  className='focus:outline-none  focus:ring focus:border-blue-500 rounded my-3 p-1' type="email" placeholder='email' name='email' />
                        <ErrorMessage  className="text-red-900"name="email" />
                    </div>


                    <div className='grid'>
                        <Field className='focus:outline-none  focus:ring focus:border-blue-500 rounded my-3 p-1' type="password" placeholder='password' name='password' />
                        <ErrorMessage  className="text-red-900"name="password" />
                    </div>
                    <div className='border-2 bg-gradient-to-r from-cyan-500 to-blue-100 text-center m-4 rounded  text-white '>

                        <button type='submit'> Login</button>
                    </div>

                </Form>
                </Formik>
            </div>

        </div>
    );
};

export default Login;


export const loginAction = async ({ request }) => {



    let data = Object.fromEntries(await request.formData());

    return redirect('/dashboard')

}