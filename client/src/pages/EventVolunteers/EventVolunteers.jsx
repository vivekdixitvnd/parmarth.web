import React, { useEffect, useState } from "react";
import styles from "./EventVolunteers.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import backendUrl from "../../backendUrl";
import Card from "../../components/Card/Card"; // NEW IMPORT
import { Link } from "react-router-dom";

const EventVolunteers = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sessions, setsessions] = useState([]);

  useEffect(() => {
    const getVolunteersData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${backendUrl}/getEventVolunteersData`)
        

        if (!response.ok) {
          throw new Error("Failed to load Volunteers Data");
        }

        const result = await response.json();
        console.log(result)
        setData(result);
        setsessions([...new Set(result.map((data) => data.academicYear))]);
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
      <Navbar />
      <div className={styles.body}>
        <div>
          <div className={styles.header}>
          <h1>Registered Volunteers at MUSKAAN in PARMARTH</h1>
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
          <div className={styles["card"]}>
            {sessions.length !== 0 ? (
              sessions.map((academicYear, index) => (
                <Link
                  key={index}
                  to={`/event-volunteers-data/${academicYear}`}
                  className={styles["card"]}
                  onClick={() => localStorage.setItem("session", academicYear)}
                >
                  <Card title={`Volunteers at Muskaan`}  value={academicYear} />
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
      <Footer />
    </>
  );
};

export default EventVolunteers;
