import useFetchData from "../../hooks/user-fetch-data.js";
import { BASE_URL } from "../../config.js";
import DoctorCard from "../../components/doctors/doctor-card.jsx";
import Error from "../../components/error/error.jsx";
import Loading from "../../loading/loading.jsx";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && error && <Loading/>}
      {error && !loading && <Error errorMessage={error} />}
      {!loading && !error && <div className="grid grid-cols-1 lg:grid-cols-2 gap-5  " >
      {
        appointments.map(doctor=>{
          <DoctorCard doctor={doctor} key={doctor._id} />
        })
      }

      {!loading &&  !error && appointments.length===0 && (
        <div className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor ">
            You have not booked any doctor yet !
        </div>
      )}
      </div>}
    </div>
  );
};

export default MyBookings;
