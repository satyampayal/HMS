import app from "./app.js";
import { config } from "dotenv";
import {v2} from 'cloudinary';
config();

v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

});
app.listen(process.env.PORT,()=>{
    console.log("server on Listen "+process.env.PORT);
})