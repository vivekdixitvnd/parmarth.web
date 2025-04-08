import React, { useEffect, useState } from "react";
import styles from "./GE.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Testimonials from "../../components/Testimonials/Testimonials";

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

    return () => clearInterval(interval); // Clean up interval
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

const GE = () => {
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

        {/* Girl Education Introduction */}
        <div className={styles.section}>
          <h1>Girl Education - Team Pooja</h1>
          <p><strong>Team Pooja</strong> is a dedicated initiative under Parmarth that focuses on the education of girls who are unable to attend school due to societal or familial restrictions. Many of these girls come from communities where education for girls is not a priority. Our mission is to bridge this gap and provide them with the education and confidence they deserve.</p>

          <h2>Why Girl Education?</h2>
          <p>Education empowers girls to make informed decisions, become self-reliant, and break the cycle of poverty. Yet, many girls in our surroundings are denied this basic right. <strong>Team Pooja</strong> believes that every girl deserves a chance to learn, grow, and lead.</p>
        </div>

        {/* How It Works */}
        <div className={styles.section}>
          <h2>Our Approach</h2>
          <p>We currently teach over <strong>30+ girls</strong> from marginalized communities. Most of them had never been to school before. Here's how we work:</p>

          <h3>1. Community Engagement</h3>
          <p>Volunteers visit local areas and engage with families to explain the importance of educating their daughters. It often takes multiple conversations to gain trust and change mindsets.</p>

          <h3>2. Daily Learning Sessions</h3>
          <p>We organize regular learning sessions where the girls are taught basic literacy, numeracy, and general awareness. Classes are interactive, activity-based, and tailored to each child’s pace.</p>

          <h3>3. Building Confidence and Dreams</h3>
          <p>Along with academics, volunteers focus on personality development, building self-esteem, and helping the girls dream big about their future.</p>
        </div>

        {/* Impact */}
        <div className={styles.section}>
          <h2>Transforming Lives</h2>
          <p>Over time, these girls have shown tremendous progress. From not being able to read or write, they are now solving math problems, reading books, and even teaching their siblings.</p>

          <h3>Long-Term Goals:</h3>
          <ul>
            <li><strong>Enroll girls into formal schools</strong> with the help of local bodies</li>
            <li><strong>Encourage families</strong> to support their daughters' education</li>
            <li><strong>Create a safe and nurturing learning environment</strong> for every girl</li>
          </ul>
        </div>

        {/* Testimonials */}
        {/* In Their Words */}
        <Testimonials />
        

      </div>
      <Footer />
    </>
  );
};

export default GE;
