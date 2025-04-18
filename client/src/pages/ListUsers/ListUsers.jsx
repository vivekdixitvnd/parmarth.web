import React, { useState, useEffect, useContext } from "react";
import styles from "./ListUsers.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";
import Modal from "../../components/Modal/Modal";
import { AiFillDelete } from "react-icons/ai";

const ListUsers = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userToBeDeleted, setUserToBeDeleted] = useState("");
  const [modalState, setModalState] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const authCtx = useContext(AuthContext);

  const getUsers = async () => {
    setIsLoading(true);
    await fetch(`${backendUrl}/getUsers`, {
      headers: { Authorization: "Bearer " + authCtx.token },
    })
      .then((res) => {
        if (res.status !== 200) {
          return [];
        }
        return res.json();
      })
      .then((result) => {
        if (result == []) {
          toast.error("Failed to load Users");
        }
        setData(result);
      })
      .catch((err) => toast.error(err.messsage));
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "150px" }} className={styles.body}>
        <h1>List of all Users</h1>
        <div>
          <div className={styles.total}>
            <strong>Total Entries:</strong> {data.length}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table>
              <tr>
                <th>S. No.</th>
                <th>User ID</th>
                <th>User Email</th>
                <th>User Type</th>
                <th>2FA Status</th>
                <th>2FA Action</th>
                <th>Delete User</th>
              </tr>
              {isLoading ? (
                <td colSpan={7}>
                  <div className={styles.loader}></div>
                </td>
              ) : (
                data.map((res, index) => (
                  <tr
                    key={res._id}
                    style={
                      localStorage.getItem("userId") === res._id
                        ? { backgroundColor: "yellow" }
                        : null
                    }
                  >
                    <td>{index + 1}</td>
                    <td>{res._id}</td>
                    <td>{res.email}</td>
                    <td>
                      <strong>{res.userType}</strong>
                    </td>
                    <td>
                      {res.status2FA ? (
                        <div style={{ color: "green", fontWeight: "700" }}>
                          Enabled
                        </div>
                      ) : (
                        <div style={{ color: "red", fontWeight: "700" }}>
                          Disabled
                        </div>
                      )}
                    </td>
                    <td style={{ backgroundColor: "#ffffff" }}>
                      <button
                        className={
                          res.status2FA
                            ? styles["disable-button"]
                            : styles["enable-button"]
                        }
                        onClick={async () => {
                          await fetch(`${backendUrl}/status2FA`, {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + authCtx.token,
                            },
                            body: JSON.stringify({
                              userId: res._id,
                              status: !res.status2FA,
                            }),
                          })
                            .then((result) => result.json())
                            .then((resData) => {
                              if (resData.error) {
                                toast.error(resData.error);
                              } else if (resData.message) {
                                getUsers();
                                toast.success(resData.message);
                              }
                            })
                            .catch((err) => toast.error(err.messsage));
                        }}
                      >
                        {res.status2FA ? "Disable" : "Enable 2FA"}
                      </button>
                    </td>
                    <td style={{ backgroundColor: "#ffffff" }}>
                      <button
                        className={styles["delete-button"]}
                        onClick={() => {
                          setUserToBeDeleted(res._id);
                          setModalState(true);
                        }}
                      >
                        Delete User
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </table>
          </div>
        </div>
      </div>
      <Modal
        open={modalState}
        onClose={() => {
          setModalState(false);
          setUserToBeDeleted("");
        }}
        onConfirm={async () => {
          setIsDeleting(true);
          await fetch(
            `${backendUrl}/deleteUser/${localStorage.getItem(
              "userId",
            )}/${userToBeDeleted}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authCtx.token,
              },
            },
          )
            .then((result) => result.json())
            .then((resData) => {
              if (resData.error) {
                toast.error(resData.error);
                setIsDeleting(false);
                setModalState(false);
              } else if (resData.message) {
                toast.success(resData.message);
                setIsDeleting(false);
                setModalState(false);
                getUsers();
              }
            })
            .catch((err) => toast.error(err.messsage));
        }}
        isLoading={isLoading}
      >
        {isDeleting ? (
          <div
            className={styles.loader}
            style={{ marginBottom: "2.5rem" }}
          ></div>
        ) : (
          <>
            <span className={styles["delete-btn"]}>
              <AiFillDelete />
            </span>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#db1b1b",
              }}
            >
              Confirm Delete
            </div>
            <p
              style={{
                color: "#db1b1b",
              }}
            >
              This Operation is irreversible
            </p>
            <br />
          </>
        )}
      </Modal>
      {/* <Footer /> */}
    </>
  );
};

export default ListUsers;
