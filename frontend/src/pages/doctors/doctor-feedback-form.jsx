import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { json, useParams } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, sethover] = useState(0);
  const [ReviewText, setReviewText] = useState("");
  const [loading, setloading] = useState(false);

  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      if (!rating || !ReviewText) {
        setloading(false);
        return toast.error("Rating & Fields are required");
      }
      // if (!rating || ReviewText) {
      //   setloading(false);
      //   return toast.error("Rating & Fields are required");
      // }
      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText: ReviewText }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      setloading(false);
      toast.success(result.message);
    } catch (error) {
      setloading(false);
      toast.error(error.message);
    }
  };

  const handleTextReview = (e) => {
    setReviewText(e.target.value);
  };

  return (
    <>
      <form action="">
        <div>
          <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0 ">
            How would you rate the overall experience?*
          </h3>
          <div>
            {[...Array(5).keys()].map((_, index) => {
              index += 1;

              return (
                <button
                  key={index}
                  type="button"
                  className={`${
                    index <= ((rating && hover) || hover)
                      ? "text-yellowColor"
                      : "text-gray-400"
                  } bg-transparent border-none outline-none text-[22px] cursor-pointer  `}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => sethover(index)}
                  onMouseLeave={() => sethover(rating)}
                  onDoubleClick={() => {
                    sethover(0);
                    setRating(0);
                  }}
                >
                  <span>
                    <AiFillStar />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-[30px]">
          <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0 ">
            Share your valuable feedback or suggestions*
          </h3>
          <textarea
            className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor
          w-full px-4 py-3 rounded-md "
            rows={"5"}
            placeholder="Write your message"
            onChange={handleTextReview}
          ></textarea>
        </div>
        <button type="submit" className="btn" onClick={handleSubmitReview}>
          {loading ? <HashLoader size={25} color="white" /> : "Submit Feedback"}
        </button>
      </form>
    </>
  );
};

export default FeedbackForm;
