import React, { useEffect, useState } from "react";
import styles from "./Ummeed.module.css";
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

const Ummeed = () => {
  const images = [
    "/img/Ummeed/1.png",
    "/img/Ummeed/2.png",
    "/img/Ummeed/3.png",
    "/img/Ummeed/4.png",
    "/img/Ummeed/5.png",
  ];

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.section}>
          <InfiniteScroll images={images} />
        </div>

        {/* UMMEED Introduction */}
        <div className={styles.section}>
          <h1>UMMEED - "A Ray of Hope for Underprivileged Children"</h1>
          <p><strong>UMMEED</strong>, often known as the <span class="highlight">Beggar's Event</span>, is a heartwarming initiative by Parmarth that focuses on transforming the lives of underprivileged children who are forced to beg at traffic signals and streets. These children, who spend their days in harsh conditions, are often deprived of basic rights such as education, nutrition, and dignity. UMMEED aims to change this narrative by offering them a platform where they can learn, grow, and envision a brighter tomorrow.</p>
    

    
        <h2>The Vision Behind UMMEED</h2>
        <p>The name <strong>UMMEED</strong> means “hope,” and this event embodies that hope for children who are caught in the vicious cycle of poverty and illiteracy. Parmarth believes that every child, regardless of their background, has the right to education and an opportunity to lead a dignified life. The objective of UMMEED is not only to provide these children with knowledge but also to instill in them a love for learning, empowering them to dream of a future beyond begging.</p>
    
        </div>

        {/* How UMMEED works */}
        <div className={styles.section}>
        <h2>How UMMEED Works</h2>
        <p>UMMEED is conducted in an <strong>open area</strong>, often near the very places where these children beg. The goal is to <strong>engage with them in their familiar environment</strong>, making it easier for them to trust and participate. Here’s how the event unfolds:</p>

        <h3>1. Gathering and Interaction</h3>
        <p>Volunteers reach out to children begging at traffic signals, markets, and public places. These children are gently encouraged to come and join a safe, interactive space where they can experience something different. Volunteers engage with them through friendly conversations, making them feel valued and accepted.</p>

        <h3>2. Basic Education and Awareness</h3>
        <p>Once the children settle down, they are introduced to basic concepts of education through fun and engaging activities. The learning session, lasting <strong>1 to 2 hours</strong>, includes:</p>
        <ul>
            <li>Basic reading and writing skills</li>
            <li>Introduction to numbers and alphabets</li>
            <li>Interactive storytelling sessions</li>
            <li>Drawing and creative activities to stimulate imagination</li>
        </ul>

        <h3>3. Motivation and Guidance</h3>
        <p>Along with teaching, a significant part of UMMEED involves <strong>motivating these children</strong> to see the value of education in their lives. Volunteers share inspiring stories and real-life examples to show how education can change lives.</p>

        <h3>4. Nutritious Meal Distribution</h3>
        <p>After the learning session, the children are provided with a <strong>healthy and nutritious meal</strong>. This not only fulfills their immediate hunger but also encourages them to come back and participate in future sessions.</p>
    
        </div>

        {/* Impact of Ummeed */}
        <div className={styles.section}>
        <h2>The Broader Impact of UMMEED</h2>
        <p>UMMEED is not just about teaching children — it also creates a <strong>ripple effect</strong> that influences society at large. Since the event takes place in <strong>open public areas</strong>, it attracts the attention of <strong>passersby, local vendors, and residents</strong>.</p>

        <h3>1. Raising Awareness in the Community</h3>
        <p>As people witness these children being taught and nurtured, it challenges societal perceptions about beggars and encourages them to contribute positively.</p>

        <h3>2. Inspiring Volunteerism</h3>
        <p>Many individuals who witness UMMEED in action are inspired to become a part of the change. They realize that making a difference doesn’t require large resources — sometimes, just a little time and effort can transform lives.</p>
        </div>

        {/* UMMEED Matters */}
        <div className={styles.section}>
        <h2>Why UMMEED Matters</h2>
        <p>The impact of UMMEED goes beyond the few hours spent teaching and feeding the children. It sows the seeds of <strong>hope and possibility</strong> in their hearts.</p>

        <h3>Key Outcomes of UMMEED:</h3>
        <ul>
            <li><strong>Instilling a Love for Learning:</strong> Even a brief interaction can spark curiosity and interest in education.</li>
            <li><strong>Building Confidence:</strong> Children gain the confidence to engage with others and express themselves.</li>
            <li><strong>Creating Awareness:</strong> The event encourages people to rethink their attitudes toward street children.</li>
            <li><strong>Fostering Long-Term Impact:</strong> Some of these children, inspired by their experience at UMMEED, may eventually enroll in formal schooling.</li>
        </ul>
        </div>
        {/* The Road Ahead */}
        <div className={styles.section}>
        <h2>The Road Ahead: Sustaining the Spirit of UMMEED</h2>
        <p>While UMMEED creates an immediate impact, the goal is to <strong>sustain this change</strong> by encouraging continuous engagement and providing long-term support. Parmarth envisions expanding this initiative by:</p>
        <ul>
            <li>Creating <strong>regular learning hubs</strong> for street children in various locations</li>
            <li>Partnering with local schools and organizations to <strong>integrate these children into formal education</strong></li>
            <li>Conducting <strong>awareness drives</strong> to inspire more people to contribute toward this noble cause</li>
        </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ummeed;