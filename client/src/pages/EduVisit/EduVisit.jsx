import React, { useEffect, useState } from "react";
import styles from "./EduVisit.module.css";
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

const EduVisit = () => {
  const images = [
    "/img/EduVisit/1.png",
    "/img/EduVisit/2.png",
    "/img/EduVisit/3.png",
    "/img/EduVisit/4.png",
    "/img/EduVisit/5.png",
  ];

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.section}>
          <InfiniteScroll images={images} />
        </div>

        {/* Educational Visits Introduction */}
        <div className={styles.section}>
          <h1>Educational Visits - "Learning Beyond the Classroom"</h1>
            <p>At <strong>Parmarth</strong>, we believe that education is not confined to textbooks and classrooms. True learning happens when children get to explore the world around them, experience new environments, and apply their knowledge in real-life situations.</p>
            <ul>
                <li><strong>Explore New Places:</strong> Introduces children to new cultures and lifestyles.</li>
                <li><strong>Experience Practical Learning:</strong> Reinforces classroom concepts with real-world experiences.</li>
                <li><strong>Foster Curiosity and Imagination:</strong> Develops critical thinking through exploration.</li>
                <li><strong>Boost Confidence and Social Skills:</strong> Enhances teamwork and communication.</li>
            </ul>
        </div>

        {/* Vision Behind Educational Visits */}
        <div className={styles.section}>
        <h2>The Vision Behind Educational Visits</h2>
            <p>Many underprivileged children rarely get the opportunity to step outside their neighborhoods. Educational Visits help bridge this gap by:</p>
            <ul>
                <li>Creating opportunities for practical learning.</li>
                <li>Inspiring aspirations and broadening career choices.</li>
                <li>Instilling a sense of wonder and curiosity.</li>
            </ul>
        </div>

        {/* Types of Educational Visits */}
        <div className={styles.section}>
        <h2>Types of Educational Visits</h2>
            <h3>1. Historical and Cultural Sites</h3>
            <p>Visits to historical monuments and heritage sites help children learn about India's rich culture and history.</p>
            <h3>2. Science and Technology Centers</h3>
            <p>Children engage with hands-on experiments and witness technological advancements, sparking interest in STEM fields.</p>
            <h3>3. Nature and Wildlife Exploration</h3>
            <p>Trips to zoos, botanical gardens, and sanctuaries encourage awareness about biodiversity and environmental conservation.</p>
            <h3>4. Industrial and Career Exposure</h3>
            <p>Visits to industries and government institutions give children a real-world understanding of various professions.</p>
        </div>

        {/* Impact */}
        <div className={styles.section}>
        <h2>Impact of Educational Visits on Children</h2>
            <p>Educational Visits inspire curiosity, boost self-esteem, and foster teamwork while nurturing leadership skills. They give underprivileged children a chance to experience environments where they are appreciated and encouraged.</p>
        </div>
        {/* Memories */}
        <div className={styles.section}>
        <h2>Memories That Last a Lifetime</h2>
            <p>These visits create lasting memories that inspire children to dream big, think critically, and embrace limitless opportunities. They often become a source of inspiration that motivates them to strive for a better future.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EduVisit;