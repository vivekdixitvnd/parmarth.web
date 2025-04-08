import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./LandingPage.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import TaskCard from "../../components/TaskCard/TaskCard";
import Footer from "../../components/Footer/Footer";
import HelpCard from "../../components/HelpCard/HelpCard";

import { useState, useEffect, useRef } from 'react';

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}+</span>;
};

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div id="parallax" className={styles.parallax}>
        <div className={styles.parmarth} id="parallax">
          परमार्थ<span style={{ color: "#277bc0" }}>.</span>
        </div>
        <div style={{ color: "#fff", fontSize: "1.6rem" }}>
          The Social Club of IET Lucknow
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles["top-section"]}>
          <div className={styles.about}>
            <div style={{ lineHeight: "1" }}>
              <div style={{ fontSize: "3rem", fontWeight: "500" }}>
                Parmarth
              </div>
              <div style={{ fontSize: "1.2rem", color: "#535353" }}>
                Since 2015
              </div>
            </div>
            <br />
            <div
              style={{
                color: "#277bc0",
                fontSize: "1.2rem",
                fontWeight: "500",
              }}
            >
              Kind words can be short and easy to speak, but their echoes are
              truly endless.
            </div>
            <br />
            <div>
              Small group of thoughtfull people can change the world and indeed
              optimism is the faith that leads to achievements." Welcome to the
              Parmarth, the social club of Institute of Engineering and
              Technology Lucknow (popularly known as IET Lucknow). It aims in
              upbringing positive change in a section of society which is often
              neglected or least cared about. A sufficiently large section of
              people of metropolitan cities reside in slums who are of least
              priority in our day to day busy schedule. Children residing in
              slums roam here and there and finally fell into deep well of
              illiteracy, unemployment, below average living standards,
              pitifulness and misery. As it is said, Children are future of
              nation, but we often tend to neglect a major portion of that
              future which never seemed so bright. At Parmarth, we put an effort
              against same. Children are like earthen pots that can be molded
              easily with a tool called education. Education has all the
              capabilities to change one's future. So, we at Parmarth try to
              shape some of them using this tool.
            </div>
          </div>

          <img
            src="img/children-studying.jpeg"
            alt="children-studying"
            className={styles.children}
          />
        </div>




        <div className={styles.helpSection}>
          {/* New Heading Section */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How could you help</h2>

          </div>
          <hr className={styles.hr} />

          {/* Existing Carousel */}
          <div className={styles.carouselContainer}>
            <Carousel
              autoPlay
              infiniteLoop
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              centerMode
              centerSlidePercentage={80}
              emulateTouch
              swipeable
              transitionTime={100}
              interval={3000}
            >
              {/* Donation Card */}
              <div className={styles.carouselItem}>
                <HelpCard
                  src="/img/Donate11.png"
                  title="Give Donation"
                  description="Happiness doesn't result from what we get, but from what we give."
                  cardClass="donationCard"
                  primaryBtnText="Donate Now"
                  primaryBtnClass="donationPrimaryBtn"
                  secondaryBtnText="Why Donate?"
                  secondaryBtnClass="donationSecondaryBtn"
                  bgColor=''
                />
              </div>



              {/* Sponsorship Card */}
              <div className={styles.carouselItem}>
                <HelpCard
                  src="/img/_Sponsor_a_Child.png"
                  title="Sponsor a Child"
                  description="Multiply is rule light dominion given midst a living i set every bring also of rule Set light fifth best bearing."
                  cardClass="sponsorCard"
                  primaryBtnText="Become a Sponsor"
                  primaryBtnClass="sponsorPrimaryBtn"
                  secondaryBtnText="Child Stories"
                  secondaryBtnClass="sponsorSecondaryBtn"
                  bgColor=''
                />
              </div>

              {/* Medical Help Card */}
              <div className={styles.carouselItem}>
                <HelpCard
                  src="/img/Medical_help.png"
                  title="Medical Help"
                  description="As we lose ourselves in the service of others, we discover our own lives and our own happiness."
                  cardClass="medicalCard"
                  primaryBtnText="Support Healthcare"
                  primaryBtnClass="medicalPrimaryBtn"
                  secondaryBtnText="Our Clinics"
                  secondaryBtnClass="medicalSecondaryBtn"
                  bgColor=''
                />
              </div>
            </Carousel>
          </div>
        </div>



        <div className={styles.works}>
          <div className={styles["our-wings"]}>Our Wings</div>
          <div style={{ color: "#535353" }}>
            We Operate our task in four categories
          </div>
          <hr className={styles.hr} />
          <div className={styles.tasks}>
            <TaskCard task="Classes" imgUrl="img/Education LT (500 x 350 px).png" url="/classes" />
            <TaskCard task="Girls Education" imgUrl="img/Girl_Education.png" url="/ge" />
            <TaskCard
              task="Schooling"
              imgUrl="img/Schooling_RTE.png"
              url="/schooling"
            />
            <TaskCard task="Social Service" imgUrl="img/Social_Services.png" />
          </div>
        </div>

        <div className={styles.statsSection}>
          <div className={styles["our-wings"]}>Our Impact</div>
          <hr className={styles.hr} />
          <div className={styles.statsContainer}>


            <div className={styles.statItem}>
              <div className={styles.statNumber}><Counter end={6} /></div>
              <div className={styles.statTitle}>SLUM AREAS</div>
              <div className={styles.statDescription}>
                Contribute through financial<br />
                support and volunteer engagement.<br />
              </div>
            </div>



            <div className={styles.statItem}>
              <div className={styles.statNumber}><Counter end={200} /></div>
              <div className={styles.statTitle}>STUDENTS</div>
              <div className={styles.statDescription}>
                Hundreds of students <br />
                are studying in our club.<br />
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statNumber}><Counter end={300} /></div>
              <div className={styles.statTitle}>Families</div>
              <div className={styles.statDescription}>
                Providing<br />
                warm clothes to<br />
                underprivileged families annually
              </div>
            </div>


            <div className={styles.statItem}>
              <div className={styles.statNumber}><Counter end={400} /></div>
              <div className={styles.statTitle}>RTE ADMISSION</div>
              <div className={styles.statDescription}>
                Students of <br />
                parmarth have got<br />
                admission in various private schools
              </div>
            </div>

          </div>
        </div>




        <div className={styles.carousel}>
          <div className={styles["gallery"]}>Gallery</div>
          <hr className={styles.hr} style={{ width: "30px", marginTop: "0" }} />
          <div style={{ maxWidth: "1366px" }}>
            <div className={styles.carouselWrapper}>
              <Carousel
                autoPlay
                infiniteLoop
                showArrows={false}
                emulateTouch
                height="500px"
                showStatus={false}
                showThumbs={false}
                transitionTime={800}
                stopOnHover={false}

              >
                <div>
                  <img
                    src="img/1.jpeg"
                    alt="carousel"
                    className={styles["carousel-img"]}
                  />
                </div>
                <div>
                  <img
                    src="img/2.jpeg"
                    alt="carousel"
                    className={styles["carousel-img"]}
                  />
                </div>
                <div>
                  <img
                    src="img/3.jpg"
                    alt="carousel"
                    className={styles["carousel-img"]}
                  />
                </div>
                <div>
                  <img
                    src="img/4.jpeg"
                    alt="carousel"
                    className={styles["carousel-img"]}
                  />
                </div>
                <div>
                  <img
                    src="img/5.jpeg"
                    alt="carousel"
                    className={styles["carousel-img"]}
                  />
                </div>

              </Carousel>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default LandingPage;