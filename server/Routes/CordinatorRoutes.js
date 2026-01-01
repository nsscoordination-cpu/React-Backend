import express from "express"
import { addcoordinator, getAllCoordinators, editcordinator, deletecord, approvestd, rejectstd, getAttendanceByEvent, updateAttendance, AddFeedback } from "../Controllers/CoordinatorController.js"
import { getallevents, getVerifiedStudents } from "../Controllers/StudentController.js"
const cordinatorrouter=express.Router()
cordinatorrouter.post("/add",addcoordinator)
cordinatorrouter.get("/all",getAllCoordinators)
cordinatorrouter.delete("/delete/:id",deletecord)
cordinatorrouter.put("/update/:id",editcordinator)
cordinatorrouter.put("/approve/:id",approvestd)
cordinatorrouter.put("/reject/:id",rejectstd)
cordinatorrouter.get("/eventsall",getallevents)
cordinatorrouter.get("/studentsall",getVerifiedStudents)
cordinatorrouter.get("/attendance/:id",getAttendanceByEvent)
cordinatorrouter.post("/attendance/update",updateAttendance)
cordinatorrouter.get("/feedbacks/:id",AddFeedback)
export default cordinatorrouter