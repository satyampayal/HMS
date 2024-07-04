import { Router } from "express";
import { addDoctor, doctorList, login, logout, patientList, register } from "../controllers/admin.contoller.js";
import upload from "../middleware/upload.middleware.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const adminRoute  =Router();

adminRoute.post('/login',login);
adminRoute.post('/register',register);// for only create first Admin 
adminRoute.get('/logout',logout);
adminRoute.post('/add-doctor',isLoggedIn,upload.single('avatar'),addDoctor);
adminRoute.get('/all-doctors',isLoggedIn,doctorList);
adminRoute.get('/all-patients',isLoggedIn,patientList);

export default adminRoute;
