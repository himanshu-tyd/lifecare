import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
  AiFillInstagram,
} from "react-icons/ai";

const sociallinks = [
  {
    path: "https://www.youtube.com/@codebucketht",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5 " />,
  },
  {
    path: "https://github.com/himanshu-tyd",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5 " />,
  },
  {
    path: "https://www.instagram.com/himanshu_tyd?igsh=MzNlNGNkZWQ4Mg==",
    icon: <AiFillInstagram className="group-hover:text-white w-4 h-5 " />,
  },
  {
    path: "https://www.linkedin.com/in/himanshu-taviyad-38b306225/",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5 " />,
  },
];

const quickLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About Us",
  },
  {
    path: "/sevices",
    display: "Sevices",
  },
  {
    path: "/blog",
    display: "Blog",
  },
];

const quickLinks02 = [
  {
    path: "/find-a-doctor",
    display: "Find a Doctor",
  },
  {
    path: "/",
    display: "Request an Appointment",
  },
  {
    path: "/",
    display: "Find a Location",
  },
  {
    path: "/",
    display: "Get a Opinion",
  },
];
const quickLinks03 = [
  {
    path: "/",
    display: "Donate",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px] mb-[30px]  ">
          <div>
            <img src={logo} alt="logo" className="w-[130px]" />
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4 ">
              Copyrigth {year} devloped by Himanshu Taviyad All rights reserved{" "}
            </p>
            <div className="flex items-center gap-3 mt-4">
              {sociallinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="
                    w-9 h-9 border border-solid border-[#181a1e] rounded-full flex items-center justify-center
                    group hover:bg-primaryColor hover:border-none
                    "
                  target="_blank"
                >
                  {link.icon}{" "}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor ">
              Quick Links
            </h2>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index} className="mt-4">
                  <Link
                    to={link.path}
                    className="text-[16px] leading-7 font-[400] text-textColor  "
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor ">
              I want to:
            </h2>
            <ul>
              {quickLinks02.map((link, index) => (
                <li key={index} className="mt-4">
                  <Link
                    to={link.path}
                    className="text-[16px] leading-7 font-[400] text-textColor  "
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor ">
              Support
            </h2>
            <ul>
              {quickLinks03.map((link, index) => (
                <li key={index} className="mt-4">
                  <Link
                    to={link.path}
                    className="text-[16px] leading-7 font-[400] text-textColor  "
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
