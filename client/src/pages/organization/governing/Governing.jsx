import React from "react";
<<<<<<< HEAD
import styles from "./Team.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import headMembers from "./headMem.json"
import advisoryMembers from "./advisoryComittee.json"

const MemberCard = ({ member }) => (
    <div className={styles.card}>
        <img src={member.imgSrc} alt={member.name} />
        <h3>{member.name}</h3>
        <p>{member.year}</p>
        <div className={styles.icons}>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
            </a>
            <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
            </a>
            <a href={`mailto:${member.email}`}>
                <FaEnvelope />
            </a>
        </div>
    </div>
);

const AdvisoryTable = ({ members }) => {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="refrence">Reference No.</th>
              <th className="name">Name</th>
              <th className="batch">Batch</th>
              <th className="contact">Contact</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td className="refrence">{member.ref}</td>
                <td className="name">{member.name}</td>
                <td className="batch">{member.batch}</td>
                <td className="contact">
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      in
                    </a>
                  ) : member.email ? (
                    <a href={`mailto:${member.email}`}>📧</a>
                  ) : (
                    <span>N/A</span> // Agar dono nahi hai toh ye show karega
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

const Team = () => {
    return (
        <>
            {/* <Navbar /> */}
            <div style={{ paddingTop: "150px" }} className={styles.body}>
            <h1>Head Committee Members</h1>
                <div className={styles.section}>
                  
                    <div className={styles.members}>
                        {headMembers.map((member) => (
                            <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>
                <h1 >Advisory Committee Members</h1>
                <div className={styles.section}>
                    
                    <AdvisoryTable members={advisoryMembers} />
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default Team;
=======
import styles from "./Governing.module.css";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import headMembers from "./headMem.json";
import director from "./Director.json";

const InfoCard = ({ member, messageTitle, messageContent, isDirector = false }) => (
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
      <h2>{messageTitle}</h2>
      <p>{messageContent}</p>

      {isDirector && (
        <>
          <h3 style={{ marginTop: "1rem", color: "#1a1a1a" }}>Vision for Parmarth</h3>
          <p>
            My vision for Parmarth is to create a sustainable impact through education and social reform.
            I believe student-driven change is the most powerful force to uplift the underprivileged.
          </p>

          <h3 style={{ marginTop: "1rem", color: "#1a1a1a" }}>Thoughts about Parmarth</h3>
          <p>
            Parmarth has grown into a mission that reflects the values of empathy and responsibility.
            I am proud of the efforts made by our students to build a better society.
          </p>
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
        messageTitle="Director's Words for Parmarth"
        messageContent="Parmarth is not just a student initiative; it's a movement of change, compassion, and contribution. Our aim is to bring education and empowerment to the most underserved communities."
        isDirector={true}
      />

      <h1 className={styles.title}>संकाय सलाहकार </h1>
      {headMembers.map((member) => (
        <InfoCard
          key={member.id}
          member={member}
          messageTitle="Vision"
          messageContent="As a guiding force for Parmarth, our focus remains on making impactful changes in students' lives while fostering a spirit of volunteerism and leadership."
        />
      ))}
    </div>
  );
};

export default Team;
>>>>>>> 57d6dba4e9b0e5d12787964cbd00d72045a4b7c2
