import { useState } from 'react'
import { RouterProvider, Route, createRoutesFromElements, createBrowserRouter, useNavigate } from 'react-router-dom'
import Layout from './Layout.jsx'
import Errorpage from './pages/Errorpage.jsx'
import Homepage from './pages/Homepage.jsx'
import Notes from './pages/Notes.jsx'
import Timetable from './pages/Timetable.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './utils/ProtectedRoute.jsx'
// dashboard components imports
import Dlayout from './Dashboard/Dlayout.jsx'
import Dnotes from './Dashboard/Notes/Dnotes.jsx'
import UpdateNotes from './Dashboard/Notes/UpadateNotes.jsx'
import AddNotes from './Dashboard/Notes/AddNotes.jsx'
import Dhome from './Dashboard/Dhome.jsx'
// actions
import { loginAction } from './pages/Login.jsx'


// loader
import { loader as noteLoader } from './pages/Notes.jsx'
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />} errorElement={<Errorpage />}  >

          <Route index element={<Homepage />} />
          <Route path='notes' loader={noteLoader} element={<Notes />} />
          <Route path='timetables' element={<Timetable />} />
          <Route path='login' element={<Login />} action={loginAction} />
        </Route>


        <Route path="/dashboard" element={<ProtectedRoute><Dlayout /></ProtectedRoute>}>
          <Route index element={<Dhome />} ></Route>
          <Route path='notes' loader={noteLoader} element={<Dnotes />} ></Route>
          <Route path='notes/add' element={<AddNotes />} ></Route>
          <Route path='notes/:id' element={<UpdateNotes />} ></Route>
        </Route>

      </>
    )

  )


  return (
    <>
      <RouterProvider router={router} />


    </>
  )
}

export default App
