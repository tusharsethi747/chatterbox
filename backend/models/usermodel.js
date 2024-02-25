import mongoose from "mongoose";

const UserSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,
    },
    password:{
        type:String,
        required:true,
        min:8,
    }
},{timestamps:true});

// module.exports = new mongoose.model("Users",UserSchema);
export const Users=mongoose.model("Users",UserSchema);
