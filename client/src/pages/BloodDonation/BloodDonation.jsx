import React, { useEffect, useState } from "react";
import styles from "./BloodDonation.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const InfiniteScroll = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  // Next Slide
  const nextSlide = () => {
    setIsSliding(true);
    setTimeout(() => {
      currentIndex < images.length - 1
        ? setCurrentIndex(currentIndex + 1)
        : setCurrentIndex(0);
    }, 100);
  };

  // Previous Slide
  const prevSlide = () => {
    setIsSliding(true);
    setTimeout(() => {
      currentIndex > 0
        ? setCurrentIndex(currentIndex - 1)
        : setCurrentIndex(images.length - 1);
    }, 100);
  };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval ); // Clean up interval
  }, [currentIndex]);

  return (
    <div className={styles.sliderWrapper}>
      {/* Left Button */}
      <button onClick={prevSlide} className={styles.navButton} id={styles.prev}>
        <FaChevronLeft />
      </button>

      <div className={styles.sliderContainer}>
        <div
          className={`${styles.slider} ${
            isSliding ? styles.slideTransition : ""
          }`}
        >
          <div className={styles.slide}>
            <img src={images[currentIndex]} alt={`slide-${currentIndex}`} />
          </div>
        </div>
      </div>

      {/* Right Button */}
      <button onClick={nextSlide} className={styles.navButton} id={styles.next}>
        <FaChevronRight />
      </button>
    </div>
  );
};

const BloodDonation = () => {
  const images = [
    "/img/Blood/1.png",
    "/img/Blood/2.png",
    "/img/Blood/3.png",
    "/img/Blood/4.png",
    "/img/Blood/5.png",
  ];

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "150px" }} className={styles.body}>
        <div className={styles.section}>
          <InfiniteScroll images={images} />
        </div>

        {/* BloodDonation Introduction */}
        <div className={styles.section}>
        <h1>RAKTDAAN MAHADAAN - "BLOOD DONATION CAMP"</h1>
        <p>
            <strong>RAKTDAAN MAHADAAN</strong> is a life-saving initiative organized by Parmarth that emphasizes the importance of blood donation and its role in saving lives. Every drop of blood donated has the potential to make a significant difference, especially during emergencies when timely availability of blood can be the deciding factor between life and death.
        </p>
        </div>

        {/* Vision Behind Educational Visits */}
        <div className={styles.section}>
        <h2>Why Blood Donation Matters?</h2>
            <p>
                Blood donation plays a vital role in healthcare, as donated blood is used to help patients suffering from critical illnesses, accidents, and surgeries. Through <strong>RAKTDAAN MAHADAAN</strong>, Parmarth ensures that blood banks are adequately stocked to meet emergency needs and save lives.
            </p>
        </div>

        {/* Objectives */}
        <div className={styles.section}>
        <h2>Objectives of RAKTDAAN MAHADAAN</h2>
            <ul>
                <li><strong>Raise Awareness:</strong> Educate people about the importance of regular blood donation.</li>
                <li><strong>Encourage Voluntary Blood Donation:</strong> Motivate people to contribute to this noble cause.</li>
                <li><strong>Build a Network of Donors:</strong> Create a community of regular donors for emergencies.</li>
                <li><strong>Ensure Blood Availability:</strong> Make sure sufficient blood is available when needed.</li>
            </ul></div>

        {/* Impact */}
        <div className={styles.section}>
        <h2>Impact of Blood Donation</h2>
            <ul>
                <li><strong>Saves Lives:</strong> Each unit of blood can save up to three lives.</li>
                <li><strong>Promotes Better Health:</strong> Regular blood donation reduces the risk of certain diseases.</li>
                <li><strong>Encourages Community Support:</strong> Blood donation fosters a sense of collective responsibility.</li>
            </ul></div>
        {/* How RAKTDAAN MAHADAAN Works? */}
        <div className={styles.section}>
        <h2>How RAKTDAAN MAHADAAN Works?</h2>
            <ul>
                <li><strong>Donor Registration:</strong> Interested donors register through the Parmarth platform or on-site.</li>
                <li><strong>Health Screening:</strong> A basic health check-up ensures donors are fit to donate.</li>
                <li><strong>Blood Collection:</strong> Trained medical professionals carry out the donation process safely.</li>
                <li><strong>Post-Donation Care:</strong> Donors are provided with refreshments and guidance after donation.</li>
            </ul></div>
            {/* Who Can Donate Blood? */}
        <div className={styles.section}>
        <h2>Who Can Donate Blood?</h2>
            <ul>
                <li>Individuals aged between 18-65 years.</li>
                <li>Minimum weight of 50 kg.</li>
                <li>Healthy individuals with no chronic illnesses.</li>
            </ul></div>
            {/* Social Impact */}
        <div className={styles.section}>
        <h2>The Social Impact of RAKTDAAN MAHADAAN</h2>
            <p>
                By organizing this event, Parmarth ensures the availability of blood for emergencies while fostering compassion and responsibility in the community. Witnessing such selfless acts encourages others to contribute towards building a healthier and supportive society.
            </p></div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default BloodDonation;