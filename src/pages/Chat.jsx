import React from 'react'
import axios from 'axios'
import { useState,useEffect ,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import path from '../path'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import { io } from "socket.io-client";

const Chat = () => {
  const [CurrentUser,SetCurrentUser]=useState([]);
  const [contacts,SetContacts]=useState([]);
  const [CurrentChat,SetCurrentChat]=useState(undefined);
  const [isLoaded,SetisLoaded]=useState(false);
  const navigate=useNavigate();
  const socket=useRef();

    useEffect(() => {
      const checkUser = async () => {
          if (!localStorage.getItem(`chat-app-user`)) {
              navigate(`/login`);
          } else {
              const MyUser = await JSON.parse(localStorage.getItem(`chat-app-user`));
              // console.log(`My user is `,MyUser);
              SetCurrentUser(MyUser);
              SetisLoaded(true);
          }
      };

      checkUser();
  }, []);

  useEffect(()=>{
    // console.log(`my current user is inside `, CurrentUser._id)
    if(CurrentUser){
      socket.current=io(`${path}`);
      socket.current.emit("add-user",CurrentUser._id);
      console.log(`id of current user is `, CurrentUser._id)
    }
  },[CurrentUser])

    useEffect(() => {
        const fetchData = async () => {
            if (CurrentUser) {
                try {
                    const response = await axios.get(`${path}/alluser/${CurrentUser._id}`);
                    SetContacts(response.data.users);
                    // console.log(`this is my contacts`);
                    // console.log(response.data.users);
                  } catch (error) {
                    console.error("Error fetching data:");
                }
            }
        };

        fetchData();
    }, [CurrentUser]);

    const handleChatChange=(chat)=>{
      SetCurrentChat(chat);
    }

  return (
    <div className=' h-screen w-screen flex flex-col justify-center items-center custom-bg-color gap-5'>
      
        <div className=' set-dimensions  bg-slate-100 grid grid-cols-2'>
          <Contacts ContactsOne={contacts} CurrentUser={CurrentUser} CurrentChat={handleChatChange}/>
          {
            isLoaded && CurrentChat===undefined?(
              <Welcome/>
            )
            :
            (<ChatContainer currentChat={CurrentChat} currentUser={CurrentUser} socket={socket}/>)
            // (<ChatContainer currentChat={CurrentChat} currentUser={CurrentUser} />)
          }
        </div>
    </div>
  )
}

export default Chat





  // useEffect(async ()=>{
  //   if(!localStorage.getItem(`chat-app-user`)){
  //     navigate(`/login`)
  //   }
  //   else{
  //     const MyUser=await JSON.parse(localStorage.getItem(`chat-app-user`));
  //     SetCurrentUser(MyUser);
  //   }
  // },[])

  // useEffect(async()=>{
  //   if(CurrentUser){
  //     const data=await axios.get(`${path}/alluser/${CurrentUser._id}`)
  //     console.log(data);
  //   }
  // },[])