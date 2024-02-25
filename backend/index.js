import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import { Users } from "./models/usermodel.js";
import bcrypt from "bcrypt";
import { messages } from "./models/messagemodel.js";
import {Server} from "socket.io";

const app=express();

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const messages =require("./models/messagemodel.js")
// const Users=require("./models/usermodel.js")
// const bcrypt=require("bcrypt")
// // const config=require("dotenv")
// require("dotenv").config();
// const app = express();
// const socket = require("socket.io");


app.use(cors());
app.use(express.json());
config();
const PORT=process.env.PORT;

app.post(`/Register`, async (req,res)=>{
    try{
        const usernameCheck= await Users.findOne({username:req.body.username});
        if(usernameCheck) 
            return res.send({msg:`username already used`,status:false})
        const emailCheck= await Users.findOne({email:req.body.email});
        if(emailCheck){
            return res.send({msg:`email already used`, status:false});
        }
        const hashedPassword =await bcrypt.hash(req.body.password,10);
        const NewUser={
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            confirmpassword:hashedPassword,
        }
        const UserCreate= await Users.create(NewUser);
        delete UserCreate.password;
        return res.send({status:true,UserCreate,msg:`User Created successfully!!`});
    }
    catch(error){
        // console.log(`errors errors !!`)
        // console.log(error);
        res.status(500).send(`error occured`);
    }
})


app.post(`/login`, async (req,res)=>{
    try{
        const user= await Users.findOne({username:req.body.username});
        if(!user) 
            return res.send({msg:`incorrect username or password `,status:false})
        // const emailCheck= await Users.findOne({email:req.body.email});
        // if(emailCheck){
        //     return res.send({msg:`email already used`, status:false});
        // }
        const {username,password}=req.body;


        const isPasswordValid=await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.json({msg:"Incorrect username or password",status:false})
        }
        return res.send({status:true,user,msg:`login successfull`});
    }
    catch(error){
        // console.log(`errors errors !!`)
        // console.log(error);
        res.status(500).send(`error occured`);
    }
})


// show all the contacts
app.get(`/alluser/:id`, async (req,res)=>{
    try{
        const users = await Users.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "_id",
          ]);
          return res.status(200).json({success:true,users })
    }
    catch(error){
        return res.status(500).send({msg:error.message});
    }
})

app.post(`/api/message/addmsg`,async (req,res)=>{
    try{
        const {from,to,message}=req.body
        const Data=await messages.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        })
        if(Data){
            return res.status(200).send({msg:`message sent to database succesfully`});
        }
        else{
            return res.status(500).send({msg:"cant create"})
        }
    }
    catch(error){
        // console.log(error.message);
        return res.status(500).json({msg:`error found`})
        
    }
})

app.post(`/api/message/getmsg`,async(req,res)=>{
    try{
        const {from,to}=req.body;
        const OurChat=await messages.find({
            users:{
                $all:[from,to],
            },
        }).sort({updateAt:1});

        const FilteredChat=OurChat.map((msg)=>{
            return {
                fromSelf: msg.sender.toString()===from,
                message:msg.message.text,
            }
        });
        // console.log(OurChat);
        res.status(200).send({msg:"message sent ", FilteredChat,OurChat})
    }   
    catch(err){
        return res.status(500).send({msg:err.message});
    }
})
// var server;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log(`running`);
})
.catch((error)=>{
    // console.log(`error occurred `);
    console.log(error.message);
})
const server=app.listen(PORT,()=>{
    console.log(`server has started one port no ${PORT}`);
})
const io=new Server(server,{
    cors:{
        // origin:process.env.ORIGIN,
        origin:"*",
        credentials:true,
    }
})

global.onlineUser = new Map();
io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        global.onlineUser.set(userId,socket.id)
        console.log("User added:", userId, "Socket ID:", socket.id);
        console.log(onlineUser)
        
    })
    socket.on("send-msg", (data) => {
        const sendUserSocket = global.onlineUser.get(data.to);
        console.log(`this is my user socket`,sendUserSocket);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});
