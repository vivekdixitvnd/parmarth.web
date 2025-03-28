import React, { useContext, useState } from "react";
import styles from "./AddVolunteerData.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";

const AddVolunteerData = () => {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [postHolded, setPostHolded] = useState("");
  const [session, setSession] = useState("");
  const [reference, setReference] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [excelFile, setExcelFile] = useState("");
  const authCtx = useContext(AuthContext);

  const isNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);
  const isRollNumberValid = (rollNumber) => rollNumber.length === 13;
  const isCourseValid = (course) =>
    ["B.Tech", "M.Tech", "MBA", "MCA"].includes(course);
  const isPostHoldedValid = (postHolded) => postHolded.trim().length > 0;
  const isSessionValid = (session) => /^\d{4}-\d{4}$/.test(session);

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isNameValid(name)) {
      toast.error("Enter a valid name (2-30 alphabetic characters)");
      setIsLoading(false);
      return;
    } else if (!isRollNumberValid(rollNumber)) {
      toast.error("Enter a valid 13-digit roll number");
      setIsLoading(false);
      return;
    } else if (!isCourseValid(course)) {
      toast.error("Select a valid course");
      setIsLoading(false);
      return;
    } else if (!isPostHoldedValid(postHolded)) {
      toast.error("Enter your Post");
      setIsLoading(false);
      return;
    } else if (!isSessionValid(session)) {
      toast.error("Enter a valid session (format: YYYY-YYYY)");
      setIsLoading(false);
      return;
    }

    const data = {
      name: name.trim().toUpperCase(),
      rollNumber: +rollNumber,
      course: course.trim(),
      postHolded: postHolded.trim().toUpperCase(),
      session: session.trim(),
      ...(course === "B.Tech" && { branch: branch.trim().toUpperCase() }),
    };

    fetch(`${backendUrl}/addVolunteerData`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.error) {
          toast.error(resData.error);
        } else {
          toast.success(resData.message);
          // Reset form
          setName("");
          setRollNumber("");
          setCourse("");
          setBranch("");
          setPostHolded("");
          setSession("");
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setIsLoading(false));
  };

  const onUploadFileSubmitHandler = (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();
    formData.append("excelFile", excelFile);

    fetch(`${backendUrl}/addVolunteerDataViaExcel`, {
      method: "POST",
      body: formData,
      headers: { Authorization: "Bearer " + authCtx.token },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.error) {
          toast.error(resData.error);
        } else {
          toast.success(resData.message);
          setExcelFile("");
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setIsUploading(false));
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <form
          className={styles.form}
          onSubmit={onUploadFileSubmitHandler}
          encType="multipart/form-data"
        >
          <label htmlFor="excelFile">Upload an Excel file</label>
          <div style={{ marginTop: "1rem" }}>
            <span style={{ fontSize: "16px", fontWeight: "900", color: "red" }}>
              File should contain these columns in order:
              <span style={{ color: "#535353", fontWeight: "500" }}>
                <ul>
                  <li>Name</li>
                  <li>Course (B.Tech, M.Tech, MBA, MCA)</li>
                  <li>Branch (required only for B.Tech)</li>
                  <li>Roll Number (13 digits)</li>
                  <li>Post Holded</li>
                  <li>Session (YYYY-YYYY)</li>
                </ul>
              </span>
              Example:
            </span>
            <img
              src="/img/excel-file-secondary.png"
              alt="Excel file example"
              className={styles["excel-image"]}
            />
          </div>
          <input
            id="excelFile"
            type="file"
            required
            name="excelFile"
            accept=".xlsx, .xls"
            onChange={(e) => setExcelFile(e.target.files[0])}
          />
          <button
            type="submit"
            className={styles.submit}
            disabled={isUploading || !excelFile}
          >
            {isUploading ? <div className={styles.loader}></div> : "Upload"}
          </button>
        </form>
        <h1>OR</h1>
        <form className={styles.form} onSubmit={onFormSubmitHandler}>
          <h1>Add Volunteer Data</h1>

          <label htmlFor="name">Name</label>
          <input
            required
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="roll-number">Roll Number</label>
          <input
            required
            id="roll-number"
            type="text"
            placeholder="Enter 13-digit roll number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            maxLength={13}
          />

          <label htmlFor="course">Course</label>
          <select
            required
            id="course"
            value={course}
            className={styles["branch-dropdown"]}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="" disabled hidden>
              Select Course
            </option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
          </select>

          {course === "B.Tech" && (
            <>
              <label htmlFor="branch">Branch</label>
              <select
                required
                id="branch"
                value={branch}
                className={styles["branch-dropdown"]}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="" disabled hidden>
                  Select Branch
                </option>
                <option value="CE">CE - Civil Engineering</option>
                <option value="CH">CH - Chemical Engineering</option>
                <option value="CS">CS - Computer Science Engineering</option>
                <option value="EC">
                  EC - Electronics and Communication Engineering
                </option>
                <option value="EE">EE - Electrical Engineering</option>
                <option value="EI">
                  EI - Electronics and Instrumentation Engineering
                </option>
                <option value="IT">IT - Information Technology</option>
                <option value="ME">ME - Mechanical Engineering</option>
              </select>
            </>
          )}

          <label htmlFor="post-holded">Post Holded</label>
          <input
            required
            id="post-holded"
            type="text"
            placeholder="e.g. Volunteer"
            value={postHolded}
            onChange={(e) => setPostHolded(e.target.value)}
          />

          <label htmlFor="session">Session</label>
          <input
            required
            id="session"
            type="text"
            placeholder="YYYY-YYYY (e.g., 2023-2024)"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            pattern="\d{4}-\d{4}"
            title="Format: YYYY-YYYY"
          />

          <label htmlFor="reference">Reference</label>
          <input
            id="reference"
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? <div className={styles.loader}></div> : "Submit"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddVolunteerData;
