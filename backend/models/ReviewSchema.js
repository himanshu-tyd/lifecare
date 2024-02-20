import mongoose from "mongoose";
import DoctorSchema from "./DoctorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

// to show reviews in frontend poppulate
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

/**
 * Calculate the average ratings for a specific doctor
 * @param {string} doctorId - The ID of the doctor
 */
reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  // Get the statistics for the reviews of the specified doctor
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId }, // Match the reviews for the specified doctor
    },
    {
      $group: {
        _id: "$doctor",
        numOfRating: { $sum: 1 }, // Count the number of reviews
        avgRating: { $avg: "$rating" }, // Calculate the average rating
      },
    },
  ]);

  // Update the doctor's total and average ratings
  await DoctorSchema.findByIdAndUpdate(doctorId, {
    totalRating: stats[0].numOfRating, // Set the total rating for the doctor
    averageRating: stats[0].avgRating // Set the average rating for the doctor
  });
};

reviewSchema.post('save',function(){
  this.constructor.calcAverageRatings(this.doctor)
})

export default mongoose.model("Review", reviewSchema);
