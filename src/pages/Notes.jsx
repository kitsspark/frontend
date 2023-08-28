import React, { useState } from 'react';
import axios from 'axios';
import { APIURL } from "../utils/constants"
import { useLoaderData, useNavigation } from 'react-router-dom';

const SubjectNotes = (props) => {

    return (
        <div className=' shadow p-3 m-1 rounded bg-white'>
            {/* subject name */}
            <div className='text-center uppercase font-semibold'> {props.subject.subjectName} </div>
            <div>
                {/* all units */}
                <div>
                    <h3  className='uppercase text-sm'> Units :</h3>
                    <ul className='flex justify-center items-center flex-col'>
                    {props.subject.units.map((unit) =>{
                        return (  <li className=' text-blue-900 hover:text-white text-sm p-1 rounded hover:bg-blue-700' key={unit._id}> <a href={`${unit.Link}`}> {unit.unitName} </a> </li> )
                    })}
                    </ul>
                   

                </div>
            </div>

            <div className='flex flex-row justify-between px-1 border-t-2 border-dotted'>
                {/* regulation and semister */}
                <div>{props.subject.regulation}</div>
                <div>{props.subject.semister}</div>
            </div>
        </div>
    )

}
const Notes = () => {
    const [Query, setQuery] = useState('');
    const data = useLoaderData();
    const notesData = data.data.notes;
    const navigation = useNavigation();

    if (navigation.state === 'loading ') {

        return (
            <div className='h-full flex justify-center items-center'>
                <p> LOADING ..</p>
            </div>
        )
    }
    return (
        <>
            <div className='h-full flex flex-col justify-center items-center'>

                <div className=' rounded flex items-center bg-white p-2'>
                    <input type="text" className='focus:outline-none  rounded   ' onChange={event => { setQuery(event.target.value); }}  placeholder='Enter subject name' />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

                </div>


                <div className='md:grid md:grid-cols-3'>
                    {
                        notesData.filter((subjectNotes) => {
                            return (subjectNotes.subjectName.toLowerCase().includes(Query.toLowerCase().trim()))
                        }).map((subjectNotes) => {

                            return <SubjectNotes subject={subjectNotes} key={subjectNotes._id} />
                        })
                    }
                </div>

            </div>

        </>
    );
};

export default Notes;

export const loader = async () => {

    let data = await axios.get(`${APIURL}/notes`)
    return data
}
