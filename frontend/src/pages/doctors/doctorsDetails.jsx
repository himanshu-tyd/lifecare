import  { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import DoctorAbout from "./doctors-about";
import Feedback from "./feedback";
import SidePanel from "./side-panel";
import { BASE_URL } from "../../config.js";
import useFetchData from "../../hooks/user-fetch-data.js";
import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";
import { useParams } from "react-router-dom";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");

  const { id } = useParams();

  let url=`${BASE_URL}/doctors/${id}`
  console.log(url)

  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(url);

  console.log(doctor);

  const {
    about,
    email,
    experiences,
    isApproved,
    name,
    phone,
    photo,
    qualifications,
    role,
    specialization,
    ticketPrice,
    bio,
    timeSlots,
    totalRating,
  } = doctor;

  return (
    <>
      <section>
        <div className=" container mx-w-[1170px] px-5 mx-auto">
          {loading && <Loading />}
          {error && <Error errorMessage={error} />}
          {!loading && !error && (
            <div className="grid md:grid-cols-3 gap-[50px]">
              <div className="md:col-span-2">
                <div className="flex items-center gap-5">
                  <figure className="max-w-[200px] max-h-[250px] overflow-hidden flex rounded-md ">
                    <img src={photo} alt="" className="object-cover" />
                  </figure>

                  <div>
                    <span
                      className="bg-[#ccf0f3] text-irisBlueColor py-1  px-6 lg:px-6 lg:py-2 text-[12px]
                  leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded "
                    >
                    {specialization}
                    </span>
                    <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold ">
                      {name}
                    </h3>
                    <div className="flex items-center gap-[6px]  ">
                      <span
                        className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7
                       font-semibold text-headingColor "
                      >
                        <FaStar className="text-yellow-300" /> 4.8
                      </span>
                      <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] ">
                        ({totalRating})
                      </span>
                    </div>
                    <p className="text_para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px] ">
                      {bio}
                    </p>
                  </div>
                </div>

                <div className="mt-[50px] border-b border-solid border-[#0066ff34] ">
                  <button
                    className={` ${
                      tab === "about" &&
                      "border-b   border-solid border-primaryColor "
                    }py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor`}
                    onClick={() => setTab("about")}
                  >
                    About
                  </button>
                  <button
                    className={` ${
                      tab === "feedback" &&
                      "border-b   border-solid border-primaryColor "
                    }py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor`}
                    onClick={() => setTab("feedback")}
                  >
                    Feedback
                  </button>
                </div>

                <div className="mt-[50px]">
                  {tab === "about" && <DoctorAbout />}
                  {tab === "feedback" && <Feedback />}
                </div>
              </div>
              <div>
                <SidePanel />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DoctorDetails;
