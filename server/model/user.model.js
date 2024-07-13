import {  Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import {config} from 'dotenv'
config();
 
const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Name is Required'],
        minLength: [5, 'Name Must length be at-least 5 charcter'],
        lowercase: true,
        trim: true,

    },
    age: {
        type: Number,
        // required: [true, "Age is required"]

    },
    gender: {
        type: String,
        // reuired: [true, "gender is Required"],
        enum: ['Male', 'Female', 'other'],
        default: null
    },
    dob: {
        type: String,
        // reuired: [true, "Date of Birth is required"],
    },
    // bg-->blood group
    bg: {
        type: String,
    },
    mobileNo: {
        type: Number,
        length: [10, "Length od MonileNumber is should be 10"]
    },
    p_id: {
        type: Number,
        unique: true,
        minLength: [1],
        
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
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }

},{
    timestamps:true
});
// pre method
userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        return next();
    }
        this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods={
    comparePassword:async function(plainPassword){
        return bcrypt.compare(plainPassword,this.password);
    },
    generateJwtToken:async function(){
       return  await jwt.sign({id:this._id,email:this.email,p_id:this.p_id},
            process.env.JWT_SECRET,{
                expiresIn:process.env.JWT_EXPIRE
            }
        )

    }

}

const  User=model("User",userSchema);

export default User;