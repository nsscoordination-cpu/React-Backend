import CORDINATOR from "../Models/Coordinator.js";
import Event from "../Models/Event.js";
import LOGIN from "../Models/Login.js";
import bcrypt from "bcrypt"
import STUDENT from "../Models/Student.js";
import ATTENDANCE from "../Models/Attendence.js";
import FEEDBACK from "../Models/Feedback.js";
import PERFORMANCE from "../Models/Performance.js";
import NOTIFICATION from "../Models/Notification.js";
export const addcoordinator = async (req, res) => {
  try {
    const { name, email, phone, department, password } = req.body;
    console.log(req.body);
    


    if (!name || !email || !phone || !department || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, phone, department, password) are required.",
      });
    }

    //  Check if coordinator already exists
    const existing = await LOGIN.findOne({ username:email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Coordinator already exists with this email.",
      });
    }

   

    //  Hash password from frontend
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Step 1: Create login record
    const loginRecord = new LOGIN({
      username: email,
      password: hashedPassword,
      role: "coordinator",
      status: true,

    });
    await loginRecord.save();

    //  Step 2: Create coordinator record linked to login _id
    const newCoordinator = new CORDINATOR({
      name,
      email,
      phone,
      department,
      // cordinatorId: formattedId,
    //   password: hashedPassword,
      commonkey: loginRecord._id, // references Login
    });
    await newCoordinator.save();

    //  Step 3: Respond success
    res.status(201).json({
      success: true,
      message: "Coordinator added successfully!",
      coordinator: newCoordinator,
    });

  } catch (error) {
    console.error("Error adding coordinator:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding coordinator.",
      error: error.message,
    });
  }
};


export const getAllCoordinators = async (req, res) => {
  try {
    // ✅ Fetch all coordinators, newest first
    const allcord = await CORDINATOR.find().sort({ createdAt: -1 });

    if (!allcord || allcord.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No coordinators found.",
      });
    }

    // ✅ Success response
    return res.status(200).json({
      success: true,
      message: "Coordinators fetched successfully.",
      total: allcord.length,
      coordinators: allcord,
    });
  } catch (e) {
    console.error("Error fetching coordinators:", e);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching coordinators.",
      error: e.message,
    });
  }
};

export const editcordinator = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, department } = req.body;

    // Validate inputs
    if (!id || !name || !phone || !department) {
      return res.status(400).json({
        success: false,
        message: "All fields (id, name, phone, department) are required.",
      });
    }

    // Check if coordinator exists
    const existingCoordinator = await CORDINATOR.findById(id);
    if (!existingCoordinator) {
      return res.status(404).json({
        success: false,
        message: "Coordinator not found.",
      });
    }

    // ✅ Update the record
    existingCoordinator.name = name;
    existingCoordinator.phone = phone;
    existingCoordinator.department = department;

    // Save updated record
    const updatedCoordinator = await existingCoordinator.save();

    return res.status(200).json({
      success: true,
      message: "Coordinator updated successfully!",
      coordinator: updatedCoordinator,
    });
  } catch (error) {
    console.error("Error updating coordinator:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating coordinator.",
      error: error.message,
    });
  }
};

// export const deletecord = async(req,res)=>{
//     const {id} = req.params
//     // console.log(id);
    
// }


export const deletecord = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Coordinator ID is required.",
      });
    }

    const coordinator=await CORDINATOR.findById(id)
    console.log(coordinator._id, coordinator.commonkey);
    
    // ✅ Find and delete coordinator
    const deletedCord = await CORDINATOR.findByIdAndDelete(coordinator._id);
    console.log(deletecord);
    const deletecord_login= await LOGIN.findByIdAndDelete(coordinator.commonkey); 
    

    if (!deletedCord && !deletecord_login) {
      return res.status(404).json({
        success: false,
        message: "Coordinator not found.",
      });
    }

    // ✅ Success response
    return res.status(200).json({
      success: true,
      message: "Coordinator deleted successfully!",
      deleted: deletedCord,
    });
  } catch (error) {
    console.error("Error deleting coordinator:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting coordinator.",
      error: error.message,
    });
  }
};


export const approvestd =async(req,res)=>{
  try{
    const {id} = req.params;
        if (!id) {
      return res.status(400).json({
        success: false,
        message: "Student login ID is required.",
      });
    }
    const approve=await LOGIN.findByIdAndUpdate(id,{status:true})
    console.log(approve);
    
        return res.status(200).json({
      success: true,
      message: "Student verified successfully!",
     approve
    });

  }
  catch (e) {
    console.log(e);
     return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
    
  }
}

