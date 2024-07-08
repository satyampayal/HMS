import express from 'express';
import connectedToDb from './config/dbConnection.js';
import cors from 'cors';
const app=express();
import { config } from 'dotenv';
config();
import  userRoute from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js';
import doctorRoute from './routes/doctorRoute.js';
import cookieParser from 'cookie-parser';
app.use(cookieParser());// for getcookie 
import morgan from 'morgan';

app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true,
}))
app.use(express.json());// to send in Json fomat in post and get same as jSON
app.use(morgan('dev'));
app.get('/',(req,res)=>{
    res.send("app listen on "+process.env.PORT);
});

// Connected to DB
const uri=process.env.DB_URI;
connectedToDb(uri);

// routes
app.use('/api/v1/user',userRoute);
app.use('/api/v1/admin',adminRoute);
app.use('/api/v1/doctor',doctorRoute);

app.all('*',(req,res)=>{
    res.status(404).send('OOPS! 404 page not found');
});


export default app;