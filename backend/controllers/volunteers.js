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

const generateReferenceNumber = async (rollNumber, session) => {
  const rollStr = rollNumber.toString();
  if (rollStr.length !== 13) throw new Error("Roll number must be 13 digits");

  const part1 = rollStr.substring(0, 2);  // First 2 digits
  const part2 = rollStr.substring(6, 9);  // 7th to 9th digits
  const part3 = rollStr.substring(11, 13); // Last 2 digits

  // Find the latest serial number for the given session
  const lastVolunteer = await Volunteer.findOne({ session })
    .sort({ refrence: -1 }) // Get the latest added entry
    .lean();

  let serialNumber = "01"; // Default if no previous entries

  if (lastVolunteer && lastVolunteer.refrence) {
    const lastSerial = lastVolunteer.refrence.split("-").pop(); // Extract last serial
    const newSerial = (parseInt(lastSerial, 10) + 1).toString().padStart(2, "0"); // Increment and format
    serialNumber = newSerial;
  }

  return `PARM-${part1}${part2}${part3}${serialNumber}`;
};

const addVolunteerDataViaExcel = async (req, res, next) => {
  if (!req.file) {
    return res.status(422).json({ error: "Upload an Excel file" });
  }

  const filePath = req.file.path;

  try {
    const workbook = XLSX.readFile(filePath);
    const sheetNameList = workbook.SheetNames;

    let volunteersData = [];

    sheetNameList.forEach((sheet) => {
      const worksheet = workbook.Sheets[sheet];
      const headers = {};
      const volunteerRows = [];

      // Camel case conversion function
      const camelCase = (str) =>
        str
          .replace(/\s(.)/g, (a) => a.toUpperCase())
          .replace(/\s/g, "")
          .replace(/^(.)/, (b) => b.toLowerCase());

      // Extract headers dynamically
      for (let cell in worksheet) {
        if (cell[0] === "!") continue;
        const col = cell.match(/[A-Z]+/)[0];
        const row = parseInt(cell.match(/\d+/)[0]);
        const value = worksheet[cell].v.toString().trim();

        if (row === 1) {
          headers[col] = camelCase(value);
        } else {
          if (!volunteerRows[row]) volunteerRows[row] = {};
          volunteerRows[row][headers[col]] = value;
        }
      }

      // Removing undefined entries
      volunteersData = [...volunteersData, ...volunteerRows.filter((v) => v)];
    });

    // Validation & Formatting
    const formattedVolunteers = volunteersData.map((vol, index) => {
      if (!vol.name || !vol.course || !vol.rollNumber || !vol.postHolded || !vol.session) {
        throw new Error(`Missing required fields in row ${index + 2}`);
      }
      if (vol.course === "B.Tech" && !vol.branch) {
        throw new Error(`Branch is required for B.Tech student in row ${index + 2}`);
      }
      return {
        ...vol,
        name: vol.name.toUpperCase(),
        course: vol.course.toUpperCase(),
        postHolded: vol.postHolded.toUpperCase(),
        session: /^\d{4}-\d{4}$/.test(vol.session) ? vol.session : (() => {
          throw new Error(`Invalid session format in row ${index + 2}`);
        })(),
        rollNumber: Number(vol.rollNumber),
      };
    });

    await Volunteer.insertMany(formattedVolunteers);
    console.log("Data added successfully");

    fs.unlinkSync(filePath);
    return res.status(200).json({ message: "Successfully added data" });
  } catch (err) {
    fs.unlinkSync(filePath);
    return res.status(500).json({ error: err.message });
  }
};


export { getVolunteersData, addVolunteerData, addVolunteerDataViaExcel };