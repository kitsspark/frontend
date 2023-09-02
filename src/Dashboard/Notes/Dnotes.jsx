import React from 'react';
import { useState } from 'react';
import { useLoaderData,Link,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
//component imports
import AddNotes from './AddNotes';
import UpadateNotes from './UpadateNotes';
import { AxiosInstance } from '../../utils/constants';
// icon imports
import {FcDeleteDatabase} from 'react-icons/fc'
import {AiFillEdit} from 'react-icons/ai'
import {IoMdAddCircleOutline} from 'react-icons/io'


function Dnotes() {
  const data = useLoaderData();
  const navigate = useNavigate()
  const notesData = data.data.notes;
  const [querry, setquerry] = useState('')
  const deleteSubject = async(id)=>{
    const response = await AxiosInstance.delete(`/notes/${id}`)
      if(response.status == 200){
        toast.success(response.data.message)
        navigate("/dashboard/notes");
      }
      else{
        toast.error("Failed to delete")
      }
    
  }
  return (
    <>
    <div className='flex justify-center'><input onChange={(e)=>setquerry(e.target.value)} placeholder='search for subject' className='p-1 border rounded border-gray-900 m-3 '></input></div>
    <div className='grid grid-cols-4 gap-2 '>
    <Link to="/dashboard/notes/add" className='border border-gray-900 rounded grid place-items-center'> 
    <div className='grid place-items-center '>
            <IoMdAddCircleOutline className='h-5 w-5 '/>  
            <p>Add new subject</p>          
    </div></Link>

      {
    notesData.filter((subject)=>{
      if(subject.subjectName.toLowerCase().includes(querry.toLowerCase()))
        return subject
    }).map((subject) => {
        return( 
          <div  key={subject._id} className='border border-gray-900 rounded '>
            <p className='text-center'>{subject.subjectName}</p>
            <div className='flex justify-around'>
            <p > semister:{subject.semister}</p>
            <p> regulation:{subject.regulation}</p></div>
            <p className='h-0.5 bg-gray-300 mx-3'></p>
            <div className='flex justify-around'>
            <button onClick={()=> deleteSubject(subject._id)}>
            <FcDeleteDatabase/> </button>

            <Link to={`/dashboard/notes/${subject._id}`}>
            <AiFillEdit/></Link>

            </div>
          </div>
      )})}
    </div>
    </>
  );
}

export default Dnotes;