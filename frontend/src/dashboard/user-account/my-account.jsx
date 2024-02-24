import { useContext, useState } from "react";
import { authContext } from "../../context/auth-context";
import MyBooking from "./my-bookings";
import Profile from "./profile";
import useFetchData from "../../hooks/user-fetch-data";
import { BASE_URL } from "../../config";
import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const {
    data: userData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/profile/me`);

  console.log("userData", userData);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <section>
        <div className="max-w-[1170px] px-5 mx-auto">

          {loading && error && <Loading/>}
          {error && loading && <Error errorMessage={error}/>}
          {!loading && !error && (
            <div className="grid md:grid-cols-3 gap-10">
              <div className="pb-[50px] px-[30px] rounded-md">
                <div className="flex items-end justify-center ">
                  <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor overflow-hidden flex relative  ">
                    <img
                      src={userData.photo}
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  </figure>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-[18px] leading-[30px] text-headingColor font-bold ">
                    {userData.name}
                  </h3>
                  <p className="text-textColor text-[15px] leading-6 font-medium ">
                    {userData.email}
                  </p>
                  <p className="text-textColor text-[15px] leading-6 font-medium ">
                    Blood Type:{" "}
                    <span className="mt-2 text-headingColor text-[18px] leading-8">
                      {userData.bloodType}
                    </span>
                  </p>
                </div>

                <div className="mt-[50px] md:mt-[100px]  ">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white  "
                  >
                    Logout
                  </button>
                  <button className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md mt-4 text-white   ">
                    Delete Account
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 md:px-[30px]">
                <div>
                  <button
                    onClick={() => setTab("bookings")}
                    className={`  ${
                      tab === "bookings" &&
                      "bg-primaryColor text-white font-normal "
                    } py-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 
              border border-solid border-primaryColor `}
                  >
                    My Booking
                  </button>
                  <button
                    onClick={() => setTab("settings")}
                    className={`  ${
                      tab === "settings" &&
                      "bg-primaryColor text-white font-normal "
                    } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 
              border border-solid border-primaryColor `}
                  >
                    Profile Setting
                  </button>
                </div>
                {tab === "bookings" && <MyBooking />}
                {tab === "settings" && <Profile user={userData} />}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MyAccount;
