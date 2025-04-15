import React, { useState } from "react";
import styles from "./RequestForCertificate.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import backendUrl from "../../backendUrl";

const RequestForCertificate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState(0);
  const [course, setCourse] = useState("");
  const [purpose, setPurpose] = useState("general");
  const [academicYear, setAcademicYear] = useState("");
  const [session, setSession] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);

  // const isEmailValid = (email) =>
  //   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isRollNumberValid = (rollNumber) => rollNumber.length === 13;

  const isCourseValid = (course) => {
    switch (course) {
      case "B.Tech":
      case "M.Tech":
      case "MBA":
      case "MCA":
        return true;

      default:
        return false;
    }
  };

  const isAcademicYearValid = (academicYear) => /\d\d\d\d/.test(academicYear);
  const isSessionValid = (session) => /\d\d\d\d/.test(session);

  // const isEventValid = (event) => {
  //   switch (event) {
  //     case "Muskaan":
  //     case "udgam":
  //       return true;
  //     default:
  //       return false;
  //   }
  // };

    
  
  const onFormSubmitHandler = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);

    if (!isNameValid(name)) {
      toast.error("Enter a valid name");
      setIsLoading(false);
      return;
    } else if (!isRollNumberValid(rollNumber)) {
      toast.error("Enter a valid roll number");
      setIsLoading(false);
      return;
    } else if (!isCourseValid(course)) {
      toast.error("Select a course");
      setIsLoading(false);
      return;
    }

   if (purpose === "event") {
      if (!isAcademicYearValid(academicYear)) {
        toast.error("Enter a valid Academic Year");
        setIsLoading(false);
        return;
      }
    }
   if (purpose === "general") {
      if (!isSessionValid(session)) {
        toast.error("Enter a valid Session");
        setIsLoading(false);
        return;
      }
    }

    const data = {
      name: name,
      // email: email,
      rollNumber: +rollNumber,
      course: course,
      purpose: purpose,
      academicYear: academicYear,
      session: session,
    };

    await fetch(`${backendUrl}/addRequestData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.error) {
          toast.error(resData.error);
        } else if (resData.message) {
          toast.success(resData.message);
        }
      })
      .catch((err) => console.error(err));

    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <form className={styles.form} onSubmit={onFormSubmitHandler}>
          <h1>Request for Certificate</h1>
          <label for="name">Name</label>
          <input
            required
            id="name"
            type="text"
            placeholder="Enter your Full name"
            onChange={(e) => setName(e.target.value)}
          />
          <label for="roll-number">Roll Number</label>
          <input
            required
            id="roll-number"
            type="text"
            placeholder="Enter your roll number"
            onChange={(e) => setRollNumber(e.target.value)}
          />
          <label for="course">Course</label>
          <select
            required
            id="course"
            defaultValue="choose"
            className={styles.dropdown}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option disabled hidden value="choose">
              Select Course
            </option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
          </select>
          <label for="purpose">Select Purpose</label>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "2rem",
            }}
          >
            <button
              className={`${styles.btn} ${
                purpose === "general" ? styles["btn-active"] : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setPurpose("general");
              }}
            >
              General
            </button>
            
            <button
              className={`${styles.btn} ${
                purpose === "event" ? styles["btn-active"] : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setPurpose("event");
              }}
            >
              Event
            </button>
          </div>
          {purpose === "event" && (
            <>
              <label for="academic-year">Academic Year</label>
              <input
                type="text"
                placeholder="e.g. 2022"
                onChange={(e) => setAcademicYear(e.target.value)}
              />
            </>
          )}
          {purpose === "general" && (
            <>
              <label for="session">Session</label>
              <input
                type="text"
                placeholder="e.g. 2022-2023"
                onChange={(e) => setSession(e.target.value)}
              />
            </>
          )}
          

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? <div className={styles.loader}></div> : "Submit"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RequestForCertificate;
