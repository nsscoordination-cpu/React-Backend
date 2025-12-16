import mongoose, { Schema } from "mongoose";

const CoordinatorSchema=new Schema({
     name:{type:String,required:true},
     email:{type:String,required:true},
     phone:{type:Number,required:true},
     department:{type:String,required:true},
     commonkey:{type:Schema.Types.ObjectId,

        ref:"Login"
     }
})
const CORDINATOR=mongoose.model("Coordinator",CoordinatorSchema)
export default CORDINATOR