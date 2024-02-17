import signupImg from "../assets/images/signup.gif";
import avatar from "../assets/images/doctor-img02.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import uplodaImageToCloudinary from "../utils/upload-cloudinary";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const Signup = () => {
  const [SelectFile, setSelectFile] = useState(null);
  const [PreviewURL, setPreviewURL] = useState("");
  const [Loading, setLoading] = useState(false);

  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "",
    role: "patient",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...FormData, [name]: value });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    const data = await uplodaImageToCloudinary(file);

    setPreviewURL(data.url);
    setSelectFile(data.url);
    setFormData({ ...FormData, photo: data.url });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }else{

        setLoading(false);
        toast.success(message);
        
        navigate("/login");
      }

    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="px-5 xl:px-0">
        <div className="max-w-[1170px] mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            {/* =========img box========= */}
            <div className="hidden lg:block lg:bg-primaryColor rounded-l-lg">
              <figure className="rounded-l-lg ">
                <img
                  src={signupImg}
                  alt="img"
                  className="w-full rounded-l-lg"
                />
              </figure>
            </div>
            {/* ===========sign up from======== */}

            <div className="rounded-l-lg lg:pl-16 py-10 ">
              <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10  ">
                Create an <span className="text-primaryColor ">account</span>
              </h3>
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
                    required
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
                    required
                  />
                </div>
                <div className="mb-5 flex items-center justify-between">
                  <label className="text-headingColor font-bold text-[16px] leading-7">
                    Are you a:
                    <select
                      name="role"
                      value={FormData.role}
                      onChange={handleInputChange}
                      className="text-textColor font-semibold text-[15px] leading-7 px-4 
                  py-3 focus:outline-none bg-transparent"
                    >
                      <option value={`patient`}>Patient</option>
                      <option value={`doctor`}>Doctor</option>
                    </select>
                  </label>
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
                  {SelectFile && (
                    <figure
                      className="w-[60px] h-[60px] rounded-full border-2 border-soli border-primaryColor
                    flex items-center justify-center "
                    >
                      <img
                        src={PreviewURL}
                        alt=""
                        className="w-full rounded-full"
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
                    disabled={Loading && true}
                    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3  "
                  >
                    {Loading ? (
                      <HashLoader size={"30px"} color={"#ffffff"} />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>

                <p className="mt-5 text-textColor text-center">
                  Already have an Account ?{" "}
                  <Link
                    to={"/login"}
                    className="text-primaryColor font-medium  "
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
