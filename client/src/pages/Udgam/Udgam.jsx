import React, { useEffect, useState } from "react";
import styles from "./Udgam.module.css";
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

const Udgam = () => {
  const images = [
    "/img/Team/1.jpg",
    "/img/Team/2.jpg",
    "/img/Team/3.png",
    "/img/Team/4.png",
  ];

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.section}>
          <InfiniteScroll images={images} />
        </div>

        {/* UDGAM Introduction */}
        <div className={styles.section}>
          <h1>UDGAM - The Foundation Day</h1>
          <p>
          UDGAM is Parmarth's annual foundation day event that celebrates the journey of empowering communities and inspiring change. It is a three-day event filled with enthusiasm, learning, and cultural exchange. Through various activities and events, UDGAM aims to instill a sense of awareness, responsibility, and enthusiasm in children and the community at large. The event reflects Parmarth's commitment to creating a positive impact by bringing together people from diverse backgrounds to share knowledge, showcase talents, and celebrate the spirit of unity.

            <br /><br />UDGAM, which means "origin" or "beginning," symbolizes the inception of a journey towards empowering communities. Parmarth, a renowned organization dedicated to serving underprivileged sections of society, organizes this event annually to highlight its achievements and inspire others to join hands in making a difference. This event is not just about celebrating the organization's success but also about nurturing young minds, fostering creativity, and encouraging holistic development.
          <br /><br />The core objective of UDGAM is to raise awareness about Parmarth's mission and vision. It provides a platform where children, educators, volunteers, and the local community can come together and engage in meaningful activities. The event is carefully designed to:

<br /><ul><li><b>Empower Children:</b> Inspire them to become leaders and change-makers.</li>

<li><b>Promote Social Awareness:</b> Educate communities about various social issues.</li>

<li><b>Celebrate Diversity:</b> Recognize and embrace different cultures and perspectives.</li>

<li><b>Encourage Participation:</b> Engage everyone through interactive and fun-filled activities.</li></ul>

UDGAM is structured in such a way that it offers something valuable to every participant—be it through sports, technology, or cultural exploration. Each day of the event focuses on a different theme, ensuring a well-rounded experience for all.</p>
        </div>

        {/* Day 1 - Sports Day */}
        <div className={styles.section}>
          <h2>Day 1: Sports Day - "Stronger Together, Faster Forever!"</h2>
          <p>
            The first day of <span class="highlight">UDGAM</span> is dedicated to <strong>Sports and Physical Activities</strong> that emphasize the importance of teamwork, 
            perseverance, and sportsmanship. Sports play a pivotal role in shaping a child's character, teaching values like discipline, hard work, and resilience.
        </p>

        <h2>Activities on Sports Day</h2>
        <p>
            The day includes various fun and engaging sports activities designed to bring out the best in every participant. Some of the key events include:
        </p>

        <ul>
            <li><strong>Races:</strong> Sprint, relay, and endurance races that test speed and stamina.</li>
            <li><strong>Mini Shot Put:</strong> Promotes strength and coordination.</li>
            <li><strong>Kho-Kho:</strong> A traditional Indian game that emphasizes agility and strategy.</li>
            <li><strong>Tug of War:</strong> Builds teamwork and unity.</li>
            <li><strong>Musical Chair:</strong> A fun and interactive game that enhances alertness.</li>
            <li><strong>Dodge Ball:</strong> Improves reflexes and teamwork.</li>
        </ul>

        <h2>Impact of Sports Day</h2>
        <p>
            Sports not only keep the body fit but also nurture qualities like <strong>leadership, decision-making, and patience</strong>. Through these activities, 
            <span class="highlight">UDGAM</span> encourages children to step out of their comfort zones, take up challenges, and develop a never-give-up attitude. 
            Parents, teachers, and volunteers come together to cheer for the participants, making the event lively and full of positive energy.
        </p>
         
        </div>

        {/* Day 2 - Technical Event */}
        <div className={styles.section}>
          <h2>Day 2: Technical Event - "Inspiring Innovation and Creativity"</h2>
        
        
        <p>
            The second day of <span class="highlight">UDGAM</span> focuses on <strong>Technology and Innovation</strong>, providing a platform for young minds to showcase their talents and creativity. 
            In today's fast-paced digital era, it is essential to equip children with technical knowledge and problem-solving skills.
        </p>

        <h2>Activities on Technical Day</h2>
        <p>
            The technical event comprises a variety of activities aimed at promoting critical thinking and innovation:
        </p>

        <ul>
            <li><strong>Crossword:</strong> Enhances vocabulary and logical thinking.</li>
            <li><strong>Quiz Competition:</strong> Tests general knowledge and technical aptitude.</li>
            <li><strong>Drawing and Art Competition:</strong> Encourages creativity and visual storytelling.</li>
            <li><strong>Essay-Writing:</strong> Develops articulation and expression of ideas.</li>
            <li><strong>Spell-Bee:</strong> Enhances language skills and confidence.</li>
            <li><strong>Science Projects:</strong> Encourages exploration and innovation in science and technology.</li>
        </ul>

        <h2>Importance of Technical Day</h2>
        <p>
            Technical events allow students to explore new technologies, collaborate with peers, and learn from industry experts. 
            Through workshops and hands-on challenges, participants get a glimpse of real-world applications, motivating them to pursue careers in 
            <span class="highlight">STEM (Science, Technology, Engineering, and Mathematics)</span>.
        </p>

        <p>
            Parmarth believes that nurturing a child's technical curiosity can lead to groundbreaking ideas and solutions that benefit society. 
            UDGAM serves as the perfect platform to ignite this curiosity and drive innovation.
        </p>
        </div>

        {/* Day 3 - Cultural Event */}
        <div className={styles.section}>
          <h2>Day 3: Cultural Event - "Celebrating Heritage and Diversity"</h2>
        
        <p>
            The third and final day of <span class="highlight">UDGAM</span> is a <strong>Cultural Extravaganza</strong> that celebrates diversity, heritage, and traditions. 
            Culture is the heartbeat of society, reflecting who we are and where we come from. Through music, dance, art, and storytelling, 
            children and communities come together to celebrate the values that unite them.
        </p>

        <h2>Activities on Cultural Day</h2>
        <p>
            The cultural event features an exciting array of performances that showcase talent and creativity:
        </p>

        <ul>
            <li><strong>Dance Performances:</strong> A fusion of classical, folk, and contemporary dance forms.</li>
            <li><strong>Drama and Skits:</strong> Reflect social issues and cultural stories.</li>
            <li><strong>Singing Competition:</strong> Showcases melodious voices and musical talent.</li>
            <li><strong>Ramp Walk:</strong> Allows participants to express confidence and creativity through fashion.</li>
        </ul>

        <h2>Significance of Cultural Day</h2>
        <p>
            Cultural events play a crucial role in fostering a sense of <strong>pride and belonging</strong>. They provide a platform for children to express their creativity, 
            appreciate different cultures, and develop a sense of unity in diversity. Through these performances, 
            <span class="highlight">UDGAM</span> promotes harmony, empathy, and a deeper understanding of our rich heritage.
        </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Udgam;