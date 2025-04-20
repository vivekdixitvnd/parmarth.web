import React from "react";
import styles from "./Executive.module.css";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import headMembers from "./headMem.json"


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

  

const Executive = () => {
    return (
        <>
            {/* <Navbar /> */}
            <div style={{ paddingTop: "110px" }} className={styles.body}>
            <h1>प्रबंधकारिणी समिति</h1>
                <div className={styles.section}>
                  
                    <div className={styles.members}>
                        {headMembers.map((member) => (
                            <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                    </div>
                
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default Executive;