import Rte from "../models/rte.js";
import fs from "fs";
import XLSX from "xlsx";

const getRteData = async (req, res, next) => {
  try {
    const rteData = await Rte.find();
    res.status(200).json(rteData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRteDataByAcademicYear = async (req, res, next) => {
  const academicYear = req.params.academicYear;
  try {
    const rteData = await Rte.find({ academicYear: academicYear });
    res.status(200).json(rteData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addRteData = async (req, res, next) => {
  const { studentName, classStudying, school, academicYear } = req.body;

  const isStudentNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);
  const isClassStudyingValid = (classStudying) => classStudying.trim().length > 0;
  const isSchoolValid = (school) => school.trim().length > 0;
  const isAcademicYearValid = (academicYear) => /\d{4}-\d{2}/.test(academicYear);

  if (!isStudentNameValid(studentName)) {
    return res.status(422).json({ error: "Enter a valid name" });
  } else if (!isClassStudyingValid(classStudying)) {
    return res.status(422).json({ error: "Enter class" });
  } else if (!isSchoolValid(school)) {
    return res.status(422).json({ error: "Enter school name" });
  } else if (!isAcademicYearValid(academicYear)) {
    return res.status(422).json({ error: "Enter a valid academic year (YYYY-MM)" });
  }

  const newData = {
    studentName: studentName.trim().toUpperCase(),
    classStudying: classStudying.trim().toUpperCase(),
    school: school.trim().toUpperCase(),
    academicYear: academicYear.trim().toUpperCase(),
  };

  try {
    const data = await Rte.findOne(newData);
    if (!data) {
      const newStudent = new Rte(newData);
      await newStudent.save();
      console.log("Data added");
      return res.status(201).json({ message: "Successfully added data" });
    } else if (data.studentName === newData.studentName) {
      return res.status(422).json({ error: "Same data already exists" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addRteDataViaExcel = async (req, res, next) => {
  if (!req.file) {
    return res.status(422).json({ error: "Upload an Excel file" });
  }

  const filePath = req.file.path;

  try {
    const workbook = XLSX.readFile(filePath);
    const sheetNameList = workbook.SheetNames;

    const studentsData = [];

    sheetNameList.forEach((y) => {
      const worksheet = workbook.Sheets[y];
      const headers = {};
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
      for (let z in worksheet) {
        if (z[0] === "!") continue;
        const col = z.substring(0, 1);
        const row = parseInt(z.substring(1));
        const value = worksheet[z].v;
        if (row == 1) {
          headers[col] = camelCase(value.trim());
          continue;
        }
        if (!studentsData[row]) studentsData[row] = {};
        studentsData[row][headers[col]] = value.toString().toUpperCase();
      }
      studentsData.shift();
      studentsData.shift();
    });

    await Rte.insertMany(studentsData);
    console.log("Data added");
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

export { getRteData, getRteDataByAcademicYear, addRteData, addRteDataViaExcel };
