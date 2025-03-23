import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import fs from "fs";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PSWD,
  },
});

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const adminData = await Admin.findOne({ email: email });
    if (!adminData) {
      res.status(422).json({ error: "User Not found!" });
      return "user not found";
    }
    
    if (!password || !adminData.password) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const isEqual = await bcrypt.compare(password, adminData.password);
    if (isEqual !== "user not found") {
      if (!isEqual) {
        return res.status(422).json({ error: "Wrong Password!" });
      } else if (adminData.status2FA) {
        const authCode = Math.floor(10000000 + Math.random() * 90000000);

        const details = {
          from: process.env.EMAIL,
          to: adminData.email,
          cc: process.env.EMAIL,
          subject: "Parmarth 2FA Authentication Code",
          html: `<img draggable="false" src="https://drive.google.com/uc?id=1VD0pfPT3F_iTP1BgjERkub2GA-UEmAPM" width="100px" height="100px"/><p>Hi ${adminData.email},</p><p>Your <strong>2FA</strong> Authentication code is - <strong>${authCode}</strong></p><p>Regards,<br/>Team Parmarth</p><p><a href="https://parmarth.ietlucknow.ac.in/" target="_blank" rel="noreferrer">Parmarth Social Club</a>, IET Lucknow</p>`,
        };

        transporter.sendMail(details, (err) => {
          if (err) {
            return res.status(422).json({ error: err.message });
          } else {
            fs.writeFileSync(
              `authCode-${adminData._id}.txt`,
              authCode.toString(),
              "utf-8",
            );

            return res.status(200).json({
              message: "Successfully sent 2FA code to email",
              userId: adminData._id,
            });
          }
        });
      } else {
        const token = jwt.sign(
          {
            email: adminData.email,
            userId: adminData._id.toString(),
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "12h",
          },
        );

        return res.status(200).json({
          token: token,
          userId: adminData._id.toString(),
          userType: adminData.userType,
          expiresIn: 43200,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res, next) => {
  const { email, password, userType } = req.body;

  try {
    const isEmailValid = (email) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const isPasswordValid = (password) => password.length >= 8;

    const isUserTypeValid = (userType) => {
      switch (userType) {
        case "teachers":
        case "media":
        case "master":
          return true;
        default:
          return false;
      }
    };

    if (!isEmailValid(email)) {
      return res.status(500).send({ error: "Enter a valid email address" });
    }

    if (!isPasswordValid(password)) {
      return res
        .status(500)
        .send({ error: "Password should be at least 8 characters" });
    }

    if (!isUserTypeValid(userType)) {
      return res.status(500).send({ error: "Select a valid User Type" });
    }

    const adminUser = await Admin.findOne({ email: email });
    if (!adminUser) {
      const hashPassword = bcrypt.hash(password.trim(), 10);

      const user = await Admin.create({
        email: email.trim(),
        password: hash,
        status2FA: false,
        userType: userType,
      });
      const createdUser = await Admin.findById(user._id).select("-password");
      console.log(createdUser);

      if (!createdUser) {
        return res.status(400).send({ error: "User Not created" });
      }

      return res.status(200).json({ message: "Successfully created a user" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }

  Admin.findOne({ email: email })
    .then((data) => {
      if (!data) {
      } else if (data.email === email.trim()) {
        return res.status(422).json({ error: "Same User already exist" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};

const getUsers = async (req, res, next) => {
  try {
    const user = await Admin.find(
      { email: { $exists: true } },
      { email: 1, status2FA: 1, userType: 1 },
    );

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "No User found" });
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getUserType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Admin.findOne({ _id: id }, { _id: 0, userType: 1 });

    if (!user) {
      return res.status(404).json({ error: "No User found" });
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id, masterId } = req.params;

    const masterAdmin = await Admin.findOne({
      _id: masterId,
      userType: "master",
    });

    if (!masterAdmin) {
      return res.status(422).json({
        error: "Data delete request can't be fulfilled. Not authorized.",
      });
    }

    const deletedUser = await Admin.findByIdAndRemove(id);

    if (!deletedUser) {
      return res.status(422).json({ error: "Couldn't find Data" });
    }

    return res.status(200).json({ message: "Data Deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { login, createUser, getUsers, getUserType, deleteUser };
