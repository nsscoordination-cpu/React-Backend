import express from "express"
import { deleteevent, editevent, fetchallevents, fetchdetails, newevent } from "../Controllers/EventController.js"
const EventRoutes=express.Router()
EventRoutes.post("/",newevent)
EventRoutes.get("/allevents",fetchallevents)
EventRoutes.get("/fetchdetails/:id",fetchdetails)
EventRoutes.put("/Update/:id",editevent)
EventRoutes.delete("/deleteEvents/:id",deleteevent)
export default EventRoutes