const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // true if using 465
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PSWD,
  },
  tls: {
    rejectUnauthorized: false, // Ignore self-signed certs if testing locally
  },
});

export default transporter;