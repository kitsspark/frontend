import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APIURL } from '../../utils/constants';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { AxiosInstance } from '../../utils/constants';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';


import toast from 'react-hot-toast';
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

function UpdateNotes() {
  const { id } = useParams();
  const [data, setData] = useState({
    subjectName : "",
          semister: "",
          regulation: ""
  });
  

  useEffect(() => {
    axios.get(`${APIURL}/notes/${id}`).then((response)=>{setData(response.data.subject)
    }).catch (error => 
      toast.error('Error fetching data:'))
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      {data ? (
        <Formik 
        enableReinitialize={true}
        initialValues={{
          subjectName : data.subjectName,
          semister: data.semister,
          regulation: data.regulation,
          units : data.units
      }}
      validationSchema={validationSchema}

      onSubmit={async(values)=>{
        const response = await AxiosInstance.put(`/notes/${id}`,values);
        if(response.status == 200)
        {
          toast.success('Sucessfully updated!');
          navigate("/dashboard/notes");

        }
        else
        {
          toast.error("Failed to update")
          toast.error(response.data.message)

        }
        
   
    }}
        >
         
{(formik)=>{

  return (
    <Form>
      <Field name="subjectName" value ={formik.values.subjectName}></Field>
      <ErrorMessage  className="text-red-900"name="subjectName" />
      <Field name="semister" value ={formik.values.semister}></Field>
      <ErrorMessage  className="text-red-900" name="semister" />
      <Field name="regulation" value ={formik.values.regulation}></Field>
      <ErrorMessage  className="text-red-900" name="regulation" />

      <FieldArray name="units" render = {(arrayHelper)=>(
            <div>
            {
                formik.values.units?.map((unit,index)=>{
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
    <button type="submit" className='p-1 bg-blue-200 rounded'>update subject</button>
    </Form>
      
      )}}</Formik>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UpdateNotes;