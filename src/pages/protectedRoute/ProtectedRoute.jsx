import React from 'react'
import { Navigate, Outlet, } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

function ProtectedRoute({admin,lecturer}) {
    const {loggedIn,user} = useAuth()
    if(admin && user == null) return <Navigate to="/login"/>
    if(admin && !user.roles.includes("Admin")) return <Navigate to="/"/>
    if(lecturer && !user.roles.includes("User")) return <Navigate to="/"/>
    return loggedIn ? <Outlet/> : <Navigate to="/login"/>;
}

export default ProtectedRoute