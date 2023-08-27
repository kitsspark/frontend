import { useState } from 'react'
import { RouterProvider, Route, createRoutesFromElements, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Errorpage from './pages/Errorpage.jsx'
import Homepage from './pages/Homepage.jsx'
import Notes from './pages/Notes.jsx'
import Timetable from './pages/Timetable.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
// actions
import { loginAction } from './pages/Login.jsx'


// loader
import {loader as noteLoader} from './pages/Notes.jsx'
function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={<Layout />} errorElement={<Errorpage />}  >

        <Route index element={<Homepage />} />
        <Route path='notes'  loader={noteLoader} element={<Notes />} />
        <Route path='timetables' element={<Timetable />} />
        <Route path='login' element={<Login />} action={loginAction} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

    )

  )



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
