import Complaint from "../Models/Complaint.js"
import CORDINATOR from "../Models/Coordinator.js";
import Event from "../Models/Event.js";
import PERFORMANCE from "../Models/Performance.js";
import STUDENT from "../Models/Student.js";


export const getallcomplaints=async(req,res)=>{
    try{
        const allcomplaints=await Complaint.find()
        .populate("eventId","name date")
        .sort({createdAt:-1})
const studentIds = allcomplaints.map(c => c.studentId);

const students = await STUDENT.find({
  commonKey: { $in: studentIds }
});

        return res.status(200).json({message:"Successfulll",allcomplaints,students})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"Server error"})
        
    }
}

export const updatecomplaints=async(req,res)=>{
    try{
        const{id}=req.params
        const{replay}=req.body
        console.log(id,replay);
        
        const allcomplaints=await Complaint.findByIdAndUpdate(id,{replay,status:"replied"})

        return res.status(200).json({message:"Successfullllll",allcomplaints})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"server error"})



    }
}


export const getallPerformance=async(req,res)=>{
    try{
        const allcomplaints=await Complaint.find()
        .populate("eventId","name date")
        .sort({createdAt:-1})
const studentIds = allcomplaints.map(c => c.studentId);

const students = await STUDENT.find({
  commonKey: { $in: studentIds }
});

        return res.status(200).json({message:"Successfulll",allcomplaints,students})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"Server error"})
        
    }
}

export const getAllStudentPerformances = async (req, res) => {
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

export const adminStats= async(req,res)=>{
  try{
    const allstudents = await STUDENT.countDocuments()
    console.log(allstudents);
    const allEvents = await Event.countDocuments()
    console.log(allEvents);
    const allcoordinators = await CORDINATOR.countDocuments()
    console.log(allcoordinators);
    const pendingcomplaints = await Complaint.countDocuments({status:"pending"})
    console.log(pendingcomplaints);
    return res.status(200).json({allstudents,allEvents,pendingcomplaints,allcoordinators})
    
  }
  catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
}

