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