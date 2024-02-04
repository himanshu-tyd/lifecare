import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Router from "../../routes/router";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
