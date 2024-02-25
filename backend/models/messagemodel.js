// const mongoose = require("mongoose");
import mongoose from "mongoose";

const messageSchema= mongoose.Schema({
    message:{
        text:{
            type:String,
            requred:true
        }
    },
    users:Array,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        red:"Users",
        required:true,
    }

},{timestamps:true})

export const messages=new mongoose.model("messages",messageSchema);
// module.exports=mongoose.model("messages",messageSchema);