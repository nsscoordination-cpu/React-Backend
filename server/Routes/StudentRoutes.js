import express from "express";
import { editprofile, fetchallStudents, fetchprofile, getallevents, getEventspresented, getStudentAttendance, getStudentComplaints, getStudentPerformans, notifications, postComplaint, postfeedback, registerStudent } from "../Controllers/StudentController.js";
import { uploadStudent } from "../middilewhere/uploude.js";

const   studentrouter = express.Router();

studentrouter.post("/register",uploadStudent.single("Image"),registerStudent)
studentrouter.get("/events",getallevents)
studentrouter.post("/feedback/:studentId",postfeedback)
studentrouter.post("/complaint/:id",postComplaint)
studentrouter.get("/complaints/:studentId",getStudentComplaints)
studentrouter.get("/attendance/:studentId",getStudentAttendance)
studentrouter.get("/getperformance/:studentId",getStudentPerformans)
studentrouter.get("/notifications/:regYear",notifications)
studentrouter.get("/allStudents",fetchallStudents)
studentrouter.get("/profile/:id",fetchprofile)
studentrouter.put("/profile/:id",editprofile)
studentrouter.get("/events/present/:studentId",getEventspresented)
export default studentrouter;