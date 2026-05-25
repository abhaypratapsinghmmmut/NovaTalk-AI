import express from 'express'
import dotenv from 'dotenv'

dotenv.config();


const app=express();

const PORT=process.env.PORT;

app.get('/',(req,res) =>{
    res.json("hello from server");
})

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`);
})