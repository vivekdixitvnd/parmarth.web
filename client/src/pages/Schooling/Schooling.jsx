import React, { useEffect, useState } from "react";
import styles from "./Schooling.module.css";
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

const Schooling = () => {
  const images = [
    "/img/Schooling/1.png",
    "/img/Schooling/2.png",
    "/img/Schooling/3.png",
    "/img/Schooling/4.png",
    "/img/Schooling/5.png",
    "/img/Schooling/6.png",
    "/img/Schooling/7.png",
    "/img/Schooling/8.png",
    "/img/Schooling/9.png",
    "/img/Schooling/10.png",
    "/img/Schooling/11.png",
    "/img/Schooling/12.png",
  ];

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "150px" }} className={styles.body}>
        <div className={styles.section}>
          <InfiniteScroll images={images} />
        </div>

        {/* Schooling Support by Parmarth */}
<div className={styles.section}>
  <h1>Schooling Support – "Shiksha Ka Haq, Har Bacche Ke Saath!"</h1>
  <p><strong>Parmarth</strong> believes that every child deserves access to quality education, regardless of their socio-economic background. With this vision, Parmarth actively facilitates school admissions and academic support for underprivileged children, helping them take confident steps toward a brighter future.</p>
</div>

{/* Admission through RTE */}
<div className={styles.section}>
  <h2>Admission Through RTE</h2>
  <p>One of the first steps taken by <strong>Parmarth</strong> is guiding families to secure school admissions for their children under the <strong>Right to Education (RTE)</strong> Act. Our volunteers help complete the documentation and application process so that deserving students can get enrolled in <strong>Class 1</strong> of reputed private schools, free of cost.</p>
</div>

{/* JNV Exam Preparation */}
<div className={styles.section}>
  <h2>Jawahar Navodaya Vidyalaya (JNV) Exam Preparation</h2>
  <p><strong>JNV</strong> is a prestigious residential school system run by the Government of India that provides free education from Class 6 onward to meritorious students from rural areas. <strong>Parmarth</strong> identifies eligible children and prepares them thoroughly for the entrance exam.</p>
  <ul>
    <li><strong>Concept-Based Learning:</strong> Focus on building strong fundamentals in reasoning, mathematics, and language.</li>
    <li><strong>Practice Papers & Mock Tests:</strong> Regular testing to help students get familiar with the exam pattern and manage time effectively.</li>
    <li><strong>Personal Mentoring:</strong> Volunteers and mentors track individual progress and provide feedback for improvement.</li>
  </ul>
</div>

{/* Shreshtha Yojana Exam Preparation */}
<div className={styles.section}>
  <h2>Shreshtha Yojana Exam Preparation</h2>
  <p><strong>Shreshtha Yojana</strong> is an initiative by the Government of India aimed at selecting and supporting talented students from SC communities for admission into quality residential schools for Classes 9 and 11. <strong>Parmarth</strong> helps students prepare for this national-level entrance exam and secure seats in top institutions.</p>
  <ul>
    <li><strong>Targeted Coaching:</strong> Specialized preparation for Class 9 and Class 11 level competitive syllabi.</li>
    <li><strong>Awareness Campaigns:</strong> Informing families and students about the benefits and application process of Shreshtha.</li>
    <li><strong>Interview & Counseling Support:</strong> Guidance not just for exams but also for interviews and post-selection transition.</li>
  </ul>
</div>

{/* Long-Term Impact */}
<div className={styles.section}>
  <h2>Long-Term Impact</h2>
  <p>Through this structured approach, <strong>Parmarth</strong> ensures that children don't just get enrolled in schools, but also thrive academically and secure opportunities in prestigious institutions. This educational empowerment transforms lives, not just for the children but for their entire families and communities.</p>
</div>

{/* Education for All */}
<div className={styles.section}>
  <h2>Education for All</h2>
  <p>With consistent efforts, <strong>Parmarth</strong> is turning the dream of inclusive and equitable education into reality. Be it through RTE admissions or coaching for elite schools like JNV and Shreshtha, each initiative is a step towards building an educated and empowered India.</p>
</div>

      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Schooling;