import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  //get token form headers
  const authToken = req.headers.authorization;

  //check token is exists

  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: `No token, authorization denied` });
  }

  try {
    // console.log(authToken)
    const token = authToken.split(" ")[1];

    //verify token
    const decoded = jwt.verify(token, process.env.SECRET__KEY);

    req.userId = decoded.id;
    req.role = decoded.role;

    next(); //calling the middlware function
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is exipred" });
    }

    return res.status(401).json({ success: false, message: "invalid token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  try {
    let user;

    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    if (!patient && !doctor) {
      return res
        .status(401)
        .json({ success: false, message: `users are not found` });
    }
    else{
      if(patient){
        user=patient
      }
      else{
        user=doctor
      }
    }

    if (!roles.includes(user.role)) {
      return res
        .status(401)
        .json({ success: false, message: `You're not athorized` });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `error with => ${error}` });
  }
};
