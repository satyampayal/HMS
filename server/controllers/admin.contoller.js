import Admin from "../model/admin.model.js";
import AppError from "../utils/AppError.js";
import Doctor from "../model/doctor.model.js";
import User from "../model/user.model.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
const cookieOptions = {
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
};

const register = async (req, res, next) => {
  const { age, fullName, gender, dob, bg, mobileNo, email, password, avatar } =
    req.body;

  if (!fullName || !email || !password || !age || !dob) {
    return next(new AppError(" All Filed are Required", 400)); // whatever next executation go
  }
  const userExists = await Admin.findOne({ email });
  if (userExists) {
    return next(new AppError("User Exists already", 1100));
  }

  const admin = await Admin.create({
    fullName,
    email,
    password,
    age,
    dob,
    mobileNo,
    dob,
    gender,
    bg,
    a_id: (await Admin.find()).length + 1,
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
    },
  });
  if(!admin){
    return next(new AppError( 'admin not register,please try again',400));

  }
  if(req.file){
    try {
      const result =await cloudinary.v2.uploader.upload(req.file.path,{
        folder:'hms',
        width:250,
        height:250,
        gravity:'faces',
        crop:'fill'
      })
      if(result){
        admin.avatar.public_id=result.public_id;
        admin.avatar.secure_url=result.secure_url;

        fs.rm(`uploads/${req.file.filename}`);
        
      }
    } catch (e) {
      return next(new AppError(e || 'file not upload,please try again',400));
      
    }
  }

  await admin.save();
  admin.password = undefined;
  res.status(200).json({
    success: true,
    message: "Admin Registerd successfully",
    admin,
  });
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(" email and password Filed are Required", 400));
  }
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    return next(new AppError("Admin not exist with admin id ", 400));
  }

  const passwordVerify = await admin.comparePassword(password);
  if (!passwordVerify) {
    return next(new AppError("Admin or password are wrong", 400));
  }
  const token = await admin.generateJwtToken();
  res.cookie("token", token, cookieOptions);
  admin.password = undefined;
  res.status(200).json({
    success: true,
    message: " Admin Login Successfully ",
    admin,
  });
};

const logout = async (req, res, next) => {
  res.cookie("token", null, {
    maxAge: 0,
    secure: true,
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Admin logged out successfully",
  });
};

//  Add doctor

const addDoctor = async (req, res, next) => {
  const {
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
  } = req.body;
  if (
    !fullName ||
    !address ||
    !house_no ||
    !street ||
    !city ||
    !mobileNo ||
    !bg ||
    !specilazition ||
    !age ||
    !gender ||
    !dob ||
    !experience ||
    !email ||
    !password
  ) {
    return next(new AppError(" all   Filed are Required", 400));
  }
  const doctorExist = await Doctor.findOne({ email });
  if (doctorExist) {
    return next(new AppError("Doctor Exists already", 1100));
  }
  const doctor = await Doctor.create({
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
    d_id: (await Doctor.find()).length + 1,
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
    },
  });
  if(!doctor){
   return next(new AppError("Doctor not created.try again later", 400));
    
  }
  // Image uplaod
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "hms",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });
      if (result) {
        doctor.avatar.public_id = result.public_id;
        doctor.avatar.secure_url = result.secure_url;

        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(new AppError( "file not upload,please try again", 400));
    }
    await doctor.save();
    doctor.password = undefined;
    res.status(200).json({
      success: true,
      message: "New Doctor add  ",
      doctor,
    });
  }
};

const doctorList=async (req,res,next)=>{

   try{ const doctors=await Doctor.find();
    res.status(200).json({
        success:true,
        message:"Doctor List Successfuly",
        doctors,
    })}  catch(e){
        return next(new AppError("Not fetched Doctors "+e,400))
    }
}



const patientList=async (req,res,next)=>{
    try{
    const patients=await User.find();
    res.status(200).json({
        success:true,
        message:"patients List Successfuly",
        patients,
    })}
    catch(e){
        return next(new AppError("Not fetched patients "+e,400))
    }
    
}
export { register, login, logout, addDoctor,doctorList,patientList };
