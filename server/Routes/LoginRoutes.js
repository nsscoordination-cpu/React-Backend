import express from "express"
import { loginUser } from "../Controllers/LoginController.js"
// import{} from ""
const loginrouter=express.Router()
loginrouter.post("/",loginUser)
export default loginrouter
