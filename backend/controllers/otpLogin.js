import fs from "fs";
import jwt from "jsonwebtoken";
import transporter from "../config/emailTransporter.js";

// Send OTP to any emailre
export const sendLoginOtp = async (req, res) => {
  const  email  =  req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    fs.writeFileSync(`otp-login-${email}.txt`, otp, "utf-8");

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: "vivekdixit504@gmail.com",
      subject: "Your OTP for Login",
      html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

// Verify OTP and generate 1hr JWT login
export const verifyLoginOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOtpPath = `otp-login-${email}.txt`;
    if (!fs.existsSync(storedOtpPath)) {
      return res.status(410).json({ error: "OTP expired or not requested" });
    }

    const storedOtp = fs.readFileSync(storedOtpPath, "utf-8");
    if (storedOtp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    fs.unlinkSync(storedOtpPath); // Remove OTP after use

    // ✅ Token will contain only email (since no DB lookup)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { email },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
