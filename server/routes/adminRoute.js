import { Router } from "express";
import { addDoctor, login, logout, register } from "../controllers/admin.contoller.js";
const adminRoute  =Router();

adminRoute.post('/login',login);
adminRoute.post('/register',register);// for only create first Admin 
adminRoute.get('/logout',logout);
adminRoute.post('/add-doctor',addDoctor);

export default adminRoute;
