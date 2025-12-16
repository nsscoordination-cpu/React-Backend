import mongoose, { Schema } from "mongoose";

const EventSchema=new Schema({
    name:{type:String,required:true},
    date:{type: Date,required:true},
    place:{type:String,required:true},
    time:{type:String,required:true},
})
const Event=mongoose.model("Event",EventSchema)
export default Event