import mongoose, { Schema } from "mongoose";

const performanceSchema=new Schema({
    name:{type:String,required:true},
    performance:{type:String,required:true},
    score:{type:String,required:true},
})
const performance=mongoose.model("Performance",performanceSchema)
export default Performance