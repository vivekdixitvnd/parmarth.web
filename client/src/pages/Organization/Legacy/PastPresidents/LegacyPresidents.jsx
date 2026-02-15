import React, { useEffect, useState } from "react";
import styles from "../Legacy.module.css"
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { fetchOrganizationData } from "../../../../api/organization";

const InfoCard = ({ member }) => (
  <div className={styles.profileCard}>
    <div className={styles.left}>
      <img src={member.imgSrc} alt={member.name} />
      <h3>{member.name}</h3>
      <p className={styles.designation}>{member.designation}</p>
      {member.department && <p>{member.department}</p>}
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



const LegacyPresidents = () => {
  const [legacyPresidents, setLegacyPresidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrganizationData()
      .then((data) => setLegacyPresidents(data.legacyPresidents || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.body} style={{ textAlign: "center" }}>Loading...</div>;
  if (error) return <div className={styles.body} style={{ textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>पूर्व अध्यक्ष</h1>
      {legacyPresidents.map((member, idx) => (
        <InfoCard
          key={member.id || idx}
          member={member}
          />
      ))}
    </div>
  );
};

export default LegacyPresidents;
