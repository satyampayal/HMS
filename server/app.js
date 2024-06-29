import express from 'express';
import connectedToDb from './config/dbConnection.js';
const app=express();
import { config } from 'dotenv';
config();
import  userRoute from './routes/userRoute.js'


app.use(express.json());// to send in Json fomat in post and get same as jSON
app.get('/',(req,res)=>{
    res.send("app listen on "+process.env.PORT);
});

// Connected to DB
const uri=process.env.DB_URI;
connectedToDb(uri);

// routes
app.use('/api/v1/user',userRoute);


export default app;