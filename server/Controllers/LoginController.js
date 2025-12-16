import bcrypt from "bcrypt";
import LOGIN from "../Models/Login.js";
import STUDENT from "../Models/Student.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await LOGIN.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    let fulldetails = null;

    // STUDENT must be verified (status true)
    if (user.role === "student") {
      if (!user.status) {
        return res.status(401).json({
          success: false,
          message: "Student is not verified",
        });
      }
      fulldetails = await STUDENT.findOne({ commonKey: user._id });
    }

    // (Coordinator / Admin) – login without status check
    // if (user.role === "coordinator" || user.role === "admin") {
    //   // you can also fetch extra details if required
    // }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      role: user.role,
      username: user.username,
      userid: user._id,
      status: user.status,
      fulldetails,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
