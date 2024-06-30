import express from 'express'
import {register,login, logout,getProfile,changePassword, updateProfile} from '../controllers/user.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
const route =express.Router();

route.post('/register',register);
route.post('/login',login);
route.get('/logout',logout);
route.get('/me',isLoggedIn,getProfile);
route.post('/change-passowrd',isLoggedIn,changePassword);
route.post('/update-profile',isLoggedIn,updateProfile);

export default route;