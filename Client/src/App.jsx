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

export const serverUrl = "http://localhost:5000"

const App = () => {

   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(()=>{
    const ftechMe = async () => {
      try {
        const res = await axios.get(serverUrl + '/api/user/current-user' , {withCrentials:true});

        console.log(res.data);
        setUser(res.data);
        setLoading(false);

      } catch (error) {
        console.log(error)
        console.log(error.response?.data);
  console.log(error.response?.status);
        setLoading(false);
      }
    }
    ftechMe();
   },[])


  return (
    <>
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