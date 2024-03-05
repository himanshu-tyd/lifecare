import razorpay from "razorpay";
import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const getCheckoutSession = async (req, res) => {
  try {
    const RPAY_KEY = process.env.RPAY_KEY_ID;
    const RPAY_SECRET_KEY = process.env.RPAY_SECRET_KEY;

    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    const rozorpay = new razorpay({
      key_id: RPAY_KEY,
      key_secret: RPAY_SECRET_KEY,
    });

    const options = {
      amount: doctor.ticketPrice * 100, // amount in paise
      currency: "INR",
      receipt: `order_${doctor._id}`,
      payment_capture: 1,
      notes: {
        bookingId: doctor._id,
        userId: user._id,
      },
    };

    const order = await rozorpay.orders.create(options);

    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      orderId: order.id,
    });

    await booking.save();

    console.log("Order =>",order)
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error(`Error creating checkout order=>${err}`);
    res.status(500).json({ success: false, message: `Error creating checkout session` });
  }
};
