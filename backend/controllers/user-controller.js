import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

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
      message: `Successfully Upadated`,
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

// Define an asynchronous function to get a single user
export const getSingleUser = async (req, res) => {
  const id = req.params.id; // Get the ID from the request parameters
  console.log(id, "id from getSingleUser from userController"); // Log the ID for debugging

  try {
    const user = await User.findById(id).select("-password"); // Find the user by ID and exclude the password field

    // If the user is found, send a success response with the user data
    res.status(200).json({
      success: true,
      message: `User Found`,
      data: user,
    });
  } catch (error) {
    console.log(error); // Log any errors for debugging
    // If no user is found, send a failure response
    res.status(404).json({ success: false, message: `No User Found` });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: `Users Found`,
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: `No Found` });
  }
};

// Define an asynchronous function to get the user profile based on the request and response
export const getUserProfile = async (req, res) => {
  const userId = req.userId; // Get the userId from the request

  // console.log(userId, "user id from getUserProfile"); // Log the userId

  try {
    const user = await User.findById(userId); // Find the user by their userId using the findById function

    if (!user) {
      // If the user is not found, return a 404 status with an error message
      return res
        .status(404)
        .json({ success: false, message: "User Profile not found" });
    }

    const { password, ...rest } = user._doc; // Destructure the user object to remove the password field

    // Return a 200 status with the user's profile information
    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest }, // Return the user profile data without the password
    });
  } catch (error) {
    // If an error occurs, log the error and return a 500 status with an error message
    res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong while getting profile info",
      });
  }
};



// Define an asynchronous function to retrieve appointments for the logged-in user
export const getMyAppointments = async (req, res) => {
  try {
    //step-1 : Find bookings associated with the logged-in user
    const bookings = await Booking.find({ user: req.userId });

    //step-2 : Extract the unique doctor IDs from the bookings
    const doctorIds = bookings.map((el) => el.doctor.id);

    //step-3 : Find doctors based on the extracted IDs, excluding the password field
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    // If no doctors are found, throw an error
    // if (doctors.length === 0) {
    //   throw new Error("No doctors found for the specified user");
    // }

    // Send a success response with the retrieved appointment data
    res.status(200).json({
      success: true,
      message: `Appointments retrieved successfully`,
      data: doctors,
    });
  } catch (error) {
    // If an error occurs, send a server error response with the error message
    res.status(500).json({ success: false, message: error.message });
  }
};
