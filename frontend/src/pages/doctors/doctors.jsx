import DoctorCard from "../../components/doctors/doctor-card";
import Testimonial from "../../components/testimonial/testimonial";
import { BASE_URL } from "../../config.js";
import useFetchData from "../../hooks/user-fetch-data.js";
import Loading from "../../components/loading/loading";
import Error from "../../components/error/error";
import { useEffect, useState } from "react";

const Doctor = () => {
const [query, setQuery] = useState("")
  const [deboundQuery, setDeboundQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());

    console.log("handle search");
  };

  useEffect(()=>{
    const timeout=setTimeout(()=>{
      setDeboundQuery(query)
    },700)

    return()=>clearTimeout(timeout)

  },[query])



  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${deboundQuery}`);

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
              placeholder="Search Doctor by name or specifications"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md "
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loading />}
          {error && <Error errorMessage={error} />}
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5   ">
              {doctors.map((doctor) => (
                <DoctorCard doctors={doctor} key={doctor.id} />
              ))}
            </div>
          )}
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
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctor;
