import express from 'express'
import dotenv from 'dotenv'
import connectDB from './configs/ConnectDB.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRouter from './routes/user.route.js';
import assistantRouter from './routes/assistant.route.js';


dotenv.config();

const app=express();

const privateCors = cors({
    origin: [
        "https://novatalk-ai-bifg.onrender.com"
    ],
    credentials:true
});

const publicCors = cors({
    origin: "*"
});


app.use(express.json());
app.use(cookieParser());

const PORT=process.env.PORT;



app.get('/',(req,res) =>{
    res.json("hello from server");
})

app.use('/api/auth', privateCors, authRouter);
app.use('/api/user', privateCors, userRouter);
app.use('/api/assistant', publicCors, assistantRouter);

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`);
    connectDB();
})
