import express from 'express'
import dotenv from 'dotenv'
import connectDB from './configs/ConnectDB.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'


dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))


const app=express();

app.use(express.json());
app.use(cookieParser());


const PORT=process.env.PORT;

app.get('/',(req,res) =>{
    res.json("hello from server");
})

app.use('/api/auth', authRouter)

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`);
    connectDB();
})