import { Router } from "express";
import { login, logout } from "../controllers/doctor.controller.js";

const docRoute=Router();


docRoute.post('/login',login);
docRoute.get('/logout',logout);

export default docRoute;