import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Constitution.module.css";

const Constitution = () => {
  return (
    <>
      <Navbar />
      <div className={styles.pdfContainer}>
        <iframe
          src="/Constitution.pdf"
          width="100%"
          height="700px"
          title="परमार्थ का संविधान"
        />
      </div>
      <Footer />
    </>
  );
};

export default Constitution;
