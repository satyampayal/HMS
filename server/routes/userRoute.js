import express from 'express'
import {register,login, logout,getProfile} from '../controllers/user.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
const route =express.Router();

route.post('/register',register);
route.post('/login',login);
route.get('/logout',logout);
route.get('/me',isLoggedIn,getProfile)

export default route;