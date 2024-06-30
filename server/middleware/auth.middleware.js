import AppError from "../utils/AppError.js";
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
config();
const isLoggedIn=async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
      return next(new AppError("Not authorised, you sholud login first"),400);
    }
    const tokenDetails=await jwt.verify(token,process.env.JWT_SECRET);
    if(!tokenDetails){
        return next(new AppError("Not authorised"),400);

    }
    req.user=tokenDetails;
    return next();
}

export {
    isLoggedIn,
}