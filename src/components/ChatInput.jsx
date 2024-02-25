import React, { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";

const ChatInput = ({handleSendMsg}) => {
  const [msg,Setmsg]=useState("");
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(msg.length>0){
      handleSendMsg(msg);
      Setmsg("");
    }
  }
  return (
    // <div className=" p-4 w-full bg-blue-300 ">
      <div className=" p-5 bg-slate-500 w-full flex flex-row items-center">
        <form className=" w-full flex flex-row" onSubmit={(e)=>{handleSubmit(e)}}>
          <input
            type="text"
            placeholder="Enter your message here"
            className="w-11/12 text-2xl focus:outline-none rounded-l-md"
            name="message"
            onChange={(e)=>{Setmsg(e.target.value)}}
            value={msg}
            
          />

          <div className=" bg-red-400 w-1/12 flex justify-center items-center text-xl rounded-r-md cursor-pointer">
            <button type='submit' >
              <LuSendHorizonal/>
            </button>
          </div>
        </form>
      </div>
    // </div>
  );
};

export default ChatInput;
