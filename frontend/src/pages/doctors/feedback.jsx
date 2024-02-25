import { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from "../../utils/format-date";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./doctor-feedback-form";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setshowFeedbackForm] = useState(false);

  return (
    <>
      <div>
        <div className="md-[50px]">
          <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px] ">
            All review ({totalRating})
          </h4>

          {reviews?.map((review, index) => (
            <div
              key={index}
              className="flex justify-between gap-10 mb-[30px]  "
            >
              <div className="flex gap-3">
                <figure className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={review?.user?.photo} alt="" className="w-full h-full object-cover " />
                </figure>
                <div>
                  <h5 className="text-[16px] leading-6 text-primaryColor font-bold ">
                    {review?.user?.name}
                  </h5>
                  <p className="text-[14px] leading-6 text-textColor  ">
                    {formateDate(review?.createdAt)}
                  </p>
                  <p className="text_para mt-3 font-medium text-[15px]   ">
                    {review.reviewText}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(review?.rating).keys()].map((_, index) => (
                  <AiFillStar key={index} color="#0067FF" />
                ))}
              </div>
            </div>
          ))}
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
