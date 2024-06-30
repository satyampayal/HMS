
import User from "../model/user.model.js";
import AppError from "../utils/AppError.js";
const cookieOptions={
  secure:true,
  maxAge:7*24*60*60*1000, // 7 days
  httpOnly:true,
}
// Register
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
        bg,
        p_id:(await User.find()).length+1,
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

 // login
 const login=async (req,res,next)=>{
  const {email,password}=req.body;
  if(!email || !password ){
    return next(new AppError(' email and password Filed are Required',400));
}
const user=await User.findOne({email}).select("+password");
if(!user){
  return next(new AppError("User Not exists",400));
}

const verifyPassword=await user.comparePassword(password);
if(!verifyPassword){
  return next(new AppError("Passowrd not match ",400));
}
const token=await user.generateJwtToken();

res.cookie('token',token,cookieOptions);

user.password=undefined;
res.status(200).json({
  message:"Login SuccessFully",
  user
});
 }

 const logout=async (req,res,next)=>{
  res.cookie('token',null,{
    maxAge:0,
    secure:true,
    httpOnly:true
  });
  res.status(200).json({
    success:true,
    message:'User logged out successfully'
  });
 }

 // get Profile
 const getProfile=async (req,res,next)=>{

  
  const user=await User.findById(req.user.id);
  if(!user){
  return next(new AppError("User Not exists",400));
  }
  res.status(200).json({
    success:true,
    message:"user Details",
    user
  })

 }
 

export  {
    register,
    login,
    logout,
    getProfile,
}