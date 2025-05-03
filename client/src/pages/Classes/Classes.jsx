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
        <div className={styles.subsection}>
          <h2 className={styles.subheading}>History</h2>
          <p className={styles.text}>
            Well-structured LT classes of today trace their roots back to 2015, when a few enthusiastic students decided to teach children from nearby slums. They started by conducting open-ground sessions and slowly built trust within the community. As more children joined, the Director of the institute granted access to Lecture Theatres (LTs) on campus. Today, over 150 children attend daily evening classes, where volunteers—college students—become educators after their regular academic hours.
          </p>
        </div>

        {/* Groups in LT Section */}
        <div className={styles.section}>
          <h1 className={styles.heading}>Groups in LT</h1>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Group 0</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              For complete beginners who have never been exposed to reading or writing before.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Group 0+</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              Includes children who know basic alphabets, numbers, and can do simple additions or subtractions.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Group 1</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              For kids who are at 3rd-grade level. They understand multiplication, division, and can read and write simple sentences.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Group JNV</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              Focused on preparing students from classes 4 to 8 for the Jawahar Navodaya Vidyalaya entrance exams with competitive resources.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Group 2</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              For students from class 9 to 12, receiving advanced academic support and guidance tailored to their school curriculum.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Group GE (Girl Education)</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              A special group for girls who are unable to attend school due to family or social limitations, aiming to empower them through basic education.
            </p>
          </div>
        </div>

        {/* Tools in LT Section */}
        {/* Tools in LT Section */}
        <div className={styles.section}>
          <h1 className={styles.heading}>Tools Used in LT Classes</h1>
          

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Books</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              Customized books are created for every group based on their level. These books ensure continuity of learning despite different volunteer rotations.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Stationery</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              Essential supplies like slates, sketch pens, pencils, and notebooks are provided from club funds to support learning.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Homework</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              Daily homework is assigned and checked the next day to ensure consistency and revision.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Projectors and Speakers</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              Audio-visual learning using projectors enhances understanding—used for storytelling in junior groups and science topics in senior ones.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Learn with Fun</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              Fun and creative activities are held every Sunday to make learning enjoyable and more effective.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Special Sessions</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              Focused sessions on cleanliness, career awareness, and personal development are conducted regularly.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Tests</h2>
            <img src="/img/Classes/1.png" alt="Group 0" className={styles.sectionImage} />
            <p className={styles.text}>
              Regular assessments are conducted to track progress, and top performers are rewarded to keep them motivated.
            </p>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Classes;
