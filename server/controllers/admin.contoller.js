import Admin from "../model/admin.model.js";
import AppError from "../utils/AppError.js";
import Doctor from "../model/doctor.model.js";
const cookieOptions={
    secure:true,
    maxAge:7*24*60*60*1000,
    httpOnly:true,

}

const register=async (req,res,next)=>{
    const {age,fullName,gender,dob,bg,mobileNo,email,password,avatar}=req.body;

    if(!fullName || !email || !password || !age || !dob){
        return next(new AppError(' All Filed are Required',400));// whatever next executation go 
    }
    const userExists=await Admin.findOne({email});
    if(userExists){
      return next(new AppError('User Exists already',1100));
    }
    const admin= await Admin.create(
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
        a_id:(await Admin.find()).length+1,
      }
    )
    if(!admin){
        return next(new AppError('User not created',400));
    }
    await admin.save();
    admin.password=undefined;
    res.status(200).json({
       success:true,
       message:'Admin Registerd successfully',
       admin
   });
}
const login=async (req,res,next)=>{
    const {a_id,password}=req.body;
    if(!a_id || !password ){
        return next(new AppError(' email and password Filed are Required',400));
    }
    const admin=await Admin.findOne({a_id}).select('+password');
    if(!admin){
        return next(new AppError("Admin not exist with admin id ",400));
    }

    const passwordVerify=await admin.comparePassword(password);
    if(!passwordVerify){
        return next(new AppError("Admin or password are wrong",400));
    }
    const token=await admin.generateJwtToken();
    res.cookie('token',token,cookieOptions);
    admin.password=undefined;
    res.status(200).json({
        success:true,
        message:"Login Successfully ",
        admin,
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
        message:'Admin logged out successfully'
      });

}

//  Add doctor

const addDoctor=async (req,res,next)=>{
    const {fullName,address,house_no,street,city,mobileNo,bg,specilazition,age,gender,dob,experience,email,password}=req.body;
    if(!fullName || !address || !house_no || !street || !city || !mobileNo || !bg || !specilazition || !age || !gender || !dob || !experience || !email || !password){
        return next(new AppError(' all   Filed are Required',400));
    }
    const doctorExist =await Doctor.findOne({email});
    if(doctorExist){
      return next(new AppError('Doctor Exists already',1100));

    }
    const doctor=await Doctor.create({
        fullName,
        address,
        house_no,
        street,
        city,
        mobileNo,
        bg,
        specilazition,
        age,
        gender,
        dob,
        experience,
        email,
        password,
        d_id:(await Doctor.find()).length+1,
    });

    await doctor.save();
    doctor.password=undefined;
    res.status(200).json({
        success:true,
        message:"New Doctor add  ",
        doctor
    });
}
export {
    register,
    login,
    logout,
    addDoctor,
}