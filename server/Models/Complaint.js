import mongoose, { Schema } from "mongoose";

const ComplaintSchema=new Schema({
    eventId:{type: Schema.Types.ObjectId,ref: "Event",required: true},
    studentId:{type: Schema.Types.ObjectId,ref: "Student",required: true},
    complaint:{type:String,required:true},
    date:{type:String},
    replay:{type:String,default:""},
    status:{type:String,default:"pending",enum:["pending","replied"]}

},{timestamps:true})

const Complaint=mongoose.model("Complaint",ComplaintSchema)
export default Complaint