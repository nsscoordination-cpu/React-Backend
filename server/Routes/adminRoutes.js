
import express from 'express'
import { getallcomplaints, getAllStudentPerformances, updatecomplaints } from '../Controllers/adminController.js'
import { getAllPerformances } from '../Controllers/CoordinatorController.js'
const adminRoutes=express.Router()


adminRoutes.get("/allcomplaints",getallcomplaints)
adminRoutes.get("/performance/allStudents",getAllStudentPerformances)
adminRoutes.put("/sendreplay/:id",updatecomplaints)

export default adminRoutes