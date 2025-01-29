import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../components/ContextProvider'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

const Login = () => {
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState(false)
  const[token,setToken]=useState("")
  const{handleLogin,handleLogout} =useContext(AuthContext)
  const navigate = useNavigate()
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      const response = await axios({
        method:"POST",
        url:`https://fakestoreapi.com/auth/login`,
        data:{
          username,password
        }
      })
  
      if(response.data){
        console.log(response.data.token)
        const {token} =response.data
        setToken(token)
        handleLogin()
      }
    }catch(err){
      console.log(err.response.data)
      setError(err.response.data)
      alert(err.response.data)
      handleLogout()
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='loginform'>
        <h2>Please Login...</h2>
        <input type='text' placeholder='Enter Username'  value={username} onChange={(e)=>setUsername(e.target.value)}/>
      <input type='password'placeholder='Enter Password' value={password}onChange={(e)=>setPassword(e.target.value)}/>
      <input type='submit'  value='Login' />
      </form>
      
    </div>
  )
}

export default Login
