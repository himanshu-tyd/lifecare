import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js"
import Booking from "../models/BookingSchema.js"


export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `Successfully upadated`,
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Failed to Update` });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Successfully Deleted`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Failed To Delete` });
  }
};
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  console.log(id,'id from getSingleUser from userController')

  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: `User Found`,
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: `No User Found` });
  }
};
export const getAllUser = async (req, res) => {
  const id = req.params.id;

  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: `User Found`,
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: `No Found` });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { password, ...rest } = user._doc;

    res
      .status(200)
      .json({
        success: true,
        message: "Profile info is getting",
        data: { ...rest },
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Somthing went wrong, while getting profile getting info" });
  }
};


export const getMyAppointments=async(req,res)=>{

try {
  // step-1: retrive appointment from booking for specific user 
  const bookings=await Booking.find({user:req.userId})


  // step-2: extract doctor ids from appointment booking
  const doctorIds=bookings.map(el=>el.doctor.id)
  
  // step-3: retrive doctors using doctor ids
  const doctors=await Doctor.find({_id:{$in:doctorIds}}).select('-password')

  res.status(200).json({success:true,message:`Appointments are getting`,data:doctors})

} catch (error) {
  res
  .status(500)
  .json({ success: false, message: "Somthing went wrong, cannot get" });
}              

  
 

}