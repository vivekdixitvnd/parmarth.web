// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
