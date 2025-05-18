import fs from "fs";
import jwt from "jsonwebtoken";
import transporter from "../config/emailTransporter.js";

// Send OTP to any emailre
export const sendLoginOtp = async (req, res) => {
  const  { name }  =  req.body;

  try {
    console.log("📩 Request received to send OTP to:", name);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("🔢 Generated OTP:", otp);

    fs.writeFileSync(`otp-login-${name}.txt`, otp, "utf-8");
    console.log("📁 OTP written to file:", `otp-login-${name}.txt`);

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: "vivekdixit504@gmail.com",
      subject: `${name} has requested OTP for Login`,
      html: `<p> OTP for the temporary attendance login is <strong>${otp}</strong></p>`,
    });

    console.log("✅ OTP email sent successfully for:", name);
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("❌ Failed to send OTP:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};


// Verify OTP and generate 1hr JWT login
export const verifyLoginOtp = async (req, res) => {
  const { name, otp } = req.body;

  try {
    console.log("🛡️ Verifying OTP for:", name);
    const storedOtpPath = `otp-login-${name}.txt`;

    if (!fs.existsSync(storedOtpPath)) {
      console.warn("⚠️ OTP file does not exist:", storedOtpPath);
      return res.status(410).json({ error: "OTP expired or not requested" });
    }

    const storedOtp = fs.readFileSync(storedOtpPath, "utf-8");
    console.log("📤 OTP from file:", storedOtp);
    console.log("📥 OTP received from client:", otp);

    if (storedOtp !== otp) {
      console.warn("❌ OTP mismatch");
      return res.status(401).json({ error: "Invalid OTP" });
    }

    fs.unlinkSync(storedOtpPath);
    console.log("🗑️ OTP file deleted after successful match");

    const token = jwt.sign({ name }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5m",
    });

    console.log("🔐 JWT generated successfully for:", name);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { name },
    });
  } catch (err) {
    console.error("❌ Error in OTP verification:", err);
    res.status(500).json({ error: "Login failed" });
  }
};
