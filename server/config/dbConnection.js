import mongoose from "mongoose";


function connectedToDb(url){
    try{
       mongoose.connect(url).then(()=>{
        console.log("connected to Db");
       })
    }
    catch(e){

        console.log("Not Connected with Error++"+e);
    }
}

export default connectedToDb;