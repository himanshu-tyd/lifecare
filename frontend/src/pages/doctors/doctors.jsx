import React from "react";
import { doctors } from "../../assets/data/doctors";
import DoctorCard from "../../components/doctors/doctor-card";
import Testimonial from "../../components/testimonial/testimonial";

const Doctor = () => {
  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a doctor</h2>
          <div className="sm:w-[348px] max lg:w-[540px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between ">
            <input
              type="search"
              className="py-1  pl-6  px-2 bg-transparent w-full 
          focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor"
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md ">
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5   ">
        {
            doctors.map((doctor)=>(
                <DoctorCard doctors={doctor} key={doctor.id} />
            ))
        }
      </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto  ">
            <h2 className="heading text-center">What our patient say</h2>
            <p className="text_para text-center">
              Committed to delivering comprehensive healthcare services with
              dedication and expertise.
            </p>
          </div>
          <Testimonial/>
        </div>
      </section>
    </>
  );
};

export default Doctor;
