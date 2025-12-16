import mongoose, { Schema } from "mongoose";

const FeedbackSchema=new Schema({
    eventtype:{type:String,required:true},
    feedback:{type:String,required:true},
})
const feedback=mongoose.model("Feedback",FeedbackSchema)
export default feedback