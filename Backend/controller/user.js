const express = require('express')
const mongoose = require('mongoose')

const User = require('../model/user')
const router = express.Router();

router.post('/signup',async(req,res)=>{
   try{
    const {Fullname,Email,PhoneNumber,Password} = req.body
    if(!Fullname || !Email || !PhoneNumber || !Password)
        return res.status(400).json({message:"Fields are required"})

    const existingUser = await User.findOne({
        $or: [{ Email }, { PhoneNumber }]
      });
  
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  

    const savedb = new User({Fullname,Email,PhoneNumber,Password})
     await savedb.save();
     res.status(200).json({message:"User saved DB",data:savedb})
   }
   catch(err){
    console.log("Error occured",err)
   }
})


module.exports = router