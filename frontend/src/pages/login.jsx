import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { AuthContext } from "../context/auth-context";
const Login = () => {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...FormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          role: result.role,
          token: result.token,
        },
      });

      setLoading(false);
      toast.success(result.message);

      console.log(result, "login data");
      navigate("/home");

    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="px-55 lg:px-0">
        <div className="w-full max-w-[540px] mx-auto rounded-lg  shadow-md md:p-10 px-5  ">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold md-10 ">
            Hello <span className="text-primaryColor">Welcome </span>Back 🎉🎊
          </h3>
          <form className="py-4 md:py-0 mt-4" onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                className="w-full  py-3 border-b border-soldi border-[#0066ff61] focus:outline-none 
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
                className="w-full  py-3 border-b border-soldi border-[#0066ff61] focus:outline-none 
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
            <div className="mt-7">
              <button
                type="submit"
                className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3  "
              >
                Login
              </button>
            </div>

            <p className="mt-5 text-textColor text-center">
              Don&apos;t have an account?{" "}
              <Link to={"/signup"} className="text-primaryColor font-medium  ">
                signup
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
