import React from "react";
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
                        <th>Reference No.</th>
                        <th>Name</th>
                        <th>Batch</th>
                        <th>LinkedIn</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td>{member.ref}</td>
                            <td>{member.name}</td>
                            <td>{member.batch}</td>
                            <td>
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                    in
                                </a>
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
            <Navbar />
            <div className={styles.body}>
                <div className={styles.section}>
                    <h1>Head Committee Members</h1>
                    <div className={styles.members}>
                        {headMembers.map((member) => (
                            <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <h1>Advisory Committee Members</h1>
                    <AdvisoryTable members={advisoryMembers} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Team;