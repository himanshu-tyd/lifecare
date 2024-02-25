import React from "react";
import { Link } from "react-router-dom";
import TrueTick from '../assets/images/True_Tick.gif'

const CheckoutSuccess = () => {
  return (
    <div className="bg-green-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <figure>
            <img src={TrueTick} alt=""/>
        </figure>
        <div className="text-center">
          <h3>Payment Done!</h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your scure online payment
          </p>
          <p>Have a great day!</p>
          <div className="py-10 text-center ">
            <Link
              to="/home"
              className="px-12 bg-buttonColor text-white font-semibold py-3"
            >
              Go Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
