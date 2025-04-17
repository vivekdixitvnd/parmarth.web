import React, { useEffect, useState } from "react";
import styles from "./Utsarg.module.css";
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

const Utsarg = () => {
  const images = [
    "/img/Utsarg/1.png",
    "/img/Utsarg/2.png",
    "/img/Utsarg/3.png",
    "/img/Utsarg/4.png",
    "/img/Utsarg/5.png",
  ];

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "150px" }} className={styles.body}>
        <div className={styles.section}>
          <InfiniteScroll images={images} />
        </div>

        {/* UTSARG Introduction */}
        <div className={styles.section}>
        <h1>UTSARG - "Sewa Se Safar Tak"</h1>
        <p><strong>UTSARG</strong> is a heartwarming farewell event organized by Parmarth to honor and celebrate the dedication of volunteers whose journey of service has come to an end. The term <strong>UTSARG</strong> symbolizes “sacrifice” or “offering,” reflecting the selfless service and unwavering commitment of these volunteers who have devoted their time and energy to uplifting underprivileged children.</p>

        
            <h2>Celebrating the Impact of Volunteers</h2>
            <p>The journey of these volunteers has been one of transformation — not just for the children they mentored but also for themselves. Through their dedication and continuous efforts, they have:</p>
            
                <ul>
                    <li><strong>Empowered Young Minds:</strong> Volunteers have guided underprivileged children, helping them develop confidence, knowledge, and essential life skills.</li>
                    <li><strong>Ignited a Passion for Learning:</strong> Their teaching and mentoring have inspired curiosity and a love for education among the children.</li>
                    <li><strong>Instilled Values and Ethics:</strong> Beyond academics, volunteers have played a crucial role in shaping the character and moral values of the children.</li>
                </ul>
            
        </div>

        {/* Distribution and Gratitude */}
        <div className={styles.section}>
        <h2>Distribution and Gratitude</h2>
            <p>To mark this memorable occasion, <strong>UTSARG</strong> also includes the distribution of essential items and gifts to the children, symbolizing the passing on of knowledge, care, and hope. These distributions are not merely gifts but tokens of encouragement that motivate the children to continue striving for a brighter future.</p>
            <h2>How UTSARG Benefits the Children</h2>
            <p><strong>UTSARG</strong> leaves a lasting impression on the children and motivates them in numerous ways:</p>
                <ul>
                    <li><strong>Inspiration to Dream Big:</strong> Seeing their mentors move forward in life encourages children to aim higher and work harder.</li>
                    <li><strong>Continued Learning and Growth:</strong> The values and knowledge imparted by the volunteers stay with the children, guiding them in their educational and personal journeys.</li>
                    <li><strong>Strengthened Confidence:</strong> The recognition and love shown during UTSARG boost the self-esteem of the children, instilling a belief that they, too, can make a difference.</li>
                </ul>
        </div>

        {/* Memories */}
        <div className={styles.section}>
        <h2>Emotional Bond and Lifelong Memories</h2>
            <p>For the children, <strong>UTSARG</strong> is an emotional moment where they bid farewell to their mentors who have become role models and pillars of support. The bond created over months of learning and growth turns into lifelong memories, inspiring them to follow in the footsteps of their mentors.</p>
        </div>

        {/* Compassion */}
        <div className={styles.section}>
        <h2>Building a Cycle of Compassion</h2>
            <p><strong>UTSARG</strong> not only celebrates the journey of the outgoing volunteers but also plants seeds of compassion in the hearts of the children. Witnessing such dedication motivates these young minds to give back to society when they grow up, creating a beautiful cycle of kindness and service.</p>
        </div>
        {/* Legacy */}
        <div className={styles.section}>
        <h2>A Lasting Legacy</h2>
            <p>As the volunteers move on to new phases of their lives, their impact remains etched in the hearts of the children they have nurtured. <strong>UTSARG</strong> ensures that this legacy of service and compassion continues to thrive, empowering future generations to carry forward the mission of spreading knowledge and hope.</p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Utsarg;