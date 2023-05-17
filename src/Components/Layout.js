import React from "react";
import Header from "./Header";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div className="main">
      <Header />
      <div className="child-wrap">
      {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
