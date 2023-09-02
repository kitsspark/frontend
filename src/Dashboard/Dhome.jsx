import React from 'react'
import { Link } from 'react-router-dom'
function Dhome() {
  return (


    <div className='flex min-h-screen justify-center items-center'>


      <div className='flex justify-center items-center p-3  py-5 text-xl shadow bg-white text-blue-500 hover:bg-blue-600 hover:text-white rounded'>

        <Link to="/dashboard/notes">
          <p>Notes</p>
        </Link>
      </div>

    </div>
  )
}

export default Dhome