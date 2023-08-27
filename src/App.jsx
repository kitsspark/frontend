import { useState } from 'react'
import { RouterProvider, Route,  createRoutesFromElements,createBrowserRouter } from 'react-router-dom'
import Layout from '/src/layout.jsx'
import Errorpage from '/src/pages/Errorpage.jsx'
import Homepage from '/src/pages/Homepage.jsx'
import Notes from '/src/pages/Notes.jsx'
import Timetable from '/src/pages/Timetable.jsx'
import Login from '/src/pages/Login.jsx'
import Dashboard from '/src/pages/Dashboard.jsx'
// actions

import { loginAction } from '/src/pages/Login.jsx'

function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route
      path="/"
      element = {<Layout />}
      errorElement={<Errorpage />}
      
      > 

      <Route index element = {<Homepage/> }/>
      <Route path='notes' element={ <Notes/>} />
      <Route path='timetables' element={ <Timetable />} />
      <Route path='login' element={ <Login /> }   action ={loginAction} />


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
