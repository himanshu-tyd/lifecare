import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import  authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js"
import doctorRoute from "./routes/doctor.js"
import reviewRoute from './routes/review.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const DB = process.env.MONGO_URL;

const CorsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send(`Api is running`);
});

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB, {

      
    });
    console.log(`connection successfull`);
  } catch (error) {
    console.log(
      `Error created while connectiong database with error => ${error}`
    );
  }
};

//middelware
app.use(express.json());
app.use(cookieParser());
app.use(cors(CorsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);


app.listen(port, () => {
  connectDB();
  console.log(`server is running at port ${port}`);
});
