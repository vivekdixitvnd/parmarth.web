import React, { useEffect, useState } from "react";
import styles from "./Governing.module.css";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { fetchOrganizationData } from "../../../api/organization";

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
  const [director, setDirector] = useState(null);
  const [headMembers, setHeadMembers] = useState([]);
  const [pastMembers, setPastMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrganizationData()
      .then((data) => {
        setDirector(data.director || null);
        setHeadMembers(data.governingHeadMem || []);
        setPastMembers(data.governingPastMem || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.body} style={{ textAlign: "center" }}>Loading...</div>;
  if (error) return <div className={styles.body} style={{ textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>निदेशक</h1>
      {director && (
        <InfoCard
          member={director}
          isDirector={true}
        />
      )}

      <h1 className={styles.title}>संकाय सलाहकार </h1>
      {headMembers.map((member, idx) => (
        <InfoCard
          key={member.id || idx}
          member={member}
        />
      ))}
      <h1 className={styles.title}>पूर्व संकाय सलाहकार </h1>
      {pastMembers.map((member, idx) => (
        <InfoCard
          key={member.id || idx}
          member={member}
        />
      ))}
    </div>
  );
};

export default Team;
