import mongoose, { Schema } from "mongoose";

const EventSchema=new Schema({
    name:{type:String,required:true},
    date:{type: Date,required:true},
    place:{type:String,required:true},
    time:{type:String,required:true},
    photos: [
      {
        filename: { type: String, required: true }, // actual filename on disk
        url: { type: String, required: true },      // accessible URL
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
})
const Event=mongoose.model("Event",EventSchema)
export default Event