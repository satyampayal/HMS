import { Schema,model } from "mongoose";

const appointmentSchema=new Schema({
    app_id:{
        type:Number,
        required:true,
    },
    p_id:{
        type:Number,
        required:true,
    },
    d_id:{
        type:Number,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Appointment Confirm","Appointment cancel","Process"],
        default:"Process"
    }
},{
    timestamps:true
});


const Appointment=model('Appointment',appointmentSchema);

export default Appointment;