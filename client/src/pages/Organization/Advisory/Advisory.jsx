import React, { useEffect, useState } from "react";
import styles from "./Advisory.module.css";
import { fetchOrganizationData } from "../../../api/organization";

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
  const [founder, setFounder] = useState([]);
  const [Members, setMembers] = useState([]);
  const [coreMembers, setCoreMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrganizationData()
      .then((data) => {
        setFounder(data.founder || []);
        setMembers(data.coreAdvisory || []);
        setCoreMembers(data.advisory || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.body} style={{ textAlign: "center" }}>Loading...</div>;
  if (error) return <div className={styles.body} style={{ textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <>
      <div className={styles.body}>
        <h1>संस्थापक सदस्य</h1>
        <div className={styles.section}>
          <AdvisoryTable members={founder} />
        </div>
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