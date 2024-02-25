// import express from "express";
// const router=express.Router();
// import Users from "..models/usermodel.js";
// router.post(`/Register`, async (req,res)=>{
//     try{
//         const NewUser={
//             username:req.body.username,
//             email:req.body.email,
//             password:req.body.password,
//             confirmpassword:req.body.confirmpassword,
//         }
//         const UserCreate= await Users.create(NewUser);
//         return res.status(200).send(`new user has been created!!`);

//     }
//     catch(error){
//         console.log(error);
//         res.status(500).send(`error occured`);
//     }
// })

// export default router;