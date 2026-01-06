import React from 'react'
import './Login.css'
import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
function LoginPage() {
  const[username,setusername]=useState("")
  const[password,setpassword]=useState("")
  const navigate= useNavigate()
  // console.log("password:",password);
  const body={username,password} 
  const handlesubmit=async (e)=>{
    e.preventDefault();
    
    try{

    const result=await api.post('/login',body)
    console.log(result);
    alert(result.data.message)

    if(result.data.role=="cordinator"){
      navigate('/coordinatorHome')
    }
    
    else  if(result.data.role=="admin"){
      navigate('/adminHomepage')
    }
setusername("");
setpassword("");
  
  }
  catch(e){
    console.log(e);
    
  }
  }
  
  
  return (
    <div className='loginpage'>
        <div className='login'>
           <center><h1>
        LoginPage

            </h1></center>
       
    <form onSubmit={handlesubmit}>
    <table>
      <tr>
        <td>
        <label for="username">Username</label>

        </td>
        <td>
        <input type="text" name="username"onChange={(e)=>setusername(e.target.value)}/>

        </td>
      </tr>
       <tr>
        <td>
        <label for="password">password</label>

        </td>
        <td>
        <input type="password" name="password"onChange={(e)=>setpassword(e.target.value)}/>
          
        </td>
      </tr>
    </table>
       
        <center>< button type='submit' className='loginbutton' style={{color:'green'}}>submit</button></center>
        
    </form>
        </div>

        
    </div>
  )
}

export default LoginPage