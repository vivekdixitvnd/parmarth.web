<<<<<<< HEAD:client/src/pages/organization/legacy/Legacy.jsx
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
<<<<<<<< HEAD:client/src/pages/organization/advisory/advisory.jsx
import React from "react";
import styles from "./Advisory.module.css";
import Members from "./coreAdvisory.json";
import coreMembers from "./Advisory.json";

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


const Advisory = () => {
  return (
    <>
      <div className={styles.body}>
        <h1>मुख्य सलाहकार समिति</h1>
        <div className={styles.section}>
          <AdvisoryTable members={Members} />
        </div>
        <h1 >सलाहकार समिति</h1>
        <div className={styles.section}>
          <AdvisoryTable members={coreMembers} />
        </div>
      </div>
    </>
  );
};

export default Advisory;
========
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
>>>>>>>> 197c01ffc68727c174251afdf8de4dfd64bb5d1f:client/src/pages/Organization/Legacy/Legacy.jsx
>>>>>>> 197c01ffc68727c174251afdf8de4dfd64bb5d1f:client/src/pages/Organization/Legacy/Legacy.jsx
