import EventVolunteer from "../models/eventVolunteers.js";
import XLSX from "xlsx";
import fs from "fs";

const getEventVolunteersData = async (req, res, next) => {
  try {
    const volunteers = await EventVolunteer.find();
    res.status(200).json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addEventVolunteerDataViaExcel = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(422).json({ error: "Upload an Excel file" });
    }

    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const sheetNameList = workbook.SheetNames;

    let volunteersData = [];

    sheetNameList.forEach((y) => {
      const worksheet = workbook.Sheets[y];
      let headers = {};
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
      for (const z in worksheet) {
        if (z[0] === "!") continue;
        const col = z.substring(0, 1);
        const row = parseInt(z.substring(1));
        const value = worksheet[z].v;
        if (row === 1) {
          headers[col] = camelCase(value.trim());
          continue;
        }
        if (!volunteersData[row]) volunteersData[row] = {};

        if (col === "E" || col === "G" || col === "H") {
          volunteersData[row][headers[col]] = +value;
        } else {
          volunteersData[row][headers[col]] = value.toString().toUpperCase();
        }
      }
      volunteersData.shift();
      volunteersData.shift();
    });

    await EventVolunteer.insertMany(volunteersData);
    
    fs.unlinkSync(filePath); // Deleting the file

    return res.status(200).json({ message: "Successfully added data" });
  } catch (err) {
    fs.unlinkSync(filePath); // Deleting the file if an error occurs
    return res.status(500).json({ error: err.message });
  }
};

export { getEventVolunteersData, addEventVolunteerDataViaExcel };
