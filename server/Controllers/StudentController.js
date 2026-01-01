// import ATTENDANCE from "../Modals/Attendance.js";
// import COMPLAINT from "../Modals/Complaint.js";
// import EVENT from "../Modals/Event.js";
// import FEEDBACK from "../Modals/Feedback.js";
// import LOGIN from "../Modals/Login.js";
// import NOTIFICATION from "../Modals/Notification.js";
// import PERFORMANCE from "../Modals/Performance.js";
// import STUDENT from "../Modals/Student.js";
import bcrypt from "bcryptjs";
import LOGIN from "../Models/Login.js";
import STUDENT from "../Models/Student.js";
import Event from "../Models/Event.js";
import { error, profile } from "console";
import ATTENDANCE from "../Models/Attendence.js";
import Complaint from "../Models/Complaint.js";
import FEEDBACK from "../Models/Feedback.js";

export const registerStudent = async (req, res) => {
    console.log(req.body);
    console.log(req.file.path);
    
    
  try {
    const {
      name,
      className,
      dob,
      sex,    
      height,
      weight,
      address,
      phone,
      email,
      password,
      blood,   
      interests,
      regYear,
    } = req.body;

    // ✅ Validate fields
    if (
      !name ||
      !className ||
      !dob ||
      !sex ||
      !height ||
      !weight ||
      !address ||
      !phone ||
      !email ||
      !password ||
      !blood ||
      !regYear
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All required fields must be filled." });
    }

    // ✅ Check email duplicate
    const existing = await LOGIN.findOne({ username:email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered." });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Photo from multer
    const photo = req.file ? req.file.filename : null;

    // ✅ 1. Create Login first
    const loginRecord = new LOGIN({
      username: email,
      password: hashedPassword,
      role: "student",
      status: false
    });

    const savedLogin = await loginRecord.save();

    // ✅ 2. Create Student + link login._id
    const newStudent = new STUDENT({
      name,
      className,
      dob,
      sex,
      height,
      weight,
      address,
      phone,
      email,
      blood,
      interests,
      password: hashedPassword,
      photo,
      regYear,
      commonKey: savedLogin._id, 
    });

    await newStudent.save();

    return res.status(201).json({
      success: true,
      message: "Student registered successfully! Once the cordinator approves you can login",
      student: newStudent,
    });

  } catch (error) {
    console.error("Student Register Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while registering student." });
  }
};





export const postfeedback = async (req, res) => {
  try {
    const{studentId}=req.params
    const { feedback,eventId,rating } = req.body;
console.log(studentId,eventId,rating,feedback);


    // ✅ Validate
    if (!feedback || !studentId || !eventId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Feedback text and student ID are required",
      });
    }

    const user = await STUDENT.findOne({commonKey:studentId})
    console.log(user._id);
    

    // ✅ Create new feedback record
    const newFeedback = new FEEDBACK({
      feedback,
      studentId: user._id,
      eventId,
      rating

    });

    await newFeedback.save();

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully!",
      feedback: newFeedback,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting feedback",
    });
  }
};



export const postComplaint = async (req, res) => {
  try {
    const { id } = req.params
    const {complaint,eventId}=req.body

    // console.log(id,complaint,eventId);
    

    if (!complaint || !eventId ||!id) {
      return res.status(400).json({
        success: false,
        message: "Complaint and student ID required",
      });
    }
const today = new Date().toISOString().split('T')[0];
    const new_complaint = new Complaint({
      eventId,
      studentId:id,
      complaint,
      date:today
    });

    await new_complaint.save();

    return res.status(201).json({
      success: true,
      message: "Complaint submitted successfully!",
      new_complaint,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getStudentComplaints = async (req, res) => {
  try {
    const { studentId } = req.params;
    // console.log(studentId);
    
    const complaints = await Complaint.find({ studentId }).populate("eventId", "name")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      complaints,
    });
    
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error fetching complaints",
    });
  }
};



export const getallevents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }); // ✅ latest first

    return res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      events,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching events",
    });
  }
}; 





