import User from "../model/user.model.js";
import AppError from "../utils/AppError.js";
import Appointment from "../model/appointment.model.js";
import Doctor from "../model/doctor.model.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
const cookieOptions = {
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
};
// Register
const register = async (req, res, next) => {
  const {
    age,
    fullName,
    gender,
    dob,
    bg,
    mobileNo,
    email,
    password,
  } = req.body;

  if (!fullName || !email || !password ) {
    return next(new AppError(" All Filed are Required", 400)); // whatever next executation go
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("User Exists already", 1100));
  }
  const user = await User.create({
    fullName,
    email,
    password,
    age,
    dob,
    mobileNo,
    dob,
    gender,
    bg,
    p_id: (await User.find()).length + 1,
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
    },
  });
  if (!user) {
    return next(new AppError("User not created", 400));
  }
  // Image uplaod
  if (req.file) {
    try {
      const result =await cloudinary.v2.uploader.upload(req.file.path,{
        folder:'hms',
        width:250,
        height:250,
        gravity:'faces',
        crop:'fill'
      })
      if(result){
        user.avatar.public_id=result.public_id;
        user.avatar.secure_url=result.secure_url;

        fs.rm(`uploads/${req.file.filename}`);
        
      }
    } catch (e) {
      return next(new AppError(e || 'file not upload,please try again',400));

    }
  }
  // Image uplaod end
  await user.save();
  user.password = undefined; // to ensure password not send in response
  res.status(200).json({
    success: true,
    message: "User Registerd successfully",
    user,
  });
};

// login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError(" email and password Filed are Required", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("User Not exists", 400));
  }

  const verifyPassword = await user.comparePassword(password);
  if (!verifyPassword) {
    return next(new AppError("Passowrd not match ", 400));
  }
  const token = await user.generateJwtToken();

  res.cookie("token", token, cookieOptions);

  user.password = undefined;
  res.status(200).json({
    success:true,
    message: "Login SuccessFully",
    user,
  
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
    message: "User logged out successfully",
  });
};

// get Profile
const getProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppError("User Not exists", 400));
  }
  res.status(200).json({
    success: true,
    message: "user Details",
    user,
  });
};

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new AppError("All fieds required ", 400));
  }
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new AppError("User Not exists", 400));
  }
  const verifyPassword = await user.comparePassword(oldPassword);
  if (!verifyPassword) {
    return next(new AppError("Password is not correct", 400));
  }
  user.password = newPassword;
  await user.save();
  user.password = undefined;
  res.status(200).json({
    success: true,
    message: "password changed SuccessFuly",
  });
};

const updateProfile = async (req, res) => {
  const { fullName, bg, dob } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new AppError("User Not exists", 400));
  }
  if (fullName != "") {
    user.fullName = fullName;
  }
  if (bg != "") {
    user.bg = bg;
  }
  if (dob != "") {
    user.dob = dob;
  }
  if(req.file){
    try {
       await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      const result =await cloudinary.v2.uploader.upload(req.file.path,{
        folder:'hms',
        width:250,
        height:250,
        gravity:'faces',
        crop:'fill'
      })
      if(result){
        user.avatar.public_id=result.public_id;
        user.avatar.secure_url=result.secure_url;

        fs.rm(`uploads/${req.file.filename}`);
        
      }

    } catch (error) {
      return next(new AppError("File Not Uplaosde"+error,400))
    }
  }
  await user.save();
  res.status(200).json({
    success: true,
    message: "user Profile Update",
    user,
  });
};

// make appointment

const makeAppointment = async (req, res, next) => {
  const { d_id, time, date } = req.body;
  const p_id = req.user.p_id;
  if (!d_id || !time || !date || !p_id) {
    return next(new AppError("time and date ,doctorname fieds required ", 400));
  }
  const doctorExist = await Doctor.findOne({ d_id: d_id });
  if (!doctorExist) {
    return next(new AppError("Doctor Not exists ", 400));
  }
  const appointment = await Appointment.create({
    d_id,
    time,
    date,
    p_id,
    app_id: (await Appointment.find()).length + 1,
  });

  res.status(200).json({
    suucess: true,
    message: "Appointmnet request send ",
    appointment,
  });
};

const appointmentCheck = async (req, res, next) => {
  try {
    const p_id = req.user.p_id;
    const appointmentReqList = await Appointment.find({ p_id: p_id });
    res.status(200).json({
      success: true,
      message: "Appointment request List",
      appointmentReqList,
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

export {
  register,
  login,
  logout,
  getProfile,
  changePassword,
  updateProfile,
  makeAppointment,
  appointmentCheck,
};
