import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import path from '../path';
import { useNavigate } from 'react-router-dom';
import logo2 from "../assets/logo2.jpg";

const Register = () => {
  const navigate=useNavigate();
  const [Values,SetValues]=useState({
    username:"",
    email:"",
    password:"",
    confirmpassword:"",
  })
  const toastOptions={
    position:"bottom-right",
    pauseOnHover:true,
    autoclose:8000,
    draggable:true,
  }
  const HandleOnChange=(event)=>{
    SetValues({...Values,[event.target.name]:event.target.value});
  }
  useEffect(()=>{
    if(localStorage.getItem(`chat-app-user`)){
      navigate(`/`);
    }
  },[])
  const HandleValidation=()=>{
    const {username,email,password,confirmpassword}=Values;
    if(password!==confirmpassword){
      toast.error(`Password and Confirm Password should be Same!!`,toastOptions);
      return false;
    }
    if(password.length<8){
      toast.error(`password length should be greater than or equal to 8 !!`,toastOptions);
      return false;
    }
    return true;
  }

  const HandleSubmit= async (event)=>{
    event.preventDefault();
    if(HandleValidation()){

       await axios.post(`${path}/Register`,Values)
        .then((response)=>{
          const {status,msg}=response.data;
          if(status===false){
            toast.error(msg,toastOptions);
          }
          else if(status==true){
            toast.success(msg,toastOptions);
            console.log(response.data.UserCreate);
            localStorage.setItem(`chat-app-user`,JSON.stringify(response.data.UserCreate))
            navigate(`/`)
          }
        })
        .catch((error)=>{
          console.log(error);
        })
    }
  }

  return (
    <div className=' flex flex-col gap-1 justify-center w-screen h-screen bg-blue-400 items-center '>
      <form className=' flex flex-col gap-2 justify-center items-center rounded-md bg-slate-700 px-12 py-12'>
        <div className=' flex flex-row gap-1 justify-center items-center '>
          <img src={logo2} alt='logo here' className='h-16 rounded-md '/>
          <h1 className=' font-medium text-green-500 text-4xl p-3 w-full'>CHATTERBOX</h1>
        </div>

        <input
          type='text'
          placeholder='Username'
          name='username'
          onChange={(e)=>{HandleOnChange(e)}}
          className=' p-3 rounded-md w-full text-xl'
        />

        <input
          type='email'
          placeholder='Email'
          name='email'
          onChange={(e)=>{HandleOnChange(e)}}
          className=' p-3 rounded-md w-full text-xl'
        />
        
        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={(e)=>{HandleOnChange(e)}}
          className=' p-3 rounded-md w-full text-xl'
        />
        <input
          type='password'
          placeholder='Confirm Password'
          name='confirmpassword'
          onChange={(e)=>{HandleOnChange(e)}}
          className=' p-3 rounded-md w-full  text-xl'
        />

        <span className=' uppercase text-white text-sm'>
          Already have a account? <Link className=" text-red-300 mt-4 underline" to={'/login'}>Login</Link>
        </span>

        <button type='submit' onClick={(e)=>{HandleSubmit(e)}} className=' bg-red-400 text-2xl p-3 w-full rounded-md font-semibold hover:bg-green-500 uppercase cursor-pointer text-white'>Submit</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Register