import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cordinatorrouter from "./Routes/CordinatorRoutes.js";
import loginrouter from "./Routes/LoginRoutes.js";
import EventRoutes from "./Routes/EventRoutes.js";
import studentrouter from "./Routes/StudentRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose
  .connect("mongodb://localhost:27017/NSS")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(8000, "0.0.0.0", () => {
  console.log("Server started on port 8000");
});
app.use("/api/coordinator",cordinatorrouter)
app.use("/api/event",EventRoutes)
app.use("/api/student",studentrouter)
app.use("/api/login",loginrouter)
app.use("/uploads",express.static("uploads"));
app.use("/api/admin",adminRoutes)