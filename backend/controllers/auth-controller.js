import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { json } from "express";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.SECRET__KEY, {
    expiresIn: "30d",
  });
};

// ==============signup==========

export const signup = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null;
    if (role == "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    // ========check if user exits=========

    if (user) {
      return res.status(400).json({ message: `User already have an account` });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hash,
        photo,
        gender,
        role,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hash,
        photo,
        gender,
        role,
      });
    }

    const saveUser = await user.save();
    if (saveUser) {
      res
        .status(200)
        .json({ success: true, message: `Your Account has been Created` });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: `internal server error` });
    console.log(error);
  }
};

// ==========login=============

export const login = async (req, res) => {
  const { email} = req.body;

  try {
    let user = null;

    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    //assigning user variable to user role
    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    //check if user exits or not

    if (!user) {
      return res.status(404).json({ message: `user not found` });
    }

    //comapare password
    const isPassword = await bcrypt.compare(req.body.password,user.password);

    if (!isPassword) {
      return res
        .status(400)
        .json({ status: `false`, message: `Invalid credential` });
    }

    const token = generateToken(user);

    const { password, role, appointment, ...rest } = user._doc;

    res
      .status(200)
      .json({
        staus: "true",
        message: `Succesfuly Login`,
        token,
        data: { ...rest },
        role
      });
  } catch (error) {
    res.status(500),json({status:false,message:"failed to login"})
    console.log(error)
  }
};
