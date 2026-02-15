import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getOrganizationData = async (req, res, next) => {
  try {
    const dataPath = path.join(__dirname, "../data/organization.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const organizationData = JSON.parse(fileContent);
    res.status(200).json(organizationData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrganizationData = async (req, res, next) => {
  try {
    const dataPath = path.join(__dirname, "../data/organization.json");
    fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2), "utf-8");
    res.status(200).json({ message: "Organization data updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getOrganizationData, updateOrganizationData };
