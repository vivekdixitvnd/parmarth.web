import React, { useEffect, useState } from "react";
import styles from "./RteData.module.css";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import backendUrl from "../../backendUrl";

const RteData = () => {
  const [data, setData] = useState([]);
  const { academicYear } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRteDataByAcademicYear = async () => {
      setIsLoading(true);
      await fetch(`${backendUrl}/getRteData/` + academicYear)
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
    getRteDataByAcademicYear();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "150px" }} className={styles.body}>
        <h1>RTE Admission Data of Year {academicYear}</h1>
        <div>
          <div className={styles.total}>
            <strong>Total Entries:</strong> {data.length}
          </div>
          <div className="table-container">
            <table>
              <tr>
                <th className={styles.sno}>S. No.</th>
                <th className={styles.name}>Student Name</th>
                <th className={styles.class}>Class</th>
                <th className={styles.school}>School</th>
              </tr>
              {isLoading ? (
                <td colspan={4}>
                  <div className={styles.loader}></div>
                </td>
              ) : (
                data.map((res, index) => (
                  <tr key={res._id}>
                    <td className={styles.sno}>{index + 1}</td>
                    <td className={styles.name}>{res.studentName}</td>
                    <td className={styles.class}>{res.classStudying}</td>
                    <td className={styles.school}>{res.school}</td>
                  </tr>
                ))
              )}
            </table>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default RteData;
