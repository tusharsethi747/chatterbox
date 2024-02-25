import React, { useEffect } from 'react'
import { useState } from 'react'
import robot2 from "../assets/robot2.gif"

const Welcome = () => {
    const [UserName,SetUserName]=useState("");

    useEffect( ()=>{
        const getData=async()=>{
            const Myuser=  await JSON.parse(localStorage.getItem(`chat-app-user`)).username;
            // console.log(`Myuser name`,Myuser);
            SetUserName(Myuser);
        }
        getData();
    },[])

  return (
    <div className=' bg-green-400 p-5'>
        <h1 className=' text-5xl text-yellow-950 text-center uppercase font-bold welcome-responsive'>Welcome to the Chat app  </h1>
        <h3 className=' text-3xl text-yellow-950 text-center welcome-responsive'>Please choose a contact to initiate a conversation</h3>
        <img src={robot2} alt="" className=' m-auto'/>
    </div>
  )
}

export default Welcome