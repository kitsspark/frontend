import React from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';
import { AxiosInstance } from '../../utils/constants';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
//subjectName , semister, regulation

const validationSchema = yup.object({
    subjectName: yup.string().required("Required"),
    semister: yup.number().required("Required").positive().integer(),
    regulation: yup.string().required("Required"),
    units: yup.array(yup.object({
        unitNo: yup.number("unitNo must be +ve integer").required("Unit Number is required").positive("Unit Number must be a positive number").integer("Unit Number must be an integer"),
        unitName: yup.string().required("Required"),
        Link: yup.string().required("Required")
    })).min(1)
});

function AddNotes() {
    const navigate = useNavigate()
    return (
        <>
            <div className='md:flex md:justify-center md:items-center w-full p-5'>


                <Formik
                    initialValues={{
                        subjectName: '',
                        semister: '',
                        regulation: '',
                        units: [{ unitName: "", unitNo: 0, Link: "" }]
                    }}

                    onSubmit={async (values) => {
                        const response = await AxiosInstance.post("/notes", values);
                        console.log(response)
                        if (response.data.message === "subject sucessfully created") {
                            toast.success('Sucessfully Created!');
                            navigate("/dashboard/notes");
                        }
                        else {
                            toast.error("Failed to create")


                        }

                    }}

                    validationSchema={validationSchema}
                >

                    {(formik) => {
                        return (

                            <Form>
                                <div className='p-5'>

                                    <div className='my-3 flex flex-col text-red-900'>
                                        <Field name="subjectName" className="p-2 rounded" placeholder="SubjectName"></Field>
                                        <ErrorMessage name="subjectName" />
                                    </div>

                                    <div className='my-3 flex flex-col text-red-900'>
                                        <Field name="semister" className="p-2 rounded" placeholder="semister"></Field>
                                        <ErrorMessage className="text-red-900 " name="semister" />
                                    </div>

                                    <div className='my-3 flex flex-col text-red-900'>
                                        <Field name="regulation" className="p-2 rounded" placeholder="regulation"></Field>
                                        <ErrorMessage className="text-red-900" name="regulation" />
                                    </div>


                                    <FieldArray name="units" render={(arrayHelper) => (
                                        <div >

                                            <div className='md:grid md:grid-cols-3'>
                                                {
                                                    formik.values.units.map((unit, index) => {
                                                        return (
                                                            <div key={index} className='m-3'>
                                                                <div className='my-3 flex flex-col text-red-900'>
                                                                    <Field name={`units.${index}.unitNo`} className="p-2  min-w-24 rounded" placeholder="unitNo"></Field>
                                                                    <ErrorMessage className="text-red-900" name={`units.${index}.unitNo`} />
                                                                </div>

                                                                <div className='my-3 flex flex-col text-red-900'>
                                                                    <Field name={`units.${index}.unitName`} className="p-2 rounded" placeholder="unitName"></Field>
                                                                    <ErrorMessage className="text-red-900" name={`units.${index}.unitName`} />
                                                                </div>

                                                                <div className='my-3 flex flex-col text-red-900'>
                                                                    <Field name={`units.${index}.Link`} className="p-2 rounded" placeholder="Link"></Field>
                                                                    <ErrorMessage className="text-red-900" name={`units.${index}.Link`} />
                                                                </div>

                                                                <button type="button" className='border-2 bg-red-400 p-3 my-1 rounded' onClick={() => arrayHelper.remove(index)} > - </button>
                                                                {/* <ErrorMessage  className="text-red-900" name={`formik.values.units.${index}`} /> */}
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                            <button type="button" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded' onClick={() => arrayHelper.insert(formik.values.units.length + 1, { unitName: "", unitNo: "", Link: "" })}> Add units</button>
                                        </div>
                                    )
                                    } />


                                    <div className='mt-3'>
                                    <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Add to database</button>

                                    </div>
                                </div>

                            </Form>

                        )
                    }}
                </Formik>

            </div>
        </>
    )
}

export default AddNotes