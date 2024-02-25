import React from "react";
import { useState, useEffect } from "react";
import avatarImg from "../assets/50994.jpg";
import logo2 from "../assets/logo2.jpg";
const Contacts = ({ ContactsOne, CurrentUser,CurrentChat }) => {
  const [currentUserName, SetcurrentUserName] = useState(undefined);
  const [currentSelected, SetcurrentSelected] = useState(undefined);
  
  useEffect(() => {
    if (CurrentUser) {
      SetcurrentUserName(CurrentUser.username);
    }
  }, [CurrentUser]);
  // console.log(`this is my contacts in contacts.jsx `, ContactsOne);
  // console.log(`this is my current user`, CurrentUser);
  const changeCurrentChat = (index, contact) => {
    SetcurrentSelected(index);
    CurrentChat(contact);
  };
  return (
    <React.Fragment>
      {currentUserName && (
        <div className=" grid overflow-hidden bg-blue-200 Set-Contact-Rows make-responsive">
          <div className=" flex  gap-1 justify-center items-center">
            <img src={logo2} alt="logo here" className="h-16 rounded-3xl ml-2 " />
            <h1 className=" font-bold text-green-500 text-4xl p-3 !w-11/12 changeFont ">
              CHATTERBOX
            </h1> 
          </div>

          <div className=" flex flex-col items-center overflow-auto gap-3 mt-2 mb-2 ">
            {ContactsOne.map((contact, index) => (
              <div
                className={` min-h-20 cursor-pointer w-11/12 p-2 rounded-md flex gap-4 items-center ease-in-out duration-75 bg-slate-500${
                  index === currentSelected ? " !bg-green-300" : ""
                }`}
                key={index}
                onClick={()=>{changeCurrentChat(index,contact)}}
              >
                <div>
                  <img
                    src={avatarImg}
                    alt="this is avatar"
                    className="h-20 rounded-full max-[740px]:h-10"
                  />
                </div>
                <div>
                  <h2 className=" text-2xl max-[740px]:text-xl">{contact.username}</h2>
                </div>
              </div>
            ))}
          </div>

          <div className=" flex justify-center items-center  bg-slate-700">
              <div>
                <img src={avatarImg} className=" h-16 rounded-full max-[740px]:h-10"/>
              </div>
              <div>
                <h2 className=" p-4 text-2xl">{currentUserName}</h2>
              </div>
          </div>

        </div>
      )}
    </React.Fragment>
  );
};

export default Contacts;
