import React from "react";
import styles from "./Founder.module.css";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import founder from "./Founder.json";

const InfoCard = ({ member, isDirector = false }) => (
  <div className={styles.profileCard}>
    <div className={styles.left}>
      <img src={member.imgSrc} alt={member.name} />
      <h3>{member.name}</h3>
      <p className={styles.designation}>{member.designation}</p>
      {member.department && <p>{member.department}</p>}
      {member.roleParmarth && <p className={styles.role}>{member.roleParmarth}</p>}
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
      {/* <h2 className={styles.legacyTitle}>Legacy</h2> */}
      <p className={styles.messageContent}>{member.message}</p>
    </div>
  </div>
);

const Team = () => {
  return (
    <div className={styles.body}>
      

      <h1 className={styles.title}>Founding Members</h1>
      {founder.map((member) => (
        <InfoCard
          key={member.id}
          member={member}
        />
      ))}
    </div>
  );
};

export default Team;
