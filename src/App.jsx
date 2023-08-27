import { useState } from 'react'
import { RouterProvider, Route,  createRoutesFromElements,createBrowserRouter } from 'react-router-dom'
import Layout from './layout'
import Errorpage from './pages/Errorpage'
import Homepage from './pages/Homepage'
import Notes from './pages/Notes'
import Timetable from './pages/Timetable'
import Login from './pages/Login'

// actions

import { loginAction } from './pages/Login'
import Dashboard from './pages/Dashboard'
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
