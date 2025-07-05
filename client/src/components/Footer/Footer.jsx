import React from "react";
import styles from "./Footer.module.css";
import {
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsFacebook,
  BsYoutube,
} from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles["contact-us"]}>
          <div className={styles.heading}>Contact Us</div>
          <div className={styles["contact-field"]}>
            <IoLocationSharp className={styles.icon} />
            <div className={styles.details}>
              <div className={styles.label}>Working Place</div>
              <div>Institute of Engineering and<br />Technology, Lucknow, 226021</div>
            </div>
          </div>
          {/* <div className={styles["contact-field"]}>
            <FaPhone className={styles.icon} />
            <div className={styles.details}>
              <div className={styles.label}>Phone Number</div>
              <div>+91 9639383630<br />+91 7007292577</div>
            </div>
          </div> */}
          <div className={styles["contact-field"]}>
            <MdEmail className={styles.icon} />
            <div className={styles.details}>
              <div className={styles.label}>Email</div>
              <a href="mailto:parmarth@ietlucknow.ac.in" className={styles.linke}>parmarth@ietlucknow.ac.in</a>
            </div>
          </div>
        </div>
        <div className={styles.social}>
          <div className={styles.heading}>Follow Us</div>
          <div className={styles["social-icons"]}>
            <a href="https://www.facebook.com/parmarth.iet/" rel="noreferrer" target="_blank">
              <BsFacebook className={styles.icon} />
            </a>
            <a href="https://twitter.com/ietparmarth?lang=en" rel="noreferrer" target="_blank">
              <BsTwitter className={styles.icon} />
            </a>
            <a href="https://www.instagram.com/parmarth.iet/" rel="noreferrer" target="_blank">
              <BsInstagram className={styles.icon} />
            </a>
            <a href="https://www.linkedin.com/company/parmarth-iet-lucknow/posts/?feedView=all" rel="noreferrer" target="_blank">
              <BsLinkedin className={styles.icon} />
            </a>
            <a href="https://www.youtube.com/channel/UCy66KqRs1rKSHXNVdLFSO7Q" rel="noreferrer" target="_blank">
              <BsYoutube className={styles.icon} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
  Parmarth © 2025 All Rights Reserved | Developed by Vivek Dixit & Arnav Saxena (Batch of 2025)
  
</div>

    </div>
  );
};

export default Footer;