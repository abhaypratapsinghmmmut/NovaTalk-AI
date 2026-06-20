import React from 'react'
import axios from 'axios';
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Navbar from './components/Navbar.jsx'
import Billing from './pages/Billing.jsx'
import Builder from './pages/Builder.jsx'
import {Toaster} from 'react-hot-toast'

export const serverUrl = "https://novatalk-ai-server.onrender.com"
export const clientUrl = "http://localhost:5173"

const App = () => {

   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
  const fetchMe = async () => {
    try {
      const res = await axios.get(
        serverUrl + "/api/user/current-user",
        { withCredentials: true }
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchMe();
}, []);


  return (
    <>
    <Toaster position='top-right'/>
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />} />

        <Route path='/*' element={ <ProtectedRoute user={user} loading={loading}>
              <Navbar setUser={setUser} user={user} />

              <Routes>
                <Route path='/' element={<Home user={user} />} />

                <Route path='/builder' element={<Builder user={user} setUser={setUser}/>} />
                <Route path='/billing' element={<Billing user={user} />} />
                <Route path='*' element={<Navigate to='/' replace/>} />
              </Routes>


            </ProtectedRoute> } />
      </Routes>
    </>
  )
}

export default App
