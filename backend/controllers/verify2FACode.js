import Admin from "../models/admin.js";
import fs from "fs";
import jwt from "jsonwebtoken";

const verify2FACode = async (req, res, next) => {
  try {
    const { userId, enteredCode } = req.body;

    const loadedUser = await Admin.findById(userId);

    if (!loadedUser) {
      return res.status(422).json({ error: "User Not found!" });
    }

    const authCode = fs.readFileSync(`authCode-${userId}.txt`, "utf-8");

    if (authCode === enteredCode.toString()) {
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "12h",
        }
      );

      fs.unlinkSync(`authCode-${userId}.txt`);

      return res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        expiresIn: 43200,
      });
    } else {
      return res.status(422).json({ error: "2FA Code is not valid" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { verify2FACode };
