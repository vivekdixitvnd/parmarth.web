import React, { useState, useEffect } from "react";
import styles from "./RTE.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";
import backendUrl from "../../backendUrl";

const jnv = [
  { id: 1, ref: "1", name: "Shanti Gautam", school: "Jawahar Navodaya Vidyalaya, Lucknow" },
];

const shrestha = [
  { id: 1, ref: "287", name: "Shivanshu Gautam", school: "Little Flower School, Varanasi" },
  { id: 2, ref: "400", name: "Abhilasha Bharti", school: "Little Flower School, Varanasi" },
  { id: 2, ref: "1290", name: "Swati Gautam", school: "Little Flower School, Varanasi" },
  { id: 2, ref: "1311", name: "Harsh Gautam", school: "Little Flower School, Varanasi" },
  { id: 3, ref: "1393", name: "Jeetika Bharti", school: "Little Flower School, Varanasi" },
  { id: 3, ref: "1573", name: "Sujeet Gautam", school: "Little Flower School, Varanasi" },
  { id: 3, ref: "2045", name: "Priyanka Bharti", school: "Little Flower School, Varanasi" },
  { id: 3, ref: "2398", name: "Gaurav Gautam", school: "Little Flower School, Varanasi" },
  { id: 3, ref: "2544", name: "Sonam Kannoujia", school: "Little Flower School, Varanasi" },
  { id: 3, ref: "2825", name: "Pooja Bharti", school: "Little Flower School, Varanasi" },
  { id: 3, ref: "3360", name: "Nisha Gautam", school: "Little Flower School, Varanasi" },
  
];

const AdvisoryTable = ({ members }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="refrence">All India Rank / Sr. No.</th> 
            <th className="name">Name</th>
            <th className="batch">School Name</th>
            
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="refrence">{member.ref}</td>
              <td className="name">{member.name}</td>
              <td className="school">{member.school}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Schooling = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRteData = async () => {
      setIsLoading(true);
      await fetch(`${backendUrl}/getRteData`)
        .then((res) => {
          if (res.status !== 200) {
            return [];
          }
          return res.json();
        })
        .then((res) => {
          if (res === []) {
            toast.error("Failed to load RTE Data");
            return;
          }

          // Getting all academic years
          setAcademicYears([...new Set(res.map((data) => data.academicYear))]);
        })
        .catch((err) => toast.error(err.message));

      setIsLoading(false);
    };
    getRteData();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "150px" }} className={styles.body}>
      <h1 className="hhyj6">JNV Admission Data</h1>
      <div className={styles.section}>
      
          <AdvisoryTable members={jnv} />
        </div>
      <h1 className="hhyj6">SHRESTHA Admission Data</h1>
      <div className={styles.section}>
      
          <AdvisoryTable members={shrestha} />
        </div>
        <h1 id="rte-data">RTE Admission Data</h1>
        <div className={styles["rte-data"]}>
          {academicYears.length !== 0 ? (
            academicYears.map((academicYear, index) => (
              <Link
                key={index}
                to={`/rte-data/${academicYear}`}
                className={styles["rte-card"]}
                onClick={() =>
                  localStorage.setItem("academicYear", academicYear)
                }
              >
                <Card title={`Student Admitted`} value={academicYear} />
              </Link>
            ))
          ) : isLoading ? (
            <div className={styles.loader}></div>
          ) : (
            <h2>No Data to show</h2>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Schooling;