export const getVerifiedStudents = async (req, res) => {
  try {
    const loginVerifiedIds = await LOGIN.find({ status: "true" }).select("_id");

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






export const getStudentAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId; // ✅ Comes from frontend

    const student = await STUDENT.findOne({commonKey:studentId});

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

    const eventspresent_id = await ATTENDANCE.find({studentId:student._id}).select("eventId -_id")
    // console.log(eventspresent_id);
    
    const eventIdOnly = eventspresent_id.map((e)=>e.eventId)
    console.log(eventIdOnly);
     
    // const eventDetails = await Event.find({_id}:$[eventspresent_id])
    const EventsPresent = await Event.find({_id:{$in:eventIdOnly}})
    console.log(EventsPresent);
    

    return res.json({
      success: true,
      totalSessions: totalEvents,
      attended: attended,
      Events :EventsPresent
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching attendance",
    });
  }
};

export const getEventspresented=async(req,res)=>{
 
   try {
    const {studentId} = req.params; // ✅ Comes from frontend

    const student = await STUDENT.findOne({commonKey:studentId});

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const eventspresent_id = await ATTENDANCE.find({studentId:student._id}).select("eventId -_id")

     const eventIdOnly = eventspresent_id.map((e)=>e.eventId)
    console.log(eventIdOnly);

    const EventsPresent = await Event.find({_id:{$in:eventIdOnly}})
    // console.log(EventsPresent);

     return res.json({
      success: true,
      Events :EventsPresent
    });

  }
  catch(e){
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching attendance",
    });
  }
}

// export const getStudentPerformans = async(req,res)=>{
//   const {studentId} = req.params
//   console.log(studentId);

//   try{
//     const performance = await PERFORMANCE.findOne({studentId : studentId})
//     console.log(performance);
    
//   }
//   catch(e){
//     console.log(e);
    
//   }
  
// }


export const getStudentPerformans = async (req, res) => {
  const { studentId } = req.params;

  try {
    // ✅ Find performance data for this student
    const performance = await PERFORMANCE.findOne({ studentId });

    if (!performance) {
      return res.status(404).json({
        success: false,
        message: "No performance data found for this student",
      });
    }

    // ✅ Return only performance data
    return res.status(200).json({
      success: true,
      performance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching performance data",
    });
  }
};


export const notifications = async (req, res) => {
  const { regYear } = req.params;
  console.log(regYear);
  

  try {
    // ✅ Find all notifications for this batch
    const notifications = await NOTIFICATION.find({
      batches: { $in: [regYear] },
    }).sort({ createdAt: -1 }); // latest first
    console.log(notifications);
    
    res.json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
    });
  }
};


export const fetchallStudents=async(req,res)=>{
    try{
        const student=await STUDENT.find().populate("commonKey","status").sort({createdAt:-1})
        return res.status(200).json({
      success: true,
      student,
    });
    }
    catch(e){
        console.log(e);
        res.status(500).json({
      success: false,
      message: "Error fetching notifications",
    });
    }
}

export const fetchprofile=async(req,res)=>{
  try{
    const {id}=req.params
    const profile=await STUDENT.find({commonKey:id})
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

   return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching performance data",
    });
  }
};


export const editprofile=async(req,res)=>{
  try{
    const {id}=req.params
    const { name,className,dob,sex,height,weight,address,phone,blood,interests} =req.body
    // console.log(name,phone);
    
    // console.log(id);
    // console.log(req.body);
    const user=await STUDENT.findOne({commonKey:id})
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
  
    // console.log(user);
    const Updateuser=await STUDENT.findByIdAndUpdate(user._id, {name,className,dob,sex,height,weight,address,phone,blood,interests})
    console.log(Updateuser);
    
   return res.status(200).json({
      success: true,
      message:"Editing successfull",
      Updateuser,
    });
    
    
  }
  catch (e){
    console.error(e)
    return res.status(500).json({
      success: false,
      message: "Server error while fetching performance data",
  });
  }
}









