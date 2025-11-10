import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import chartroutes from "./routes/chat.js"
import axios from 'axios';

const port = 8080;
const app =express();

//middlewares
app.use(express.json());
app.use(cors());

//router
app.use("/api", chartroutes);

app.listen( port ,()=>{
    connectDB();
    console.log("app is listening");
    
});

const connectDB = async ()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to database');
    }catch(err){
        console.log(err);
    }
};

