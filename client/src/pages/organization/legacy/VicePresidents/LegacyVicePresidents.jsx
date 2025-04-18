import React from "react";
import styles from "../Legacy.module.css"
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import legacyVicePresidents from "./LegacyVicePresidents.json";

const InfoCard = ({ member, messageTitle, messageContent }) => (
  <div className={styles.profileCard}>
    <div className={styles.left}>
      <img src={member.imgSrc} alt={member.name} />
      <h3>{member.name}</h3>
      <p className={styles.designation}>{member.designation}</p>
      {member.batch && <p>Batch {member.batch}</p>}
      <div className={styles.socialIcons}>
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`}>
            <FaEnvelope />
          </a>
        )}
      </div>
    </div>
    <div className={styles.right}>
      <h2>{messageTitle}</h2>
      <p>{messageContent}</p>
    </div>
  </div>
);

const LegacyVicePresidents = () => {
  return (
    <div className={styles.body}>
      <h1 className={styles.title}>पूर्व उपाध्यक्ष</h1>
      {legacyVicePresidents.map((member) => (
        <InfoCard
          key={member.id}
          member={member}
          messageTitle="Legacy"
          messageContent="Their leadership helped shape Parmarth into the impactful student-driven organization it is today."
        />
      ))}
    </div>
  );
};

export default LegacyVicePresidents;
