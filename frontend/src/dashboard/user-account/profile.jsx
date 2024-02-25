import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import uplodaImageToCloudinary from "../../utils/upload-cloudinary.js";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const Profile = ({ user }) => {
  const [SelectFile, setSelectFile] = useState(null);
  const [Loading, setLoading] = useState(false);

  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    role: "patient",
    bloodType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  },[]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...FormData, [name]: value });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    const data = await uplodaImageToCloudinary(file);

    setSelectFile(data.url);
    setFormData({ ...FormData, photo: data.url });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(FormData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      } else {
        setLoading(false);
        toast.success(message);

        navigate("/users/profile/me");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            className="w-full pr-4  py-3 border-b border-soldi border-[#0066ff61] focus:outline-none 
              focus:border-b-primaryColor text-[16px] leading-7
               text-headingColor placeholder:text-textColor  cursor-pointer sm:text-[14px]  "
            type="text"
            placeholder="Full Name"
            name="name"
            value={FormData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-5">
          <input
            className="w-full pr-4  py-3 border-b border-soldi border-[#0066ff61] focus:outline-none 
              focus:border-b-primaryColor text-[16px] leading-7
               text-headingColor placeholder:text-textColor  cursor-pointer sm:text-[14px]  "
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={FormData.email}
            onChange={handleInputChange}
          aria-readonly
          readOnly
          />
        </div>
        <div className="mb-5">
          <input
            className="w-full pr-4  py-3 border-b border-soldi border-[#0066ff61] focus:outline-none 
              focus:border-b-primaryColor text-[16px] leading-7
               text-headingColor placeholder:text-textColor  cursor-pointer sm:text-[14px]  "
            type="password"
            placeholder="Password"
            name="password"
            value={FormData.password}
            onChange={handleInputChange}
            
          />
        </div>
        <div className="mb-5">
          <input
            className="w-full pr-4  py-3 border-b border-soldi border-[#0066ff61] focus:outline-none 
              focus:border-b-primaryColor text-[16px] leading-7
               text-headingColor placeholder:text-textColor  cursor-pointer sm:text-[14px]  "
            type="text"
            placeholder="Boold Type"
            name="bloodType"
            value={FormData.bloodType}
            onChange={handleInputChange}
     
          />
        </div>
        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Gender:
            <select
              name="gender"
              value={FormData.gender}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 
                  py-3 focus:outline-none bg-transparent"
            >
              <option value={``}>Select</option>
              <option value={`male`}>Male</option>
              <option value={`female`}>Female</option>
              <option value={`other`}>Other</option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex items-center gap-3 ">
          {FormData.photo && (
            <figure
              className="w-[60px] h-[60px] rounded-full border-2 border-soli border-primaryColor
                    flex items-center justify-center overflow-hidden "
            >
              <img
                src={FormData.photo}
                alt=""
                className="w-full h-full rounded-full object-cover"
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
              {SelectFile ? SelectFile.name : "Upload Photo"}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            disabled={Loading && true}
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3  "
          >
            {Loading ? (
              <HashLoader size={"25px"} color={"white"} />
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
