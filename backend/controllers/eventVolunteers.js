import EventVolunteer from "../models/eventVolunteers.js";
import XLSX from "xlsx";
import fs from "fs";

const getEventVolunteersData = async (req, res, next) => {
  try {
    const volunteers = await EventVolunteer.find();

    // Convert all string values to uppercase
    const upperCaseVolunteers = volunteers.map(volunteer => {
      return Object.fromEntries(
        Object.entries(volunteer.toObject()).map(([key, value]) => [
          key,
          typeof value === "string" ? value.toUpperCase() : value
        ])
      );
    });

    res.status(200).json(upperCaseVolunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEventVolunteerDataByAcademicYear = async (req, res, next) => {
  const academicYear = req.params.academicYear;
  try {
    const eventVolunteers = await EventVolunteer.find({ academicYear: academicYear });
    res.status(200).json(eventVolunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const addEventVolunteerDataViaExcel = async (req, res, next) => {
  if (!req.file) {
    return res.status(422).json({ error: "Upload an Excel file" });
  }

  const filePath = req.file.path;

  try {
    // Read Excel File
    const workbook = XLSX.readFile(filePath);
    const sheetNameList = workbook.SheetNames;

    let volunteersData = [];

    // Loop through sheets
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
          headers[col] = camelCase(value); // Set header names as keys
        } else {
          if (!volunteerRows[row]) volunteerRows[row] = {};
          volunteerRows[row][headers[col]] = value;
        }
      }

      // Push volunteer data
      volunteerRows.forEach((row) => {
        if (row) volunteersData.push(row);
      });
    });

    // Check if data is coming properly
    if (volunteersData.length === 0) {
      fs.unlink(filePath, () => {});
      return res.status(400).json({ error: "No valid data found in Excel." });
    }

    // Insert data to DB
    await EventVolunteer.insertMany(volunteersData);

    // Delete file after inserting data
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err.message);
      } else {
        console.log("File deleted successfully");
      }
    });

    return res.status(200).json({ message: "Data successfully added to the database", data: volunteersData });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export { getEventVolunteersData, getEventVolunteerDataByAcademicYear, addEventVolunteerDataViaExcel };
