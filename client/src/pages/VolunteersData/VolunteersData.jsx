import React, { useEffect, useState } from "react";
import styles from "./VolunteersData.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import backendUrl from "../../backendUrl";

const VolunteersData = () => {
  const [data, setData] = useState([]);
  const { session } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVolunteersDataBySession = async () => {
      setIsLoading(true);
      await fetch(`${backendUrl}/getVolunteersData/` + session)
        .then((res) => {
          if (res.status !== 200) {
            return [];
          }
          return res.json();
        })
        .then((res) => {
          if (res === []) {
            toast.error("Failed to load Student Data");
          }
          setData(res);
        })
        .catch((err) => toast.error(err.messsage));
      setIsLoading(false);
    };
    getVolunteersDataBySession();
  }, []);

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
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.sNo}>S. No.</th>
                  <th className={styles.name}>Name</th>
                  <th className={styles.course}>Course (Branch)</th>
                  <th className={styles.rollNumber}>Roll Number</th>
                  <th className={styles.post}>Post Holded</th>
                  <th className={styles.session}>Session</th>
                  <th className={styles.refNo}>Reference No.</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7}>
                      <div className={styles.loader}></div>
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className={styles.noData}>
                      No volunteers found
                    </td>
                  </tr>
                ) : (
                  filteredData.map((res, index) => (
                    <tr key={res._id}>
                      <td className={styles.sNo}>{index + 1}</td>
                      <td className={styles.name}>{res.name}</td>
                      <td className={styles.course}>
                        {res.course}{" "}
                        {res?.branch && <span>({res.branch})</span>}
                      </td>
                      <td className={styles.rollNumber}>{res.rollNumber}</td>
                      <td className={styles.post}>{res.postHolded}</td>
                      <td className={styles.session}>{res.session}</td>
                      <td className={styles.refNo}>{res.refrence || "N/A"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default VolunteersData;
