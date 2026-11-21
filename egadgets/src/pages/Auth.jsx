import React from 'react'
import { useState } from "react"
import { Last } from 'react-bootstrap/esm/PageItem'
import { CgPassword } from 'react-icons/cg'
import { userSignInApi,userSignUpApi } from '../services/allApis'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Auth() {

  const [authStatus, setAuthStatus] = useState(true)
  const [authData,setAuthData] = useState({
    first_name:"",last_name:"",email:"",username:"",password:"",confirm_password:""
   })

   const navigate=useNavigate()
   const handleSignUp=async()=>{
    console.log(authData)
    const {first_name,last_name,email,username,password,confirm_password}=authData
    if(!first_name || !last_name || !email || !username || !password || !confirm_password){
      toast.info("Enter Valid Inputs!!")
    }
    else{
      if(password===confirm_password){
        const response=await userSignUpApi(authData)
        console.log(response)
        if(response.status===201){
          toast.success("Sign Up Successfull!!")
          setAuthStatus(!authStatus)
          setAuthData({first_name:"",last_name:"",email:"",username:"",password:"",confirm_password:""})
        }
        else{
          toast.error("Sign Up Failed!!!")
        }
      }
      else{
        toast.warn("Passwords mismatch!!")
      }
    }

   }
   const handleSignIn=async()=>{
    console.log(authData)
    const {username,password}=authData
    if (!username || !password){
      toast.info("Enter valid Input!!")
    }
    else{
      const response=await userSignInApi(authData)
      console.log(response)
      if (response?.status===200){
        toast.success("Sign In succesfull!!")
        sessionStorage.setItem('token',response?.data?.token)
        sessionStorage.setItem('uname',username)
        navigate('/')
      }
      else{
        toast.error("sign In Failed!!")
      }
        }
   }


  return (
    <div style={{ minHeight: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <div className="w-75 border shadow overflow-hidden">
        <div className="row">
          <div className="col-sm-12 col-md-7 ">
            <img src="https://i.pinimg.com/736x/3b/7a/c1/3b7ac14519bb42927016d78c8c072a90.jpg" alt="banner1"
              style={{ height: '70vh' }} />
          </div>
          <div className='col-sm-12 col-md-5 p-4 d-flex justify-content-center flex-column' style={{ backgroundColor: "#f3efff" }}>
            {authStatus?
            <h2 className="text-center my-2 mb-4">Sign in</h2>:
            <h2 className="text-center my-2 mb-4">Sign Up</h2>
            } 
            <div>
              {
                !authStatus && 
                <>
                  <input type="text" placeholder='FirstName' value={authData.first_name} onChange={(e)=>{setAuthData({...authData,first_name:e.target.value})}} className='form-control mb-3' />
                  <input type="text" placeholder='LastName' value={authData.last_name} onChange={(e)=>{setAuthData({...authData,last_name:e.target.value})}} className='form-control mb-3' />
                  <input type="text" placeholder='Email' value={authData.email} onChange={(e)=>{setAuthData({...authData,email:e.target.value})}} className='form-control mb-3' />
                </>
              }
              <input type="text" value={authData.username} placeholder='Username' onChange={(e)=>{setAuthData({...authData,username:e.target.value})}} className='form-control mb-3' />
              <input type="password" value={authData.password} placeholder='password' onChange={(e)=>{setAuthData({...authData,password:e.target.value})}} className='form-control mb-3' />
              {
                !authStatus &&
                <input type="password" value={authData.confirm_password} placeholder="confirm password" onChange={(e)=>{setAuthData({...authData,confirm_password:e.target.value})}} className="form-control mb-3"/>
                
              }
            <div className='my-2 d-flex justify-content-between'>
              {authStatus?
              <button className='btn btn-outline-info' onClick={handleSignIn}>Sign in</button>:
              <button className='btn btn-outline-info' onClick={handleSignUp} >Sign up</button>
              
                
              }
              <button className='btn btn-link' onClick={()=>setAuthStatus(!authStatus)}>{authStatus?<>NewUser?</>:<>Are you already a user?</>}</button>
            </div>
          </div>
        </div>

      </div>
    </div>
    </div>
    
  )
}

export default Auth



