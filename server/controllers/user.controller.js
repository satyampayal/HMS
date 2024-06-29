
import User from "../model/user.model.js";
import AppError from "../utils/AppError.js";
  const    register= async (req,res,next)=>{

    const {age,fullName,gender,dob,bg,mobileNo,p_id,email,password,avatar}=req.body;

    if(!fullName || !email || !password || !age || !dob){
        return next(new AppError(' All Filed are Required',400));// whatever next executation go 
    }
    const userExists=await User.findOne({email});
    if(userExists){
      return next(new AppError('User Exists already',1100));
    }
    const user= await User.create(
        {
        fullName,
        email,
        password,
        age,
        dob,
        mobileNo,
        dob,
        gender,
        bg
      }
    )
    if(!user){
        return next(new AppError('User not created',400));
    }
    await user.save();
    user.password=undefined;// to ensure password not send in response
    res.status(200).json({
       success:true,
       message:'User Registerd successfully',
       user
   });

 } 

export  {
    register,
}