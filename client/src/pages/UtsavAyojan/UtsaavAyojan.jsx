import React, { useEffect, useState } from "react";
import styles from "./UtsaavAyojan.module.css";
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

const UtsavAyojan = () => {
  const images = [
    "/img/UtsavaAyojan/1.png",
    "/img/UtsavaAyojan/2.png",
    "/img/UtsavaAyojan/3.png",
    "/img/UtsavaAyojan/4.png",
    "/img/UtsavaAyojan/5.png",
  ];

  const festivals = [
    {
      title: "Diwali Celebration",
      description:
        "Parmarth Volunteers organize this special event to celebrate Diwali with the underprivileged, bringing light and joy to their lives.",
      activities: [
        "Distribution of diyas, sweets, and festive essentials",
        "Cultural performances and interactive activities",
        "Bringing festive joy to 120 students from slum areas",
      ],
      impact:
        "25 volunteers create a warm and inclusive celebration, ensuring everyone experiences the true spirit of Diwali.",
      date: "October/November",
      image: "../img/5.jpeg",
    },
    {
      title: "Holi Celebration",
      description:
        "Parmarth joyfully celebrates Holi in slum areas, creating a fun-filled and colorful experience for underprivileged children.",
      activities: [
        "Playing with safe, natural colors",
        "Distribution of festive sweets and snacks",
        "Cultural music and dance performances",
      ],
      impact:
        "40 volunteers bring happiness and unity to 120 students, creating vibrant memories.",
      date: "March",
      image: "../img/3.jpg",
    },
    {
      title: "Children's Day",
      description:
        "Celebrated in LT classrooms to honor Pt. Jawaharlal Nehru's birth anniversary and uplift underprivileged children.",
      activities: [
        "Educational games and competitions",
        "Motivational talks and storytelling",
        "Distribution of gifts and school supplies",
      ],
      impact:
        "25 volunteers create joyful experiences for 120 students, with 200 visits recorded.",
      date: "November 14",
      image: "../img/6.jpeg",
    },
    {
      title: "Republic Day",
      description:
        "A patriotic celebration that educates children about India's constitutional values.",
      activities: [
        "Flag hoisting ceremony",
        "Patriotic songs and cultural performances",
        "Speeches about national heroes",
      ],
      impact:
        "50 volunteers inspire 120 students with messages of patriotism and unity.",
      date: "January 26",
      image: "../img/1.jpeg",
    },
    {
      title: "Environment Day",
      description:
        "An eco-awareness initiative that educates children about environmental protection.",
      activities: [
        "Tree plantation drives",
        "Cleanliness campaigns",
        "Poster-making competitions",
        "Eco-awareness discussions",
      ],
      impact:
        "25 volunteers engage 120 students in sustainability activities, with 200 visits recorded.",
      date: "June 5",
      image: "../img/4.jpeg",
    },
    {
      title: "Yoga Day",
      description:
        "Promotes physical and mental well-being among children through yoga practice.",
      activities: [
        "Group yoga sessions",
        "Breathing exercises and meditation",
        "Health and wellness discussions",
      ],
      impact:
        "25 volunteers introduce 120 students to valuable tools for health and mindfulness.",
      date: "June 21",
      image: "../img/2.jpeg",
    },
    {
      title: "Independence Day",
      description:
        "A vibrant celebration that teaches children about India's freedom struggle.",
      activities: [
        "Flag hoisting with national anthem",
        "Cultural performances",
        "Stories of freedom fighters",
      ],
      impact:
        "50 volunteers foster national pride among 120 students through inspiring activities.",
      date: "August 15",
      image: "../img/5.jpeg",
    },
  ];

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.section}>
          <InfiniteScroll images={images} />
        </div>

        {/* Introduction Section */}
        <div className={styles.section}>
          <h1>Festival Celebrations at Parmarth</h1>
          <p>
            At Parmarth, we believe festivals are powerful opportunities to
            spread joy, educate, and strengthen community bonds. Throughout the
            year, we organize various celebrations that bring happiness to
            underprivileged children while teaching important cultural, social,
            and environmental values.
          </p>
          <p>
            Our festival celebrations engage children from slum areas through
            interactive activities, cultural performances, and educational
            programs. Each event is designed to be both fun and meaningful,
            creating lasting memories while imparting valuable lessons.
          </p>
        </div>

        {/* Festival Highlights Section */}
        <div className={styles.section}>
          <h2>Our Festival Highlights</h2>
          <div className={styles.highlightsContainer}>
            <div className={styles.highlightCard}>
              <h3>120+</h3>
              <p>Children impacted per event</p>
            </div>
            <div className={styles.highlightCard}>
              <h3>25-50</h3>
              <p>Dedicated volunteers per celebration</p>
            </div>
            <div className={styles.highlightCard}>
              <h3>7+</h3>
              <p>Major festivals celebrated annually</p>
            </div>
            <div className={styles.highlightCard}>
              <h3>200+</h3>
              <p>Total visits for recurring events</p>
            </div>
          </div>
        </div>

        {/* All Festivals Section */}
        <div className={styles.section}>
          <h2>Our Celebrations</h2>
          <p>
            Here are the major festivals we celebrate with underprivileged
            children throughout the year:
          </p>

          <div className={styles.festivalGrid}>
            {festivals.map((festival, index) => (
              <div key={index} className={styles.festivalCard}>
                <div className={styles.festivalImage}>
                  <img src={festival.image} alt={festival.title} />
                </div>
                <div className={styles.festivalContent}>
                  <h3>{festival.title}</h3>
                  <p className={styles.festivalDate}>{festival.date}</p>
                  <p>{festival.description}</p>
                  <h4>Activities:</h4>
                  <ul>
                    {festival.activities.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                  <h4>Impact:</h4>
                  <p>{festival.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UtsavAyojan;
