import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { HiStar } from "react-icons/hi";
import {testimonialData} from "../../assets/data/testiomonial";
// Import images or use any placeholder images

const Testimonial = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px] ">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {testimonialData.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="py-[30px] px-5 rounded-[13px]">
              <div className="flex items-center gap-[13px]">
                <img src={testimonial.photo} alt="img" />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-[2px]">
                    <HiStar className="text-yellowColor w-[18px] h-5 " />
                    <HiStar className="text-yellowColor w-[18px] h-5 " />
                    <HiStar className="text-yellowColor w-[18px] h-5 " />
                    <HiStar className="text-yellowColor w-[18px] h-5 " />
                    <HiStar className="text-yellowColor w-[18px] h-5 " />
                  </div>
                </div>
              </div>
              <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                {testimonial.desc}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
