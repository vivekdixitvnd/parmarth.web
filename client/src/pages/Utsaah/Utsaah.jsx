import React, { useEffect, useState } from "react";
import styles from "./Utsaah.module.css";
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

        {/* UTSAAH Introduction */}
        <div className={styles.section}>
          <h1>UTSAAH - Inter NGO's Competition</h1>
          <p>UTSAAH is an inspiring and vibrant 3-day Inter-NGO competition organized by Parmarth, where underprivileged students from various NGOs come together to showcase their talents, creativity, and teamwork. This event is not just a competition but a celebration of resilience, dreams, and possibilities. It aims to empower and uplift young minds by providing them with a platform to explore their potential and gain confidence through diverse activities. UTSAAH nurtures the dreams of these children, instilling in them a sense of achievement and self-worth, giving them the courage to dream beyond their limitations.</p>

        <h2>The Vision Behind UTSAAH</h2>
        <p>UTSAAH was conceived with the belief that every child, regardless of their background, deserves an opportunity to thrive. Many underprivileged children often lack exposure to platforms where they can express themselves, showcase their talents, and build confidence. UTSAAH seeks to bridge this gap by offering them a stage where they can shine and feel valued. By fostering a sense of belonging and encouraging participation in various events, UTSAAH helps these children break the barriers of societal constraints and realize their full potential.</p>

        <p>The name UTSAAH, meaning "enthusiasm" or "passion," perfectly encapsulates the spirit of the event. It symbolizes the energy, excitement, and hope that these children bring with them, eager to learn, explore, and excel.</p>

        <h2>A Journey of Exploration and Growth</h2>
        <p>UTSAAH is not just about winning prizes — it’s about the journey of self-discovery and growth. For most of these children, the event is a first-of-its-kind experience, allowing them to participate in activities that challenge their thinking, creativity, and teamwork.</p>

        <h2>Why UTSAAH Matters?</h2>
        <p>Many underprivileged children rarely get opportunities to step outside their everyday struggles and experience an environment where they are appreciated and encouraged. UTSAAH gives them this chance by:</p>

        <p><span class="highlight">Boosting Confidence:</span> Participating in various activities and receiving appreciation boosts the children’s self-esteem and motivates them to dream bigger.</p>
        <p><span class="highlight">Developing Life Skills:</span> Through teamwork, communication, and problem-solving activities, children develop essential skills that prepare them for future challenges.</p>
        <p><span class="highlight">Encouraging Healthy Competition:</span> Friendly competition teaches them to handle success and failure gracefully, instilling values of perseverance and sportsmanship.</p>
        <p><span class="highlight">Building a Sense of Community:</span> Interacting with children from different NGOs creates a sense of unity, belonging, and shared learning, which fosters empathy and understanding.</p>
    
        </div>

        {/* Day 1 - Sports Day */}
        <div className={styles.section}>
          <h2>Day 1: Sports Day - "United in Strength, Unmatched in Spirit!"</h2>
          
        <p>
            The first day of <span class="highlight">UTSAAH</span> is dedicated to <strong>Sports and Physical Activities</strong>,
            emphasizing the importance of teamwork, discipline, and perseverance. For underprivileged children, participating in such events
            boosts their morale and instills confidence, teaching them the value of hard work and determination.
        </p>

        <h2>Activities on Sports Day</h2>
        <p>The day features a variety of thrilling and engaging sports activities that encourage physical fitness and promote teamwork:</p>
        <ul>
            <li> <strong>Races:</strong> Sprint, relay, and endurance races that test speed and stamina.</li>
            <li> <strong>Mini Shot Put:</strong> Enhances physical strength and coordination.</li>
            <li> <strong>Kho-Kho:</strong> A traditional Indian game that promotes agility, strategy, and quick decision-making.</li>
            <li> <strong>Tug of War:</strong> Builds teamwork, unity, and collective strength.</li>
            <li> <strong>Musical Chair:</strong> A fun-filled game that sharpens alertness and reflexes.</li>
            <li> <strong>Dodge Ball:</strong> Improves coordination, reflexes, and strategic thinking.</li>
        </ul>

        <h2>Impact of Sports Day</h2>
        <p>
            Sports provide a powerful platform for underprivileged children to explore their capabilities, push their limits, and emerge stronger.
            <span class="highlight">UTSAAH</span> encourages these young minds to break barriers, develop resilience, and build a never-give-up attitude.
            The cheers and support from volunteers, teachers, and community members make the event lively and inspire the children to give their best.
        </p>
        </div>

        {/* Day 2 - Technical Event */}
        <div className={styles.section}>
          <h2>Day 2: Technical Event - "Inspiring Innovation and Problem Solving"</h2>
        
        <p>
            The second day of <span class="highlight">UTSAAH</span> focuses on <strong>Technology and Innovation</strong>, where underprivileged children get an opportunity 
            to explore the world of technology and critical thinking. In today's digital age, providing access to technical knowledge can bridge the gap 
            and empower these children to dream big.
        </p>

        <h2>Activities on Technical Day</h2>
        <p>The day comprises a variety of activities aimed at enhancing problem-solving skills and nurturing creativity:</p>
        <ul>
            <li> <strong>Crossword:</strong> Enhances vocabulary, logical thinking, and analytical skills.</li>
            <li> <strong>Quiz Competition:</strong> Tests general knowledge, critical thinking, and technical aptitude.</li>
            <li> <strong>Drawing and Art Competition:</strong> Encourages visual storytelling and imaginative expression.</li>
            <li> <strong>Essay-Writing:</strong> Develops articulation and expression of ideas on relevant topics.</li>
            <li> <strong>Spell-Bee:</strong> Strengthens language skills and boosts confidence.</li>
            <li> <strong>Science Projects:</strong> Inspires innovation and fosters curiosity in science and technology.</li>
        </ul>

        <h2>Importance of Technical Day</h2>
        <p>
            For underprivileged children, exposure to technical knowledge opens doors to a world of possibilities.
            <span class="highlight">UTSAAH</span> equips them with the necessary tools to think innovatively and apply their skills to solve real-world problems.
            Through workshops and interactive sessions, these children get a glimpse of future opportunities, motivating them to pursue careers in
            <strong>STEM (Science, Technology, Engineering, and Mathematics)</strong>.
        </p>
        </div>

        {/* Day 3 - Cultural Event */}
        <div className={styles.section}>
          <h2>Day 3: Cultural Event - "Embracing Diversity and Celebrating Heritage"</h2>
        <p>
            The final day of <span class="highlight">UTSAAH</span> is a <strong>Cultural Extravaganza</strong>, where children from different NGOs celebrate 
            diversity, heritage, and traditions through music, dance, and art. For many underprivileged children, this day becomes a celebration of their 
            identities and a platform to express their creativity and emotions.
        </p>

        <h2>Activities on Cultural Day</h2>
        <p>The cultural event features an exciting range of performances that highlight the rich diversity and artistic talents of the participants:</p>
        <ul>
            <li> <strong>Dance Performances:</strong> A beautiful fusion of classical, folk, and contemporary dance forms.</li>
            <li> <strong>Drama and Skits:</strong> Reflecting social issues and cultural stories through engaging performances.</li>
            <li> <strong>Singing Competition:</strong> Showcases melodious voices and musical talent.</li>
            <li> <strong>Ramp Walk:</strong> Provides an opportunity for children to express confidence and creativity through fashion.</li>
        </ul>

        <h2>Significance of Cultural Day</h2>
        <p>
            Cultural events offer a platform for underprivileged children to develop self-expression, confidence, and a sense of belonging.
            <span class="highlight">UTSAAH</span> celebrates diversity and promotes inclusion by bringing together children from different backgrounds, 
            allowing them to learn from one another and appreciate the beauty of various cultures. These performances not only instill pride 
            but also create lasting memories and positive experiences.
        </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Udgam;