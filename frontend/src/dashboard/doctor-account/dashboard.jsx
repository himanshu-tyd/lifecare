import useFetchData from "../../hooks/user-fetch-data";
import { BASE_URL } from "../../config";
import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";
import Tabs from "./tabs";
import { useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { AiFillStar } from "react-icons/ai";
import DoctorAbout from "../../pages/doctors/doctors-about";
import DoctorProfile from "./doctor-profile";
import DoctorAppointments from "./doctor-appointmens";

const Dashboard = () => {
  const { data, loading, error } = useFetchData(
    `${BASE_URL}/doctors/profile/me`
  );
  const [tab, setTab] = useState("overview");

  

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto ">
        {loading && !error && <Loading />}
        {!loading && error && <Error />}
        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]  ">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data.isApproved === "pending" && (
                <div className="flex p-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <FaCircleExclamation />

                  <span className="sr-only">info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approvel please complete your profile. we&apos;ll
                    review manually and approve within 3days.
                  </div>
                </div>
              )}
              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[250px] flex overflow-hidden  ">
                        <img
                          src={data?.photo}
                          alt=""
                          className="w-full rounded-md object-cover  "
                        />
                      </figure>
                      <div>
                        <span className="bg-[#CCF0f3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[12px] lg:leading-6 font-semibold ">
                          {data.specialization}
                        </span>
                        <h3 className="text-[20px] leading-9 font-bold text-headingColor mt-3  ">
                          {data.name}
                        </h3>
                        <div className="flex items-center gap-[6px] ">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <AiFillStar className="text-yellow-500" />
                            {data?.averageRating}
                          </span>
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            ({data.totalRating})
                          </span>
                        </div>
                        <p className="text_para font-[12px] lg:max-w-[390px] leading-6 ">
                          {data?.bio}
                        </p>
                      </div>
                    </div>

                    <DoctorAbout
                      name={data.name}
                      about={data.about}
                      qualifications={data.qualifications}
                      experiences={data.experiences}
                    />
                  </div>
                )}
                {tab === "appointments" && <DoctorAppointments appointments={data.appointments}/>}
                {tab === "settings" && <DoctorProfile doctorData={data}/>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
