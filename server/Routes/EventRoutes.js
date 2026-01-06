import express from "express"
import { addEventPhotos, deleteevent, deleteEventPhoto, editevent, fetchallevents, fetchdetails, getEventPhotos, newevent } from "../Controllers/EventController.js"
import { uploadEventPhotos } from "../middilewhere/uploude.js"
const EventRoutes=express.Router()
EventRoutes.post("/",newevent)
EventRoutes.get("/allevents",fetchallevents)
EventRoutes.get("/fetchdetails/:id",fetchdetails)
EventRoutes.put("/Update/:id",editevent)
EventRoutes.delete("/deleteEvents/:id",deleteevent)
EventRoutes.post(
  "/events/:eventId/photos",
  uploadEventPhotos.array("photos", 10),
  addEventPhotos
);
EventRoutes.get("/events/:eventId/photos", getEventPhotos);

EventRoutes.delete("/events/:eventId/photos/:photoId", deleteEventPhoto);
export default EventRoutes