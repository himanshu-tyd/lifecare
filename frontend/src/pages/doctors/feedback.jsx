import { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from "../../utils/format-date";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./doctor-feedback-form";

const Feedback = () => {
  const [showFeedbackForm, setshowFeedbackForm] = useState(false);

  return (
    <>
      <div>
        <div className="md-[50px]">
          <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px] ">
            All review (273)
          </h4>
          <div className="flex justify-between gap-10 mb-[30px]  ">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img src={avatar} alt="" className="w-full " />
              </figure>
              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold ">
                  Himanshu Taviyad
                </h5>
                <p className="text-[14px] leading-6 text-textColor  ">
                  {formateDate("04-06-2023")}
                </p>
                <p className="text_para mt-3 font-medium text-[15px]   ">
                  Good services, highly recommended
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(5).keys()].map((_, index) => (
                <AiFillStar key={index} color="#0067FF" />
              ))}
            </div>
          </div>
        </div>
        {!showFeedbackForm && (
          <div className="text-center flex ">
            <button className="btn" onClick={() => setshowFeedbackForm(true)}>
              Give Feedback
            </button>
          </div>
        )}
        {showFeedbackForm && <FeedbackForm />}
      </div>
    </>
  );
};

export default Feedback;
