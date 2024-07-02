import {Schema,model} from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const doctorSchema=new Schema({
    fullName:{
        type:String,
        required:[true,"Doctor name required"],
        minLength:[5,"Length scholud be 5 "],
    },
    d_id:{
        type:Number,
        unique:true,
        default:1,
    },
    address:{
        type:String,
        required:true,
        maxLength:[100,"length of address not be exceed 100 charcter"],
    },
    house_no:{
        type:String,
        required:true,
    },
    street:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    mobileNo:{
        type:Number,
        required:true,
        length:[10,"length sholud be 10 "],
    },
    bg:{
        type:String,
        required:true,
      
    },
    specilazition:{
        type:String,
        required:true,
    },
    consultentFee:{
        type:Number,
        
    },
    age: {
        type: Number,
        required: [true, "Age is required"]

    },
    gender: {
        type: String,
        reuired: [true, "gender is Required"],
        enum: ['Male', 'Female', 'other'],
        default: 'Male'
    },
    dob: {
        type: String,
        reuired: [true, "Date of Birth is required"],
    },
    experience:{
        type:String,
        required: [true, "experience   is required"],
    },
    role:{
        type:String,
        enum:['Patient','Doctor'],
        default:'Doctor'
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        minLength: [4, 'Password must be at-least 8 Charcers'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },



},{
    timestamps:true
});

doctorSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return  next();
    }
 
    this.password=await bcrypt.hash(this.password,10);

})
doctorSchema.methods={
    comparePassword:async function(plainPassword){
        return await bcrypt.compare(plainPassword,this.password);
    },
    generateJwtToken:async function(){
        return await jwt.sign({id:this._id,d_id:this.d_id,}
            ,process.env.JWT_SECRET,{
                expiresIn:process.env.JWT_EXPIRE
        })

    }
}



const Doctor=model("Doctor",doctorSchema);

export default Doctor;