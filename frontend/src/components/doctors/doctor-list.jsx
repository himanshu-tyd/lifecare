import DoctorCard from "./doctor-card.jsx";
import { BASE_URL } from "../../config.js";
import useFetchData from "../../hooks/user-fetch-data.js";
import Loading from "../loading/loading.jsx";
import Error from "../error/error.jsx";

const DoctorList = () => {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

  return (
    <>
      {loading && <Loading />}
      {error && <Error errorMessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]   ">
          {doctors.map((doctors) => (
            <DoctorCard doctors={doctors} key={doctors._id} />
          ))}
        </div>
      )}
    </>
  );
};

export default DoctorList;
