
import express from 'express'
import { getallcomplaints, updatecomplaints } from '../Controllers/adminController.js'
const adminRoutes=express.Router()


adminRoutes.get("/allcomplaints",getallcomplaints)
adminRoutes.put("/sendreplay/:id",updatecomplaints)

export default adminRoutes