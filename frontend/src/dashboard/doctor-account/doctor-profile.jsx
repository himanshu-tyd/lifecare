/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uplodaImageToCloudinary from "../../utils/upload-cloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import specializationData from "../../utils/specialization.js";

const DoctorProfile = ({ doctorData }) => {
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    specialization: "",
    ticketPrice: null,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    photo: null,
    about: "",
    bio: "",
  });

  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      phone: doctorData?.phone,
      gender: doctorData?.gender,
      specialization: doctorData?.gender,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      photo: doctorData?.photo,
      about: doctorData?.about,
      bio: doctorData?.bio,
    });
  }, [doctorData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (numericValue.length <= 10) {
        setFormData({ ...FormData, [name]: numericValue });
      }
    } else {
      // For other fields, update state normally
      setFormData({ ...FormData, [name]: value });
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const data = await uplodaImageToCloudinary(file);
    setFormData({ ...FormData, photo: data?.url });
  };

  const saveProfilehandeler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(FormData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }
      toast.success(result.message);
    } catch (e) {
      toast.error(e.message);
    }
  };

  //resualbe function for deleting item

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  //reusable function for addding item
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  //reusable input changeFuntion for addding item

  const handleReusableInputChange = (key, index, event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];

      updateItems[index][name] = value;

      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  const addQualification = async (e) => {
    e.preventDefault();

    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handleQualificationChange = (event, index) => {
    event.persist();
    handleReusableInputChange("qualifications", index, event);
  };

  const deleteQulification = (e, index) => {
    e.preventDefault();
    if (index >= 0) {
      deleteItem("qualifications", index);
    }
  };

  //exprerince

  const addExprerience = async (e) => {
    e.preventDefault();

    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputChange("experiences", index, event);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };
  const addTimeSlot = async (e) => {
    e.preventDefault();

    addItem("timeSlots", {
      day: "Sunday",
      startingTime: "10:00",
      endingTime: "05:00",
    });
  };

  const handleTimeSlotChange = (event, index) => {
    handleReusableInputChange("timeSlots", index, event);
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[18px] leading-9 mb-10  ">
        Profile Information
      </h2>
      <form>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={FormData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          ></input>
        </div>

        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={FormData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form__input"
            aria-readonly
            readOnly={true}
          ></input>
        </div>

        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="tel"
            pattern="[0-9]{10}"
            name="phone"
            value={FormData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form__input"
            onInvalid={(e) => {
              e.target.setCustomValidity("Please enter exactly 10 digits.");
            }}
            onInput={(e) => {
              e.target.setCustomValidity("");
            }}
          ></input>
        </div>

        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={FormData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form__input"
          ></input>
        </div>

        <div className="mb-5 ">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            {/* =========Gender============= */}
            <div>
              <p className="form__label">Gender*</p>
              <select
                name="gender"
                value={FormData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* =========Specialization============= */}
            <div>
              <p className="form__label">Specialization*</p>
              <select
                name="specialization"
                value={FormData.specialization}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                {specializationData.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* =========Ticket Price============= */}
            <div>
              <p className="form__label">Ticket Price*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={FormData.ticketPrice}
                className="form__input"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* =========qualifications============= */}
          <div className="mb-5">
            <p className="form__lable">Qualifications*</p>
            {FormData.qualifications?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Starting Date</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>

                    <div>
                      <p className="form__label">Ending Date</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <p className="form__label">Degree*</p>
                      <input
                        type="text"
                        name="degree"
                        value={item.degree}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>

                    <div>
                      <p className="form__label">University</p>
                      <input
                        type="text"
                        name="university"
                        value={item.university}
                        className="form__input"
                        onChange={(e) => handleQualificationChange(e, index)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => deleteQulification(e, index)}
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] hover:bg-black"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addQualification}
              className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Qualifications
            </button>
          </div>
          {/* =========Expreiences============= */}

          <div className="mb-5">
            <p className="form__lable">Expreiences*</p>
            {FormData.experiences?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="form__label">Starting Date</p>
                      <input
                        type="date"
                        name="startingDate"
                        value={item.startingDate}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>

                    <div>
                      <p className="form__label">Ending Date</p>
                      <input
                        type="date"
                        name="endingDate"
                        value={item.endingDate}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <p className="form__label">Position*</p>
                      <input
                        type="text"
                        name="position"
                        value={item.position}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>

                    <div>
                      <p className="form__label">Hospital*</p>
                      <input
                        type="text"
                        name="hospital"
                        value={item.hospital}
                        className="form__input"
                        onChange={(e) => handleExperienceChange(e, index)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => deleteExperience(e, index)}
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] hover:bg-black"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addExprerience}
              className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Expreience
            </button>
          </div>

          {/* =========Time Slots============= */}
          <div className="mb-5">
            <p className="form__lable">Time Slots*</p>
            {FormData.timeSlots?.map((item, index) => (
              <div key={index}>
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                    <div>
                      <p className="form__label">Day*</p>
                      <select
                        name="day"
                        value={item.day}
                        className="form__input py-3.5"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                      >
                        <option value="">Select</option>
                        <option value="sunday">Sunday</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                      </select>
                    </div>

                    <div>
                      <p className="form__label">Starting Time*</p>
                      <input
                        type="time"
                        name="startingTime"
                        value={item.startingTime}
                        className="form__input"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className="form__label">Ending Time*</p>
                      <input
                        type="time"
                        name="endingTime"
                        value={item.endingTime}
                        className="form__input"
                        onChange={(e) => handleTimeSlotChange(e, index)}
                      />
                    </div>
                    <div>
                      <button
                        onClick={(e) => deleteTimeSlot(e, index)}
                        className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 mb-[30px] hover:bg-black "
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addTimeSlot}
              className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer"
            >
              Add Time Slots
            </button>
          </div>
          {/* =========About============= */}
          <div className="mb-5">
            <p className="form__label">About*</p>
            <textarea
              name="about"
              rows={5}
              value={FormData.about}
              placeholder="Write about you"
              className="form__input"
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* =========photo and file upload============= */}
          <div className="mb-5 flex items-center gap-3">
            {FormData.photo && (
              <figure
                className="w-[60px] h-[60px] rounded-full border-2 border-soli border-primaryColor
                    flex items-center justify-center overflow-hidden "
              >
                <img
                  src={FormData.photo}
                  alt=""
                  className="w-full rounded-full object-cover"
                />
              </figure>
            )}
            <div className="relative w-[130px] h-[50px] ">
              <input
                type="file"
                name="photo"
                id="customeFile"
                onChange={handleFileUpload}
                accept=".jpg, .png, .jpeg, .gif"
                className="absolute top-2 left-2 w-full opacity-0 cursor-pointer "
              />
              <label
                htmlFor="customeFile"
                className="absolute top-0 left-0 w-full h-full flex
                    items-center px-[0.75rem] py-[0.235rem] text-[15px] leading-6 overflow-hidden 
                    bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer "
              >
                Upload Photo
              </label>
            </div>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              onClick={saveProfilehandeler}
              className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg "
            >
              Save Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;
