import React from "react";
import { Link } from "react-router-dom";
import TrueTick from "../assets/images/True_Tick.gif";

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="bg-gray-100 h-screen">
        <div className="bg-white p-6 md:mx-auto">
          <figure className="flex justify-center">
            <img src={TrueTick} alt="" />
          </figure>
          <div className="text-center">
            <h3 className="text-[30px] font-semibold">Payment Done !</h3>
            <p className="text-gray-900 my-2">
              Thank you for completing your scure online payment
            </p>
            <p>Have a great day!</p>
            <div className="py-10 text-center ">
              <Link
                to="/home"
                className="px-12 bg-buttonColor text-primaryColor font-semibold"
              >
                Go Back To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
