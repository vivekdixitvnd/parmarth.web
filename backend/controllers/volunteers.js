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

  if (!name || !course || !rollNumber || !postHolded || !session) {
    return res.status(422).json({ error: "All fields are required" });
  }

  var branch = "";
  if (course === "B.Tech") {
    if (!req.body.branch) {
      return res
        .status(422)
        .json({ error: "Branch is required for B.Tech students" });
    }
    branch = req.body.branch;
  }

  try {
    const existingData = await Volunteer.findOne({ rollNumber, session });

    if (existingData) {
      return res.status(422).json({ error: "Data Already Exist" });
    }

    // **Generate the reference number**
    const refrence = await generateReferenceNumber(rollNumber, session);

    const volunteerData = new Volunteer({
      name: name.trim().toUpperCase(),
      course: course.trim().toUpperCase(),
      rollNumber: +rollNumber,
      postHolded: postHolded.trim().toUpperCase(),
      session: session.trim(),
      refrence, // **Add reference number here**
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
  // Count session-wise entries
  const sessionCount = await Volunteer.countDocuments({ session });

  // Serial number based on count
  const serialNumber = (sessionCount + 1).toString().padStart(2, "0");

  // Roll number ke kuch parts lena hai for reference
  const rollStr = rollNumber.toString();
  const part1 = rollStr.substring(0, 2); // First 2 digits
  const part2 = rollStr.substring(6, 9); // 7th to 9th digits
  const part3 = rollStr.substring(11, 13); // Last 2 digits

  // Reference number format
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
      } // <-- Yeh closing brace yahan missing thi

      // Push volunteer data
      volunteerRows.forEach((row) => {
        if (row) volunteersData.push(row);
      });
    });

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        console.log("File deleted");
      }
    });

    return res.status(200).json({ message: "Successfully added data" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export { getVolunteersData, addVolunteerData, addVolunteerDataViaExcel };
