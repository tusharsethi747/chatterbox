import React, { useEffect, useState,useRef } from "react";
import avatarImg from "../assets/50994.jpg";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { io } from "socket.io-client";
import path from "../path";

const ChatContainer = ({ currentChat ,currentUser,socket}) => {

  const [msg,Setmsg]=useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);


  const handleSendMsg=(Singlemsg)=>{
    socket.current.emit("send-msg",{
     to:currentChat._id,
     from:currentUser._id,
     message:Singlemsg,
    })
     axios.post(`${path}/api/message/addmsg`,{
      from:currentUser._id,
      to:currentChat._id,
      message:Singlemsg,
     })
     console.log(`after`)
      const msgs = [...msg];
      msgs.push({ fromSelf: true, message: Singlemsg });
      Setmsg(msgs);
  }

  useEffect(()=>{

    const getMsgFunc =async()=>{
      const response=await axios.post(`http://localhost:5500/api/message/getmsg`,{
        from: currentUser._id,
        to: currentChat._id,
      })
      // console.log(response.data.FilteredChat);
      Setmsg(response.data.FilteredChat)
    }
     currentChat && getMsgFunc();

  },[currentChat])

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);


  useEffect(() => {
    arrivalMessage && Setmsg((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  
  return (
    <>
      {currentChat && (
        <>
          <div className="ChatContainer-CSS h-full">
            <div className=" flex justify-between flex-row items-center p-1 bg-white">
              <div className="flex flex-row gap-2">
                <div>
                  <img src={avatarImg} alt="User Avatar" className=" h-16 rounded-md" />
                </div>
                <div className="flex justify-center items-center">
                  <h3 className=" text-4xl changeFont uppercase">{currentChat.username}</h3>
                </div>
              </div>

              <div className=" text-xl">
                {/* <Tooltip title="logout"> */}
                <Logout/>

                {/* </Tooltip> */}
              </div>

            </div>

            <div className="px-6 py-4 flex flex-col gap-4 overflow-auto bg-blue-200">
              {
                msg.length>0  && msg.map((message,index)=>{
                  return (
                    <div className=" inline-block ">
                      <div className={`flex items-center ${message.fromSelf ? ` justify-end  text-right`:` justify-start  text-left`}`}>
                        <div className= {`w-5/12 break-words p-4 !rounded-md text-black  changeFontmsg ${message.fromSelf ? ` bg-green-300`:` bg-slate-500`}`}>
                          {message.message}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <ChatInput handleSendMsg={handleSendMsg} />
          </div>
        </>
      )}
    </>
    
  );
};

export default ChatContainer;
