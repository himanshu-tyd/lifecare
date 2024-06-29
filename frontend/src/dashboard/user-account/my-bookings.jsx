import useFetchData from "../../hooks/user-fetch-data.js";
import { BASE_URL } from "../../config.js";
import DoctorCard from "../../components/doctors/doctor-card.jsx";
import Error from "../../components/error/error.jsx";
import Loading from "../../components/loading/loading.jsx";
const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

 
  if (loading && !error) {
    return <Loading />;
  }
  if (error && !loading) {
    return <Error errorMessage={error} />;
  }
  if (!loading && !error) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {appointments.map((doctor) => (
          <DoctorCard doctors={doctor} key={doctor._id} />
        ))}
        {loading && error && appointments.length == 0 && (
          <div className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
            You have not booked any doctor yet!
          </div>
        )}
      </div>
    );
  }
};

export default MyBookings;
