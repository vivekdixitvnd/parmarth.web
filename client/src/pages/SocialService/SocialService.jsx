import React, { useEffect, useState } from "react";
import styles from "./SocialService.module.css";
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

const SocialService = () => {
  const images = [
    "/img/Utsaah/1.png",
    "/img/Utsaah/2.png",
    "/img/Utsaah/3.png",
    "/img/Utsaah/4.png",
    "/img/Utsaah/5.png",
  ];

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "150px" }} className={styles.body}>
        <div className={styles.section}>
          <InfiniteScroll images={images} />
        </div>

        {/* Social Service Introduction */}
        <div className={styles.section}>
          <h1>Social Service - Parmarth in Action</h1>
          <p>
          At Parmarth, social service is not just an activity—it's a way of life. We believe in serving humanity with compassion, empathy, and responsibility. Through a range of initiatives, we work towards building a more inclusive and empowered society.

Our efforts are rooted in the philosophy of "Seva Parmo Dharma"—service is the highest duty. Whether it's educating a child, healing the sick, feeding the hungry, or protecting the environment, each action is driven by a deep sense of purpose and love for the community.

We strive to create meaningful change by bridging gaps in education, health, and social awareness. By involving youth, volunteers, and local communities, we ensure that our efforts are sustainable and impactful. Every individual, regardless of background, deserves dignity, opportunity, and hope—and that’s what Parmarth aims to deliver.

True social service goes beyond charity—it’s about empowerment, awareness, and action. Together, we envision a world where compassion drives progress and service becomes second nature.
          </p>
        </div>

        {/* Types of Services */}
        
        <div className={styles.cardGrid}>
  <div className={styles.card}>
    <h3>CLEANLINESS DRIVES</h3>
    <p>
      Regular cleanliness campaigns in local communities, schools, and public areas to promote hygiene. Children and volunteers actively participate to support the Swachh Bharat Abhiyan and create awareness about the importance of sanitation and a clean environment.
    </p>
  </div>
  
  <div className={styles.card}>
    <h3>FREE EDUCATION</h3>
    <p>
      Parmarth runs community learning centers and evening classes for underprivileged children. Trained volunteers help improve literacy, numeracy, and life skills, ensuring that no child is left behind due to lack of resources or access to education.
    </p>
  </div>
  
  <div className={styles.card}>
    <h3>HEALTH CAMPS</h3>
    <p>
      Regular medical check-up camps are organized in slums and rural areas. Doctors provide free consultation, distribute medicines, and raise awareness on hygiene, nutrition, menstrual health, and common illnesses, thus ensuring basic healthcare for all.
    </p>
  </div>
  
 
  
  <div className={styles.card}>
    <h3>CLOTHES & FOOD DONATION</h3>
    <p>
      Collection drives are held to gather clothes, dry ration, and cooked meals for distribution among the needy. These drives ensure that basic needs like food and clothing are met for the homeless, disaster-affected, and marginalized sections of society.
    </p>
  </div>
  
  <div className={styles.card}>
    <h3>AWARENESS CAMPAIGNS</h3>
    <p>
      Interactive campaigns on topics like health, gender equality, personal hygiene, education, and child safety are regularly conducted. Street plays, posters, and group discussions help spread vital messages in an engaging and impactful way.
    </p>
  </div>
</div>




        {/* Impact Message */}
        <div className={styles.section}>
          <h2>Our Impact</h2>
          <p>
            Over the years, Parmarth has touched thousands of lives through its consistent and heartfelt efforts. 
            With the help of volunteers, we aim to continue spreading kindness and creating lasting change.
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default SocialService;