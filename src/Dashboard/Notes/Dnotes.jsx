import React from 'react';
import { useLoaderData,Link } from 'react-router-dom';
import AddNotes from './AddNotes';
import UpadateNotes from './UpadateNotes';
// icon imports
import {FcDeleteDatabase} from 'react-icons/fc'
import {AiFillEdit} from 'react-icons/ai'
function Dnotes() {
  const data = useLoaderData();
  const notesData = data.data.notes;
  console.log(notesData)
  return (
    <>
    <AddNotes/>
    <div className='grid grid-cols-4 gap-2 '>
      {notesData.map((subject) => {
        return( 
          <div  key={subject._id} className='border border-gray-900 rounded '>
            <p className='text-center'>{subject.subjectName}</p>
            <div className='flex justify-around'>
            <p > semister:{subject.semister}</p>
            <p> regulation:{subject.regulation}</p></div>
            <p className='h-0.5 bg-gray-300 mx-3'></p>
            <div className='flex justify-around'>
            <FcDeleteDatabase/>

            <Link to={`/dashboard/notes/${subject._id}`}>
            <AiFillEdit/></Link>

            </div>
          </div>
      )})}
    </div>
    <UpadateNotes/>
    </>
  );
}

export default Dnotes;
