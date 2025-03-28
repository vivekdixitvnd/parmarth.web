import Volunteer from "../models/volunteers.js";
import XLSX from "xlsx";
import fs from "fs";

const getVolunteersData = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addVolunteerData = async (req, res, next) => {
  const { name, course, rollNumber, postHolded, session } = req.body;

  // Validate required fields
  if (!name || !course || !rollNumber || !postHolded || !session) {
    return res.status(422).json({ error: "All fields are required" });
  }

  var branch = "";
  if (course === "B.Tech") {
    if (!req.body.branch) {
      return res.status(422).json({ error: "Branch is required for B.Tech students" });
    }
    branch = req.body.branch;
  }

  // Validation functions
  const isNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);
  const isRollNumberValid = (rollNumber) => rollNumber.toString().length === 13;
  const isCourseValid = (course) => {
    const validCourses = ["B.Tech", "M.Tech", "MBA", "MCA"];
    return validCourses.includes(course);
  };
  const isPostHoldedValid = (postHolded) =>
    typeof postHolded === "string" && postHolded.trim().length > 0;
  const isSessionValid = (session) => {
    // Validate session format (e.g., 2022-2023, 2023-2024)
    return /^\d{4}-\d{4}$/.test(session);
  };

  try {
    if (!isNameValid(name)) {
      return res.status(422).json({ error: "Enter a valid name" });
    } else if (!isRollNumberValid(rollNumber)) {
      return res.status(422).json({ error: "Enter a valid roll number" });
    } else if (!isCourseValid(course)) {
      return res.status(422).json({
        error: `Enter a valid course (one of: B.Tech, M.Tech, MBA, MCA). Received: ${course}`,
      });
    } else if (!isPostHoldedValid(postHolded)) {
      return res.status(422).json({ error: "Enter Post Holded" });
    } else if (!isSessionValid(session)) {
      return res.status(422).json({ error: "Enter a valid session (format: YYYY-YYYY)" });
    }

    const existingData = await Volunteer.findOne({
      name: name.trim().toUpperCase(),
      course: course.trim().toUpperCase(),
      rollNumber: +rollNumber,
      postHolded: postHolded.trim().toUpperCase(),
      session: session.trim(),
      ...(course === "B.Tech" && { branch: branch.trim().toUpperCase() }),
    });

    if (existingData) {
      return res.status(422).json({ error: "Data Already Exist" });
    }

    const volunteerData = new Volunteer({
      name: name.trim().toUpperCase(),
      course: course.trim().toUpperCase(),
      rollNumber: +rollNumber,
      postHolded: postHolded.trim().toUpperCase(),
      session: session.trim(),
      ...(course === "B.Tech" && { branch: branch.trim().toUpperCase() }),
    });

    await volunteerData.save();
    console.log("Added Data");
    return res.status(201).json({ message: "Successfully added data" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addVolunteerDataViaExcel = async (req, res, next) => {
  if (!req.file) {
    return res.status(422).json({ error: "Upload an Excel file" });
  }

  const filePath = req.file.path;

  try {
    var workbook = XLSX.readFile(filePath);
    var sheetNameList = workbook.SheetNames;

    var volunteersData = [];

    sheetNameList.forEach((y) => {
      var worksheet = workbook.Sheets[y];
      var headers = {};
      function camelCase(str) {
        return str
          .replace(/\s(.)/g, function (a) {
            return a.toUpperCase();
          })
          .replace(/\s/g, "")
          .replace(/^(.)/, function (b) {
            return b.toLowerCase();
          });
      }
      for (z in worksheet) {
        if (z[0] === "!") continue;
        var col = z.substring(0, 1);
        var row = parseInt(z.substring(1));
        var value = worksheet[z].v;
        if (row == 1) {
          headers[col] = camelCase(value.trim());
          continue;
        }
        if (!volunteersData[row]) volunteersData[row] = {};

        if (col === "D") { // Assuming D is the column for rollNumber (number)
          volunteersData[row][headers[col]] = +value;
        } else if (headers[col] === "session") {
          // Ensure session is in correct format
          if (!/^\d{4}-\d{4}$/.test(value.toString().trim())) {
            throw new Error(`Invalid session format in row ${row}. Expected format: YYYY-YYYY`);
          }
          volunteersData[row][headers[col]] = value.toString().trim();
        } else {
          volunteersData[row][headers[col]] = value.toString().toUpperCase();
        }
      }
      volunteersData.shift();
      volunteersData.shift();
    });

    // Validate all records have required fields
    volunteersData.forEach((volunteer, index) => {
      if (!volunteer.name || !volunteer.course || !volunteer.rollNumber || 
          !volunteer.postHolded || !volunteer.session) {
        throw new Error(`Missing required fields in row ${index + 2}`);
      }
      if (volunteer.course === "B.Tech" && !volunteer.branch) {
        throw new Error(`Branch is required for B.Tech student in row ${index + 2}`);
      }
    });

    await Volunteer.insertMany(volunteersData);
    console.log("Data added");
    fs.unlinkSync(filePath);
    console.log("File deleted");
    return res.status(200).json({ message: "Successfully added data" });
  } catch (err) {
    fs.unlinkSync(filePath); // Clean up the file even if there's an error
    res.status(500).json({ error: err.message });
  }
};

export { getVolunteersData, addVolunteerData, addVolunteerDataViaExcel };