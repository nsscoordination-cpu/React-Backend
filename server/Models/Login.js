import mongoose, { Schema } from "mongoose";

const loginschema=new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    status:{type:Boolean,default:true},
});

const LOGIN=mongoose.model("Login",loginschema)
export default LOGIN;