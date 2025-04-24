import React, { useContext, useEffect, useState } from "react";
import styles from "./EventVolunteersData.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";
import { useParams } from "react-router-dom";

const EventVolunteersData = () => {
  const authCtx = useContext(AuthContext);
  const { academicYear } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVolunteersDataByYear = async () => {
      setIsLoading(true);
      await fetch(`${backendUrl}/getEventVolunteersData/` + academicYear)
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
    getVolunteersDataByYear();
  }, [academicYear]);

  // useEffect(() => {
  //   const getVolunteersData = async () => {
  //     setIsLoading(true);

  //     await fetch(`${backendUrl}/getEventVolunteersData`, {
  //       headers: { Authorization: "Bearer " + authCtx.token },
  //     })
  //       .then((res) => {
  //         if (res.status !== 200) {
  //           return [];
  //         }
  //         return res.json();
  //       })
  //       .then((res) => {
  //         if (res === []) {
  //           toast.error("Failed to load Volunteers Data");
  //         }
  //         setData(res);
  //       })
  //       .catch((err) => console.log(err));

  //     setIsLoading(false);
  //   };
  //   getVolunteersData();
  // }, []);
  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "150px" }} className={styles.body}>
        <div>
          <div className={styles.total}>
            <strong>Total Entries:</strong> {data.length}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table>
              <tr>
                <th className={styles.sNo}>S. No.</th>
                <th className={styles.name}>Name</th>
                <th className={styles.course}>Course (Branch)</th>
                <th className={styles.event}>Event</th>
                <th className={styles.rollNumber}>Roll Number</th>
                <th className={styles.post}>Post Holded</th>
                <th className={styles.academic}>Academic Year</th>
                <th className={styles.certno}>Certificate Number Assigned</th>
              </tr>
              {isLoading ? (
                <td colspan={8}>
                  <div className={styles.loader}></div>
                </td>
              ) : (
                data.map((res, index) => (
                  <tr key={res._id}>
                    <td className={styles.sNo}>{index + 1}</td>
                    <td className={styles.name}>{res.name}</td>
                    <td className={styles.course}>
                      {res.course} {res?.branch && <span>({res?.branch})</span>}
                    </td>
                    <td className={styles.event}>{res.event}</td>
                    <td className={styles.rollNumber}>{res.rollNumber}</td>
                    <td className={styles.post}>{res.responsibility}</td>
                    <td className={styles.academic}>{res.academicYear}</td>
                    <td className={styles.certno}>{res.certificateNumber}</td>
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

export default EventVolunteersData;
