import React, { useEffect, useState } from "react";
import styles from "./Classes.module.css";
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
          className={`${styles.slider} ${isSliding ? styles.slideTransition : ""
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

const Classes = () => {
  const images = [
    "/img/Classes/11.png",
    "/img/Classes/22.png",
    "/img/Classes/33.png",
    "/img/Classes/44.png",
    "/img/Classes/5.png",
    "/img/Classes/6.png",
    "/img/Classes/7.png",
    "/img/Classes/8.png",
  ];
  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "130px" }} className={styles.body}>
        <div className={styles.section}>
          <InfiniteScroll images={images} />
        </div>
        {/* History Section */}
        <div className={`${styles.subsection} ${styles.card}`}>
          <h2 className={styles.subheading1 }>History</h2>
          <p className={styles.text1}>
            Well-structured LT classes of today trace their roots back to 2015, when a few enthusiastic students decided to teach children from nearby slums. They started by conducting open-ground sessions and slowly built trust within the community. As more children joined, the Director of the institute granted access to Lecture Theatres (LTs) on campus. Today, over 150 children attend daily evening classes, where volunteers—college students—become educators after their regular academic hours.
          </p>
        </div>

        {[
          {
            title: 'Group 0',
            text: 'For complete beginners who have never been exposed to reading or writing before.',
            image: '/img/Classes/group0.png',
          },
          {
            title: 'Group 0+',
            text: 'Includes children who know basic alphabets, numbers, and can do simple additions or subtractions.',
            image: '/img/Classes/group0+.png',
          },
          {
            title: 'Group 1',
            text: 'For kids who are at 3rd-grade level. They understand multiplication, division, and can read and write simple sentences.',
            image: '/img/Classes/33.png',
          },
          {
            title: 'Group JNV',
            text: 'Focused on preparing students from classes 4 to 8 for the Jawahar Navodaya Vidyalaya entrance exams with competitive resources.',
            image: '/img/Classes/5.png',
          },
          {
            title: 'Group 2',
            text: 'For students from class 9 to 12, receiving advanced academic support and guidance tailored to their school curriculum.',
            image: '/img/Classes/6.png',
          },
          {
            title: 'Group GE (Girl Education)',
            text: 'A special group for girls who are unable to attend school due to family or social limitations, aiming to empower them through basic education.',
            image: '/img/Classes/7.png',
          }
        ].map((item, index) => (
          <div
            className={`${styles.subsection} ${styles.card} ${index % 2 === 0 ? styles.leftAligned : styles.rightAligned}`}
            key={index}
          >
            <div>
              <h2 className={styles.subheading}>{item.title}</h2>
              <p className={styles.text}>{item.text}</p>
            </div>
            <img src={item.image} alt={item.title} className={styles.sectionImage} />
          </div>
        ))}


        {[
          {
            title: 'Books',
            text: 'Customized books are created for every group based on their level. These books ensure continuity of learning despite different volunteer rotations.',
            image: '/img/Classes/1.png',
          },
          {
            title: 'Stationery',
            text: 'Essential supplies like slates, sketch pens, pencils, and notebooks are provided from club funds to support learning.',
            image: '/img/Classes/3.png',
          },
          {
            title: 'Homework',
            text: 'Daily homework is assigned and checked the next day to ensure consistency and revision.',
            image: '/img/Classes/8.png',
          },
          {
            title: 'Projectors and Speakers',
            text: 'Audio-visual learning using projectors enhances understanding—used for storytelling in junior groups and science topics in senior ones.',
            image: '/img/Classes/4.png',
          },
          {
            title: 'Learn with Fun',
            text: 'Fun and creative activities are held every Sunday to make learning enjoyable and more effective.',
            image: '/img/Classes/1.png',
          },
          {
            title: 'Special Sessions',
            text: 'Focused sessions on cleanliness, career awareness, and personal development are conducted regularly.',
            image: '/img/Classes/2.png',
          },
          {
            title: 'Tests',
            text: 'Regular assessments are conducted to track progress, and top performers are rewarded to keep them motivated.',
            image: '/img/Classes/8.png',
          }
        ].map((item, index) => (
          <div
            className={`${styles.subsection} ${styles.card} ${index % 2 === 0 ? styles.leftAligned : styles.rightAligned}`}
            key={index}
          >
            <div>
              <h2 className={styles.subheading}>{item.title}</h2>
              <p className={styles.text}>{item.text}</p>
            </div>
            <img src={item.image} alt={item.title} className={styles.sectionImage} />
          </div>
        ))}


      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Classes;
