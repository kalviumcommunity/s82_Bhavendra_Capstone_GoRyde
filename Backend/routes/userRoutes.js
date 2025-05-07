const express = require('express')
const mongoose = require('mongoose')

const User = require('../models/user')
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


router.get('/send',async(req,res)=>{
    try{
  const getuser = await User.find()  
  if(!getuser)
    return res.status(400).json({msg:"No data"})
    res.status(200).json({msg:getuser})
    }catch(err){
         res.status(500).json({msg:err})
    }

})
module.exports = router