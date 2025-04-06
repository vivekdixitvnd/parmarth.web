import React, { useEffect, useState } from "react";
import styles from "./Unnayan.module.css";
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

const Unnayan = () => {
  const images = [
    "/img/Unnayan/1.png",
    "/img/Unnayan/2.png",
    "/img/Unnayan/3.png",
    "/img/Unnayan/4.png",
    "/img/Unnayan/5.png",
  ];

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.section}>
          <InfiniteScroll images={images} />
        </div>

        {/* UNNAYAN Introduction */}
<div className={styles.section}>
  <h1>UNNAYAN - "Kitaabein, Bhavishya Ki Neev!"</h1>
  <p><strong>UNNAYAN</strong> is a heart-driven initiative by Parmarth aimed at building a brighter future through the power of books. As part of this event, volunteers collect unused or pre-loved books from households in and around the college, and distribute them to children in underprivileged communities who truly need them.</p>
</div>

{/* Purpose and Impact */}
<div className={styles.section}>
  <h2>Purpose and Impact</h2>
  <p>The goal of <strong>UNNAYAN</strong> is not just to recycle books, but to ignite curiosity and provide learning opportunities to those who lack access to educational resources. Through this thoughtful effort, we aim to:</p>
  <ul>
    <li><strong>Bridge the Educational Gap:</strong> By providing books, we help children build knowledge and confidence.</li>
    <li><strong>Promote a Culture of Sharing:</strong> Encouraging communities to donate books fosters empathy and collective growth.</li>
    <li><strong>Inspire Lifelong Learning:</strong> These books become stepping stones for many children to dream bigger and aim higher.</li>
  </ul>
</div>

{/* Community Involvement */}
<div className={styles.section}>
  <h2>Community Involvement</h2>
  <p><strong>UNNAYAN</strong> thrives on community participation. Volunteers personally visit nearby neighborhoods, interact with locals, and explain how unused books can help rewrite someone’s future. This creates a strong sense of community ownership in shaping the lives of children.</p>
</div>

{/* Distribution Drive */}
<div className={styles.section}>
  <h2>Book Distribution Drive</h2>
  <p>Once collected, the books are carefully sorted and handed over to children through distribution drives organized by Parmarth. These moments are filled with smiles, gratitude, and hope—where each book finds a new home and each child takes a step closer to learning.</p>
</div>

{/* Creating Lifelong Learners */}
<div className={styles.section}>
  <h2>Creating Lifelong Learners</h2>
  <p>Books received during <strong>UNNAYAN</strong> go far beyond being just pages—they become a child’s companion, guide, and a source of inspiration. Through this initiative, we instill the value of knowledge and the belief that learning can transform lives.</p>
</div>

{/* A Movement of Change */}
<div className={styles.section}>
  <h2>A Movement of Change</h2>
  <p><strong>UNNAYAN</strong> is more than an event—it’s a movement. It inspires both donors and recipients to value education and understand the impact of small acts of kindness. It lays the foundation of a future where every child has the tools to build their dreams.</p>
</div>

      </div>
      <Footer />
    </>
  );
};

export default Unnayan;