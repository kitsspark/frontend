import React from 'react'
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
    
    const x = localStorage.getItem("accessToken")
    if(x)
    return props.children
else
   return <Navigate to="/login"/>
}

export default ProtectedRoute