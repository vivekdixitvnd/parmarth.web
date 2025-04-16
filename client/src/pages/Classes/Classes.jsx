import React from "react";
import styles from "./Classes.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


const Classes = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "150px" }} className={styles.body}>
        {/* History Section */}
        <div className={styles.subsection}>
        <img src="/img/teaching.jpg" alt="LT History" className={styles.image} />
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
            <p className={styles.text}>
              For complete beginners who have never been exposed to reading or writing before.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Group 0+</h2>
            <p className={styles.text}>
              Includes children who know basic alphabets, numbers, and can do simple additions or subtractions.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Group 1</h2>
            <p className={styles.text}>
              For kids who are at 3rd-grade level. They understand multiplication, division, and can read and write simple sentences.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Group JNV</h2>
            <p className={styles.text}>
              Focused on preparing students from classes 4 to 8 for the Jawahar Navodaya Vidyalaya entrance exams with competitive resources.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Group 2</h2>
            <p className={styles.text}>
              For students from class 9 to 12, receiving advanced academic support and guidance tailored to their school curriculum.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Group GE (Girl Education)</h2>
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
            <p className={styles.text}>
              Customized books are created for every group based on their level. These books ensure continuity of learning despite different volunteer rotations.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Stationery</h2>
            <p className={styles.text}>
              Essential supplies like slates, sketch pens, pencils, and notebooks are provided from club funds to support learning.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Homework</h2>
            <p className={styles.text}>
              Daily homework is assigned and checked the next day to ensure consistency and revision.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Projectors and Speakers</h2>
            <p className={styles.text}>
              Audio-visual learning using projectors enhances understanding—used for storytelling in junior groups and science topics in senior ones.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Learn with Fun</h2>
            <p className={styles.text}>
              Fun and creative activities are held every Sunday to make learning enjoyable and more effective.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Special Sessions</h2>
            <p className={styles.text}>
              Focused sessions on cleanliness, career awareness, and personal development are conducted regularly.
            </p>
          </div>

          <div className={styles.subsection}>
            <h2 className={styles.subheading}>Tests</h2>
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
