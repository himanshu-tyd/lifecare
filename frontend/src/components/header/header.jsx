import React from "react";
import { useEffect, useRef } from "react";
import logo from "../../assets//images/logo.svg";
import useImg from "../../assets//images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import "../../App.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctor",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle("show_menu");
  };

  return (
    <>
      <header className="header flex  items-center h-[70px]" ref={headerRef}>
        <div className="container">
          <div className="flex items-center justify-between">
            {/* ===============logo=============== */}
            <div>
              <img src={logo} alt="logo" width={"120px"} />
            </div>
            {/* ==============menu================== */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu flex items-center gap-[2.7rem]">
                {navLinks.map((links, index) => (
                  <li key={index}>
                    <NavLink
                      to={links.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? `text-primaryColor text-[16px] leading-7 font-[600]`
                          : `text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor`
                      }
                    >
                      {links.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ==================rigth nav========================== */}

            <div className="flex items-center gap-4">
              <div>
                <Link to="">
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer ">
                    <img
                      src={useImg}
                      alt="user"
                      className="w-full rounded-full"
                    />
                  </figure>
                </Link>
              </div>

              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[40px] flex items-center justify-center rounded-[50px] ">
                  Login
                </button>
              </Link>
              <span className="md:hidden" onClick={toggleMenu}>
                <MdMenu className="w-6 h-6 cursor-pointer" />
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
