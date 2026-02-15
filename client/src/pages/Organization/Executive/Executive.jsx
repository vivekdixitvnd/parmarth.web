import React, { useEffect, useState } from "react";
import styles from "./Executive.module.css";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { fetchOrganizationData } from "../../../api/organization";

const MemberCard = ({ member }) => (
    <div className={styles.card}>
        <img src={member.imgSrc} alt={member.name} />
        <h3>{member.name}</h3>
        <p>{member.designation || member.year}</p>
        <div className={styles.icons}>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
            </a>
            
            <a href={`mailto:${member.email}`}>
                <FaEnvelope />
            </a>
        </div>
    </div>
);

  

const Executive = () => {
    const [headMembers, setHeadMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrganizationData()
            .then((data) => setHeadMembers(data.executive || []))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div style={{ paddingTop: "110px", textAlign: "center" }}>Loading...</div>;
    if (error) return <div style={{ paddingTop: "110px", textAlign: "center", color: "red" }}>{error}</div>;

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