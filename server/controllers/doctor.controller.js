import Doctor from "../model/doctor.model.js";
import AppError from "../utils/AppError.js";
import Appointment from "../model/appointment.model.js";

const cookieOptions={
    secure:true,
    maxAge:7*24*60*60*1000,
    httpOnly:true

}
const login=async (req,res,next)=>{
    const {d_id,password}=req.body;
    if(!d_id || !password ){
        return next(new AppError(' email and password Filed are Required',400));
    }
    const doctor=await Doctor.findOne({"d_id":d_id}).select('+password');
    if(!doctor){
        return next(new AppError("Admin not exist with admin id ",400));
    }

    const passwordVerify=await doctor.comparePassword(password);
    if(!passwordVerify){
        return next(new AppError("Doctor or password are wrong",400));
    }
    const token=await doctor.generateJwtToken();
    res.cookie('token',token,cookieOptions);
    doctor.password=undefined;
    res.status(200).json({
        success:true,
        message:"Login Successfully ",
        doctor,
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
        message:'Doctor logged out successfully'
      });

}

const getAppointmentReq=async(req,res,next)=>{
    const d_id=req.user.d_id;

    const reqList=await Appointment.find({"d_id":d_id});
    if(!reqList){
        return next(new AppError("No d_id persent",400));
    }
    res.status(200).json({
        success:true,
        message:"Req Appointment List",
        reqList
    })
}
const confirmAppointment=async (req,res,next)=>{
    try {
        const d_id=req.user.d_id;
        const {app_id}=req.params;
        console.log(app_id)

        const appoinment=await Appointment.findOne({app_id});
        console.log(appoinment);
        appoinment.status="Appointment Confirm";
        await appoinment.save();
        res.status(200).json({
            success:true,
            message:"Appointment Confirm Successfully",
            appoinment
        })
    } catch (error) {
        return next(new AppError(error,400));
        
    }
}
const cancelAppointment=async (req,res,next)=>{
    try {
        const d_id=req.user.d_id;
        const {app_id}=req.params;

        const appoinment=await Appointment.findOne({app_id});
        appoinment.status="Appointment cancel";
        await appoinment.save();
        res.status(200).json({
            success:true,
            message:"Appointment cancel Successfully",
            appoinment
        })
    } catch (error) {
        return next(new AppError(error,400));
        
    }
}

export {
    login,
    logout,
    getAppointmentReq,
    confirmAppointment,
    cancelAppointment,
}