export const rejectstd =async(req,res)=>{
  try{
    const {id} = req.params;
        if (!id) {
      return res.status(400).json({
        success: false,
        message: "Student login ID is required.",
      });
    }
    const reject=await LOGIN.findByIdAndUpdate(id,{status:false})
    console.log(reject);
      return res.status(200).json({
      success: true,
      message: "Rejected!",
     reject
    });
  }
  catch(e) {
    console.log(e);
     return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
    
  }
}

 
export const getallevents =async(req,res)=>{
  try{
     const Event=await Event.find().sort({createdAt:-1})
     console.log(Event);
     
     
   if (!Event) {
      return res.status(400).json({
        success: false,
        message: "Event not found",
      });
    }
      return res.status(200).json({
      success: true,
      message: "Event fetched successfully",
     Event
    });
  }
  catch(e){
    console.log(e);
     return res.status(500).json({
      success: false,
      message: "Server error",
      e: e.message,
    });
    
  }
 
}

export const getVerifiedStudents = async (req, res) => {
  try {
    const loginVerifiedIds = await LOGIN.find({ status: true }).select("_id");
    
    const students = await STUDENT.find({
      commonKey: { $in: loginVerifiedIds },
    });
    return res.json({
      success: true,
      students,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Error fetching students",
    });
  }
};

//attendenceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
export const getAttendanceByEvent = async (req, res) => {
  try {
    const { id } = req.params;
console.log(id);

    const attendance = await ATTENDANCE.find({ eventId : id })
      .select("studentId");

    const presentStudentIds = attendance.map(a => a.studentId.toString());

    return res.json({
      success: true,
      presentStudents: presentStudentIds,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching attendance",
    });
  }
};


export const updateAttendance = async (req, res) => {
  console.log(req.body);
  
  try {
    const { eventId, presentStudents } = req.body;

    if (!eventId) {
      return res.status(400).json({ success: false, message: "Event ID required" });
    }

    // 1️⃣ Fetch all existing attendance records
    const existing = await ATTENDANCE.find({ eventId }).select("studentId");
    const existingIds = existing.map(a => a.studentId.toString());

    // 2️⃣ Students to ADD
    const toAdd = presentStudents.filter(id => !existingIds.includes(id));

    // 3️⃣ Students to REMOVE
    const toRemove = existingIds.filter(id => !presentStudents.includes(id));

    // Insert ADD records
    if (toAdd.length > 0) {
      const docs = toAdd.map(id => ({
        eventId,
        studentId: id,
        present: true
      }));
      await ATTENDANCE.insertMany(docs);
    }

    // Remove records
    if (toRemove.length > 0) {
      await ATTENDANCE.deleteMany({
        eventId,
        studentId: { $in: toRemove }
      });
    }

    return res.json({
      success: true,
      message: "Attendance updated successfully!",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error updating attendance",
    });
  }
};
export const AddFeedback = async (req,res) => {
  try{
     const {id  } = req.params;
     const eventfeedbacks = await FEEDBACK.find({eventId:id}).populate("studentId", "name")
         return res.json({
      success: true,
      message: "Attendance updated successfully!",
      eventfeedbacks
    });
  }
    catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error updating attendance",

      
    });
  }
}




export const addPerformance = async (req, res) => {
  console.log(req.body , "reqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
  
  try {
    const { studentId, participationLevel, remarks, attendance } = req.body; 

    // ✅ Check if student exists
    const student = await STUDENT.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // ✅ Prevent duplicate performance entry
    const existing = await PERFORMANCE.findOne({ studentId });
    if (existing) {
      return res.status(400).json({ success: false, message: "Performance already added" });
    }

    // ✅ Create new record
    const newPerformance = new PERFORMANCE({
      studentId,
      participationLevel,
      remarks,
      attendance,
    });

    await newPerformance.save();

    return res.status(201).json({
      success: true,
      message: "Performance added successfully",
      data: newPerformance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding performance",
    });
  }
};




export const getStudentAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId; // ✅ Comes from frontend
console.log(studentId,'oooooooo');

    const student = await STUDENT.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // ✅ Count total NSS events
    const totalEvents = await Event.countDocuments();

    // ✅ Count attended events
    const attended = await ATTENDANCE.countDocuments({
      studentId: student._id,
      present: true,
    });

    return res.json({
      success: true,
      totalSessions: totalEvents,
      attended: attended,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching attendance",
    });
  }
};




export const getAllPerformances = async (req, res) => {
  try {
    const performances = await PERFORMANCE.find()
      .populate("studentId", "name regYear className department dob")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      performances,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching performances",
    });
  }
};



export const notifications = async (req, res) => {
  const { batches, message } = req.body;

  try {
    // ✅ Create and save notification
    const newNotification = await NOTIFICATION.create({
      batches,
      message,
    });

    res.json({
      success: true,
      message: "Notification saved successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error saving notification",
    });
  }
};

export const viewallnoti = async(req,res)=>{
  try{
const all =await NOTIFICATION.find().sort({createdAt:-1})
return     res.json({
      success: true,
      message: "Notification get successfully",
      notification: all,
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error saving notification",
    });
  }
}

export const deletePerformance = async(req,res)=>{
  const {id} = req.params
  try{
const deletePERFORMANCE =await PERFORMANCE.findByIdAndDelete(id)
return     res.json({
      success: true,
      message: "Deleted successfully",
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
}