import React, { useEffect, useState } from "react";
import styles from "./Muskan.module.css";
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

const Muskan = () => {
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
          <h1>Muskan - The Distribution Event at Parmarth</h1>
          <p>
            Muskan is one of Parmarth’s most impactful initiatives, launched
            each year before winter to support underprivileged families,
            children, and the elderly who struggle to stay warm during the harsh
            cold season. This initiative is not just about distributing
            clothes—it’s about restoring dignity, bringing hope, and ensuring
            that no one suffers due to lack of warmth.
          </p>

          <h2>Key Highlights of Muskan</h2>
          <ul>
            <li>
              <strong>Community-Driven Impact:</strong> Muskan is led by
              Parmarth volunteers, students, and social workers who come
              together to collect, sort, and distribute winter essentials to the
              needy.
            </li>
            <li>
              <strong>Expanding Reach Every Year:</strong> What started as a
              small effort has now grown into a large-scale movement, covering
              multiple localities and reaching thousands of people.
            </li>
            <li>
              <strong>Clothing as a Basic Right:</strong> We believe that
              staying warm should not be a privilege but a right, and we work
              tirelessly to make this a reality for as many families as
              possible.
            </li>
            <li>
              <strong>Empowering the Next Generation:</strong> Students from
              marginalized backgrounds also actively participate, making them
              aware of the importance of social responsibility and kindness.
            </li>
          </ul>
        </div>

        {/* Day 1 - Sports Day */}
        <div className={styles.section}>
          <h2>The Purpose Behind Muskan</h2>
          <p>
            India experiences extreme weather conditions, and winter can be
            particularly harsh for those living in slums, roadside shelters, and
            underprivileged communities. As temperatures drop, thousands of
            people, including children, elderly individuals, and daily wage
            workers, struggle to stay warm due to the lack of proper clothing
            and shelter. Many cannot afford even a single warm layer to protect
            themselves from the biting cold, making them vulnerable to severe
            illnesses such as pneumonia, hypothermia, and respiratory
            infections.
          </p>
          <p>
            Through Muskan, we aim to bridge this gap by providing winter
            essentials like blankets, sweaters, jackets, and woolens to those
            who need them the most. However, Muskan is not just about
            distributing clothes—it is about ensuring dignity, spreading warmth,
            and instilling a sense of hope in those who have been battling harsh
            realities every day. By offering these essentials, we are not just
            providing physical comfort but also emotional relief, assuring them
            that they are not forgotten and that society cares for their
            well-being.
          </p>
          <p>
            The initiative also fosters a culture of empathy and responsibility
            among people who are in a position to help. It encourages
            individuals, schools, colleges, and organizations to contribute in
            any way they can, whether through donations or volunteering efforts.
            Muskan is built on the foundation of collective efforts, where every
            small contribution makes a significant difference in someone's life.
          </p>
          <p>
            Over the years, Muskan has grown into a widespread movement,
            touching lives across various localities. What started as a small
            initiative has now become a mission to ensure that no one suffers
            due to the cold. Each winter, the campaign expands its reach,
            striving to help more families and bring smiles to those in need.
          </p>
          <p>
            Warmth is not just about physical comfort; it is about kindness,
            love, and care. Through Muskan, we aspire to turn winter from a
            season of struggle into a time of generosity and togetherness.
          </p>
        </div>

        {/* Day 2 - Technical Event */}
        <div className={styles.section}>
          <h2>Muskan’s Impact Over the Years</h2>
          <ul>
            <li>
              <strong>Thousands of Lives Touched:</strong> Each year, Muskan
              distributes not just hundreds but thousands of blankets, warm
              clothes, and essential winter gear to children, elderly people,
              and families in need. With each passing year, our outreach
              expands, ensuring that no one is left out in the cold.
            </li>
            <li>
              <strong>Collaborations & Partnerships:</strong> Muskan has grown
              stronger with the support of local communities, schools,
              universities, corporate sponsors, and NGOs. These collaborations
              have allowed us to reach remote and underserved areas, maximizing
              the initiative’s impact.
            </li>
            <li>
              <strong>Empowering Volunteers & Youth:</strong> The campaign is
              largely driven by young volunteers who actively participate in
              collection drives, sorting donated items, and organizing
              distribution events. Their involvement not only strengthens the
              initiative but also instills a deep sense of social responsibility
              and compassion.
            </li>
            <li>
              <strong>Quality Over Quantity:</strong> Muskan ensures that every
              donated item is in good condition, clean, and suitable for use. We
              believe that dignity matters as much as warmth, which is why we
              carefully inspect and package each contribution before
              distribution.
            </li>
            <li>
              <strong>Emergency Assistance During Harsh Winters:</strong> In
              times of extreme cold waves, Muskan steps up its efforts by
              conducting emergency relief drives, ensuring that the most
              vulnerable, such as homeless individuals and laborers, receive
              immediate protection against the cold.
            </li>
            <li>
              <strong>Beyond Material Support:</strong> Muskan is not just about
              providing clothing; it is about creating an atmosphere of care and
              compassion. Along with distribution drives, we organize community
              interactions, encouraging people to share stories, connect with
              volunteers, and experience a sense of belonging.
            </li>
            <li>
              <strong>Spreading Smiles Beyond Winter:</strong> The impact of
              Muskan goes far beyond the winter season. The initiative fosters a
              culture of kindness, encouraging more people to be mindful of
              social issues and take proactive steps toward helping the less
              fortunate throughout the year.
            </li>
            <li>
              <strong>Long-Term Vision:</strong> With each successful year,
              Muskan moves closer to its long-term vision of ensuring that no
              individual has to endure winter without protection. We aim to
              expand the initiative by setting up year-round donation centers,
              launching digital campaigns for wider engagement, and working
              towards policy-level changes for the welfare of the homeless.
            </li>
          </ul>
        </div>

        {/* Day 3 - Cultural Event */}
        <div className={styles.section}>
          <h2>How Can You Contribute?</h2>
          <ul>
            <li>
              <strong>Donate Warm Clothes & Blankets:</strong> Your gently used
              or new woolens, jackets, blankets, socks, and gloves can help
              someone survive the harsh winter. Every donation, big or small,
              brings warmth to those in need.
            </li>
            <li>
              <strong>Financial Contributions:</strong> If you’re unable to
              donate clothes, you can support Muskan through financial
              contributions. Your donations help us purchase high-quality
              blankets, heating supplies, and other winter essentials for the
              underprivileged.
            </li>
            <li>
              <strong>Organize a Collection Drive:</strong> Become a changemaker
              in your community by organizing a collection drive in your
              neighborhood, school, college, or workplace. Encourage your
              friends and family to contribute and make a collective impact.
            </li>
            <li>
              <strong>Volunteer with Us:</strong> Join our team and experience
              the joy of giving firsthand. From collection drives to sorting and
              distributing clothes, every hand makes a difference. Volunteering
              is not just about helping others—it’s about creating a society
              built on compassion and unity.
            </li>
            <li>
              <strong>Corporate & Institutional Partnerships:</strong> If you
              represent an organization, school, or business, you can
              collaborate with Muskan by sponsoring donations, providing
              logistical support, or mobilizing volunteers for distribution
              events.
            </li>
            <li>
              <strong>Spread Awareness:</strong> Awareness is key to expanding
              our reach. Share our initiative on social media, talk to your
              networks, and encourage others to contribute. A simple share can
              inspire many to take action.
            </li>
            <li>
              <strong>Become a Muskan Ambassador:</strong> If you’re passionate
              about social change, you can represent Muskan in your locality. As
              an ambassador, you will help coordinate donations, lead outreach
              efforts, and promote the cause to a wider audience.
            </li>
            <li>
              <strong>Support Beyond Winter:</strong> While Muskan focuses on
              winter relief, the spirit of giving shouldn’t be seasonal. Join us
              in our year-round initiatives that support underprivileged
              communities through education, healthcare, and social welfare
              programs.
            </li>
          </ul>

          <p>
            At Parmarth, we believe in creating change through compassion and
            action. Through Muskan, we strive to turn the cold season into a
            time of warmth, togetherness, and hope. Your support can transform
            lives, one donation at a time.
          </p>

          <h2>
            Be the reason behind someone’s smile this winter. Join Muskan today!
          </h2>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Muskan;
