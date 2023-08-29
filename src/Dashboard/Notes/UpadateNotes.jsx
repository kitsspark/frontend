import React from 'react'
import axios from 'axios'
import { APIURL } from '../../utils/constants';
import { useParams } from 'react-router-dom'
// import { useLoaderData } from 'react-router-dom';
function UpadateNotes() {
    const {id} = useParams()
    console.log(id)
    const data = useLoaderData()
    console.log(data.data)
    
    console.log(id);
  return (
    <div>UpadateNotes</div>
  )
}

export const specificNotesLoader = async () => {
    const id = useParams()
    console.log(id)
    let data = await axios.get(`${APIURL}/notes/${id}`)
    return data
}
export default UpadateNotes