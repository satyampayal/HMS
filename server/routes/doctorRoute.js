import { Router } from "express";
import { login, logout,getAppointmentReq,confirmAppointment,cancelAppointment} from "../controllers/doctor.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const docRoute=Router();


docRoute.post('/login',login);
docRoute.get('/logout',logout);
docRoute.get('',isLoggedIn,getAppointmentReq);
docRoute.put('/confirm-appointment/:app_id',isLoggedIn,confirmAppointment);
docRoute.put('/cancel-appointment/:app_id',isLoggedIn,cancelAppointment);
export default docRoute;