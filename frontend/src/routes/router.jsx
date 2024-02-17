import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Doctor from "../pages/doctors/doctors";
import DoctorDetails from "../pages/doctors/doctorsdetails";
import Contact from "../pages/contact";
import Services from "../pages/services";
import MyAccount from "../dashboard/user-account/my-account";
import Dashboard from "../dashboard/doctor-account/dashboard";
import ProtectedRoutes from "./protected-routes";

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
        <Route
          path="/users/profile/me"
          element={
            <ProtectedRoutes allowedRoles={["patient"]}>
              <MyAccount />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/doctors/profile/me"
          element={
            <ProtectedRoutes allowedRoles={["doctor"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
