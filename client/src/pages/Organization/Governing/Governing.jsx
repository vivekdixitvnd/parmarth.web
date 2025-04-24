import React from "react";
import styles from "./Governing.module.css";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import headMembers from "./headMem.json";
import pastMembers from "./pastMem.json";
import director from "./Director.json";

const InfoCard = ({ member, pastMem, isDirector = false }) => (
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

      {isDirector && (
        <>

        </>
      )}
    </div>
  </div>
);

const Team = () => {
  return (
    <div className={styles.body}>
      <h1 className={styles.title}>निदेशक</h1>
      <InfoCard
        member={director}
       isDirector={true}
      />

      <h1 className={styles.title}>संकाय सलाहकार </h1>
      {headMembers.map((member) => (
        <InfoCard
          key={member.id}
          member={member}
        />
      ))}
      <h1 className={styles.title}>पूर्व संकाय सलाहकार </h1>
      {pastMembers.map((member) => (
        <InfoCard
          key={member.id}
          member={member}
        />
      ))}
    </div>
  );
};

export default Team;
