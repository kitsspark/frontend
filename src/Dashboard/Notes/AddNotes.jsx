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
    units : yup.array(yup.object({
        unitNo: yup.number("unitNo must be +ve integer").required("Unit Number is required").positive("Unit Number must be a positive number").integer("Unit Number must be an integer"),
        unitName: yup.string().required("Required"),
        Link: yup.string().required("Required")
    })).min(1)
  });

function AddNotes() {
    const navigate = useNavigate()
  return (
    <>
    <Formik
    initialValues={{
        subjectName : '',
        semister: '',
        regulation: '',
        units:[{unitName:"",unitNo:0,Link:""}]
    }}

    onSubmit={async(values)=>{
        const response = await AxiosInstance.post("/notes",values);
        console.log(response)
        if(response.data.message === "subject sucessfully created")
        {
          toast.success('Sucessfully Created!');
          navigate("/dashboard/notes");
        }
        else
        {
          toast.error("Failed to create")


        }
        
    }}

    validationSchema = {validationSchema}
    >
    
    {(formik)=>{
        return (    

    <Form>
        <Field name = "subjectName" placeholder="SubjectName"></Field>
        <ErrorMessage  className="text-red-900"name="subjectName" />
        <Field name = "semister" placeholder="semister"></Field>
        <ErrorMessage  className="text-red-900" name="semister" />
        <Field name = "regulation" placeholder="regulation"></Field>
        <ErrorMessage  className="text-red-900" name="regulation" />

        <FieldArray name="units" render = {(arrayHelper)=>(
            <div>
            {
                formik.values.units.map((unit,index)=>{
                    return (
                        <div key={index}>
                            <Field name = {`units.${index}.unitNo`} placeholder="unitNo"></Field>
                            <ErrorMessage  className="text-red-900" name={`units.${index}.unitNo`} />
                            <Field name = {`units.${index}.unitName`} placeholder="unitName"></Field>
                            <ErrorMessage  className="text-red-900" name={`units.${index}.unitName`} />
                            <Field name = {`units.${index}.Link`} placeholder="Link"></Field>
                            <ErrorMessage  className="text-red-900" name={`units.${index}.Link`} />
                            <button type="button" onClick={() => arrayHelper.remove(index)} > - </button>
                            {/* <ErrorMessage  className="text-red-900" name={`formik.values.units.${index}`} /> */}
                        </div>
                    )
                })
            }
            <button type="button" onClick={() => arrayHelper.insert(formik.values.units.length+1,{unitName:"",unitNo:"",Link:""})}> Add units</button> 
            </div>
        )
    }/>


        <button type="submit" className='p-1 bg-blue-200 rounded'>Add to database</button>
    </Form>
    
    )}} 
    </Formik>
    </>
  )
}

export default AddNotes