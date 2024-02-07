import { formateDate } from "../../utils/format-date";

const DoctorAbout = () => {
  return (
    <>
      <div>
        <div>
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2 ">
            About of
            <span className="text-irisBlueColor font-bold text-[24px] leading-9 ">
              Himanshu Taviyad
            </span>
          </h3>
          <p className="text_para">
            Aliqua cupidatat aute do est do esse amet est eu sint. Dolor ad
            eiusmod nostrud consequat enim ea elit pariatur sit culpa quis.
            Veniam incididunt fugiat aliqua eu laboris consectetur magna esse.
            Aliquip culpa mollit ad laboris quis proident voluptate elit enim
            aliquip eiusmod exercitation ea qui. Excepteur cillum irure dolore
            culpa incididunt. Do do non dolor laboris elit irure Lorem cillum
            dolore amet officia exercitation minim. Laborum qui nisi do tempor
            elit ad.
          </p>
        </div>
        <div className="mt-12">
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold   ">
            Education
          </h3>
          <ul className="pt-4 md:p-5">
            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
              <div>
                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold ">
                  {formateDate("05-09-2015")} - {formateDate("06-07-2019")}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor ">
                  PHD in Surgeon
                </p>
              </div>
              <p className="text-[16px] leading-6 font-medium text-textColor ">
                New Apollo Hospital, Ahmedabad.
              </p>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
              <div>
                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold ">
                  {formateDate("09-04-2010")} - {formateDate("05-09-2014")}
                </span>
                <p className="text-[15px] leading-6 font-medium text-textColor ">
                  PHD in Surgeon
                </p>
              </div>
              <p className="text-[16px] leading-6 font-medium text-textColor ">
                New Apollo Hospital, Ahmedabad.
              </p>
            </li>
          </ul>
        </div>

        <div className="mt-12 ">
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold ">
            Experience
          </h3>
          <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5 ">
            <li className="p-4 rounded bg-[#fff9ea] ">
                <span className="text-yellowColor text-[15px] leading-6 font-semibold  ">
                {formateDate("09-04-2010")} - {formateDate("05-09-2014")}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor ">
                  Sr. Surgeon
                </p>
                <p className="text-[14px] leading-6 font-medium text-textColor ">
                New Apollo Hospital, Ahmedabad.
              </p>
            </li>
            <li className="p-4 rounded bg-[#fff9ea] ">
                <span className="text-yellowColor text-[15px] leading-6 font-semibold  ">
                {formateDate("09-04-2010")} - {formateDate("05-09-2014")}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor ">
                  Sr. Surgeon
                </p>
                <p className="text-[14px] leading-6 font-medium text-textColor ">
                New Apollo Hospital, Ahmedabad.
              </p>
            </li>


          </ul>
        </div>
      </div>
    </>
  );
};

export default DoctorAbout;
