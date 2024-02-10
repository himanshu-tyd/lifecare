import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Doctor from "../pages/doctors/doctors";
import DoctorDetails from "../pages/doctors/doctorsdetails";
import Contact from "../pages/contact";
import Services from "../pages/services";

const Router = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </>
  );
};

export default Router;
