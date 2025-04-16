const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

const db = async()=>{
  try{
  await mongoose.connect(process.env.MONGO_URL)
  console.log("DB connected successfully")
}catch(e){
  console.log(e)
}
}
db();

const main = require("./controller/user")
app.use('/user',main)


app.listen(PORT, () => {
  console.log(`connected at http://localhost:${PORT}`);
});





