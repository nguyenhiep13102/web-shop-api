import User from "../models/user.js";
import Student from "../models/student.js";
import Lecture from "../models/lecture.js";
import Role from "../models/role.js";
import UserDTO from "../dtos/user.dto.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import sendOtpEmail from "../configs/nodemailer.js";

dotenv.config();

let login = async (email, password, deviceId) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user == null) {
      return { code: 9995, data: null };
    }
    const role = await Role.findOne({
      where: {
        role_id: user.role_id,
      },
      attributes: ["name"],
    });
    if (!role) {
      return { code: 1005, data: null };
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid || user.uuid != deviceId) {
      return { code: 9995, data: null };
    }
    if (user.status == 0) {
      return { code: 1009, data: null };
    }
    const token = jsonwebtoken.sign({ user: user }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const userDTO = new UserDTO(user, role ? role.name : null);
    return { code : 1000 ,data: { user: userDTO, token: token } };
  } catch (error) {
    console.log(error);
    return {code : 9999, data : null};
  }
};

let register = async (formData) => {
  try {
    if (
      !formData.password ||
      !formData.email ||
      !formData.uuid ||
      !formData.role
    ) {
      return { code: 1004 };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { code: 1004, data : null };
    }

    const checkUser = await User.findOne({
      where: {
        email: formData.email,
      },
    });

    if (checkUser != null) {
      return { code: 9996, data : null };
    }

    const formattedRole = formData.role.charAt(0).toUpperCase() + formData.role.slice(1).toLowerCase();

    const role = await Role.findOne({
      where: {
        name: formattedRole,
      },
    });
    if (role == null) {
      return { code: 1004, data : null };
    }
    const hashedPassword = bcrypt.hashSync(formData.password, 10);
    const user = {
      password: hashedPassword,
      email: formData.email,
      role_id: role.role_id,
      status: 0,
      uuid: formData.uuid
    };
    const newUser = await User.create(user);
    await addCheckLOrS(formattedRole, newUser.user_id, newUser.email);
    const userDTO = new UserDTO(newUser, role ? role.name : null);
    return { code: 1000, data: userDTO };
  } catch (error) {
    console.log(error);
    return {code : 9999, data : null};
  }
};

let getVerifyCode = async (email) => {
  try {
    if (!email) {
      return { code : 1004, data : null };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { code: 1004, data : null };
    }
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user == null) {
      return { code : 9995, data : null };
    }

    const otp = crypto.randomBytes(3).toString("hex");
    const otpExpires = Date.now() + 3600000; // OTP expires in 1 hour
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    sendOtpEmail(email, otp);
    return { code : 1000, data : "OTP has been sent to your email" };
  } catch (error) {
    console.log(error);
    return {code : 9999, data : null};
  }
};

let checkVerifyCode = async (email, otp) => {
  
  try {
    if (!email || !otp) {
      return { code : 1004, data : null };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { code: 1004, data : null };
    }
    const user = await User.findOne({ where: { email, otp } });

    if (user == null || user.otpExpires < Date.now()) {
      return { code: 9993, data: null };
    }
    if (user.status == 1) {
      return { code: 1010, data: null };
    }
    user.status = 1;
    user.otp = null;
    user.otpExpires = null;
    user.updatedAt = new Date();
    await user.save();
    const token = jsonwebtoken.sign({ user: user }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    return { code: 1000, data: {message: "This account is actived", token: token} };
  }
  catch (error) {
    console.log(error);
    return {code : 9999, data : null};
  }
}

let forgotPassword = async (email) => {
  try {
    if (!email) {
      return { code: 400, message: "Email is required" };
    }
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user == null) {
      return { code: 404, message: "User not found" };
    }
    const otp = crypto.randomBytes(3).toString("hex");
    const otpExpires = Date.now() + 3600000; // OTP expires in 1 hour
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    sendOtpEmail(email, otp);
    return { data: "OTP has been sent to your email" };
  } catch (error) {
    console.log(error);
  }
};
let resetPassword = async (email, otp, newPassword) => {
  try {
    if (!email || !otp || !newPassword) {
      return {
        code: 400,
        message: "Email, OTP, and new password are required",
      };
    }
    const user = await User.findOne({ where: { email, otp } });

    if (user == null || user.otpExpires < Date.now()) {
      return { code: 400, message: "Invalid or expired OTP" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;
    user.updatedAt = new Date();
    await user.save();
    return { data: "Password has been reset successfully" };
  } catch (error) {
    console.log(error);
  }
};

const addCheckLOrS = async (roleName, user_id, email) => {
  try {
    if (roleName == "Lecture") {
      let lecture_id = await generateNextLectureId();
      await Lecture.create({
        lecture_id,
        user_id: user_id,
        name: null,
        email: email
      });
      console.log("Create lecture success!")

    }
    if (roleName == "Student") {
      let student_id = await generateNextStudentId();
      await Student.create({
        student_id,
        user_id: user_id,
        name: null,
        email: email
      });
      console.log("Create student success!")
    }
  }
  catch (error) {
    console.log(error);
  }
}

const generateNextStudentId = async () => {
  const lastStudent = await Student.findOne({
    order: [['student_id', 'DESC']]
  });

  let nextId = 1; 
  
  if (lastStudent) {
    nextId = parseInt(lastStudent.student_id) + 1;
  }
  return nextId.toString().padStart(4, '0');
};

const generateNextLectureId = async () => {
  const lastLecture = await Lecture.findOne({
    order: [['lecture_id', 'DESC']]
  });

  let nextId = 1; 
  
  if (lastLecture) {
    nextId = parseInt(lastLecture.lecture_id) + 1;
  }
  return nextId.toString().padStart(4, '0');
};

export default {
  login,
  register,
  forgotPassword,
  resetPassword,
  getVerifyCode,
  checkVerifyCode
};
