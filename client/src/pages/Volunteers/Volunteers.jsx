import React, { useEffect, useState } from "react";
import styles from "./Volunteers.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import backendUrl from "../../backendUrl";
import Card from "../../components/Card/Card"; // NEW IMPORT
import { Link } from "react-router-dom";

const Volunteers = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sessions, setsessions] = useState([]);

  useEffect(() => {
    const getVolunteersData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${backendUrl}/getVolunteersData`)
        

        if (!response.ok) {
          throw new Error("Failed to load Volunteers Data");
        }

        const result = await response.json();
        console.log(result)
        setData(result);
        setsessions([...new Set(result.map((data) => data.session))]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load Volunteers Data");
      } finally {
        setIsLoading(false);
      }
    };
    getVolunteersData();
  },[]);

  // Filter data based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((volunteer) =>
        Object.values(volunteer).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "150px" }} className={styles.body}>
        <div>
          <div className={styles.header}>
          <h1 id="volunteers-data">Registered Volunteers in PARMARTH</h1>
            <div className={styles.total}>
              <strong>Total Entries:</strong> {filteredData.length}
            </div>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Search volunteers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Card container */}
          {/* <h1 id="volunteers-data">Registered Volunteers in PARMARTH</h1> */}
          <div className={styles["volunteer-card"]}>
            {sessions.length !== 0 ? (
              sessions.map((session, index) => (
                <Link
                  key={index}
                  to={`/volunteers-data/${session}`}
                  className={styles["volunteer-card"]}
                  onClick={() => localStorage.setItem("session", session)}
                >
                  <Card title={`Registered Volunteers`} value={session} />
                </Link>
              ))
            ) : isLoading ? (
              <div className={styles.loader}></div>
            ) : (
              <h2>No Data to show</h2>
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Volunteers;
