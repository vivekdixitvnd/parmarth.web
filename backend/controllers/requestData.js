import Request from "../models/request.js";
import Volunteer from "../models/volunteers.js";
import EventVolunteer from "../models/eventVolunteers.js";

const getRequestData = async (req, res, next) => {
  const { purpose } = req.body;

  try {
    let requests;
    if (purpose === "general") {
      requests = await Request.find({ purpose: "general" });
    } else if (purpose === "event") {
      requests = await Request.find({ purpose: "event" });
    }
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addRequestData = async (req, res, next) => {
  // Validation
  const { name, course, rollNumber, purpose } = req.body;

  let session = "",
    event = "",
    academicYear = "";
  if (purpose === "general") {
    session = req.body.session;
  } else if (purpose === "event") {
    event = req.body.event;
    academicYear = req.body.academicYear;
  }

  let branch = "";
  if (course === "B.Tech.") {
    branch = req.body.branch;
  }

  const isNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);
  // const isEmailValid = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const isRollNumberValid = (rollNumber) => rollNumber.toString().length === 13;
  const isCourseValid = (course) => ["B.Tech", "M.Tech", "MBA", "MCA"].includes(course);
  const isSessionValid = (session) => typeof session === "string" && session.trim().length > 0;
  // const isEventValid = (event) => ["muskan", "udgam"].includes(event);

  if (!isNameValid(name)) {
    return res.status(422).json({ error: "Enter a valid name" });
  // } else if (!isEmailValid(email)) {
  //   return res.status(422).json({ error: "Enter a valid email" });
  } else if (!isRollNumberValid(rollNumber)) {
    return res.status(422).json({ error: "Enter a valid roll number" });
  } else if (!isCourseValid(course)) {
    return res.status(422).json({ error: "Enter your course" });
  // } else if (!isSessionValid(session)) {
  //   return res.status(422).json({ error: "Enter your Session" });
  }

  if (purpose === "general" && !isSessionValid(session)) {
    return res.status(422).json({ error: "Enter your Session" });
  // // } else if (purpose === "event" && !isEventValid(event)) {
  // //   return res.status(422).json({ error: "Select a valid Event" });
  }

  try {
    let dataExist = false;

    if (purpose === "general") {
      const data = await Volunteer.findOne({
        name: name.trim().toUpperCase(),
        // course: course.trim(),
        rollNumber: +rollNumber,
        session: session,
      });

      if (data) {
        dataExist = true;
      }
      console.log(data);
    } else if (purpose === "event") {
      const data = await EventVolunteer.findOne({
        name: name.trim().toLowerCase(),
        // course: course.trim(),
        rollNumber: +rollNumber,
        academicYear: academicYear,
      });

      if (data) {
        dataExist = true;
      }
      console.log(data);
    }

    

    // **Sirf wahi request add ho jiska data pehle se exist kare**
    if (!dataExist) {
      return res.status(400).json({ error: "No previous data found. Request rejected." });
    }

    const requestData = new Request({
      name: name.trim().toUpperCase(),
      // email: email.trim().toLowerCase(),
      course: course.trim().toUpperCase(),
      rollNumber: +rollNumber,
      purpose: purpose.trim(),
      dataExist: true,
    });

    await requestData.save();
    console.log("Added Data");
    return res.status(201).json({ message: "Successfully added your request" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRequestData = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await Request.findByIdAndRemove(id);
    if (!data) {
      return res.status(422).json({ error: "Couldn't find Data" });
    }
    return res.status(200).json({ message: "Data Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getRequestData, addRequestData, deleteRequestData };
