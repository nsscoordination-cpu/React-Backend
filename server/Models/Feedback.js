import mongoose, { Schema } from "mongoose";

const FeedbackSchema=new Schema({
    eventId:{type: Schema.Types.ObjectId,ref:"Event",required:true},
    feedback:{type:String,required:true},
    studentId:{type: Schema.Types.ObjectId,ref:"Student",required:true},
    rating:{type:Number,required:true},
})
const FEEDBACK=mongoose.model("Feedback",FeedbackSchema)
export default FEEDBACK