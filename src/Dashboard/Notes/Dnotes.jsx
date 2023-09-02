import React from 'react';
import { useState } from 'react';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
//component imports
import AddNotes from './AddNotes';
import UpadateNotes from './UpadateNotes';
import { AxiosInstance } from '../../utils/constants';
// icon imports
import { FcDeleteDatabase } from 'react-icons/fc'
import { AiFillEdit } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'


function Dnotes() {
  const data = useLoaderData();
  const navigate = useNavigate()
  const notesData = data.data.notes;
  const [querry, setquerry] = useState('')
  const deleteSubject = async (id , name) => {
    alert(`Do you want to delete ${name}`)
    const response = await AxiosInstance.delete(`/notes/${id}`)
    if (response.status == 200) {
      toast.success(response.data.message)
      navigate("/dashboard/notes");
    }
    else {
      toast.error("Failed to delete")
    }

  }
  return (
    <>

      <div className='flex justify-center  flex-col'>

        <div className='flex justify-center  flex-col'>
          {/* add new subject */}

          <h3 className='text-black uppercase font-semibold text-xl'>
            ADD SUBJECT
          </h3>
          <div className=' shadow p-3 bg-white rounded m-5  ' >
            <Link to="/dashboard/notes/add" >
              <div className='grid place-items-center '>
                <IoMdAddCircleOutline className='h-5 w-5 ' />
                <p className='text-blue-700'>click here to add new subject</p>
              </div>
            </Link>

          </div>

        </div>
        <div>
          <h3 className='text-black uppercase font-semibold text-xl'>
            update existing subject
          </h3>
          {/* update existing subject */}

          <div className='flex justify-center'>

            <input onChange={(e) => setquerry(e.target.value)} placeholder='search for subject' className='p-2 focus:outline-none focus:ring focus:border-blue-700 border rounded border-gray-900 m-3 '></input>

          </div>

          <div className='md:grid md:grid-cols-3'>
            {
              notesData.filter((subject) => {
                if (subject.subjectName.toLowerCase().includes(querry.toLowerCase()))
                  return subject
              }).map((subject) => {
                return (
                  <div key={subject._id} className=' shadow  bg-white  text-black m-3 p-3 '>
                    <p className='text-center uppercase font-semibold'>{subject.subjectName}</p>
                    <div className='flex justify-around border-b-2  my-1'>
                      <p > semister : {subject.semister}</p>
                      <p> regulation : {subject.regulation}</p>
                      </div>
                   
                    <div className='flex justify-around '>
                      <button onClick={() => deleteSubject(subject._id , subject.subjectName)}> <   FcDeleteDatabase  /> </button>
                      <Link to={`/dashboard/notes/${subject._id}`}> <AiFillEdit /> </Link>
                    </div>
                  </div>
                )
              })

            }

          </div>
        </div>


      </div>
    </>
  );
}

export default Dnotes;