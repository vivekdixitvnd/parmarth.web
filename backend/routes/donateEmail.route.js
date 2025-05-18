import nodemailer from "nodemailer";
import { Router } from "express";
import transporter from "../config/emailTransporter";

const router = Router();

const sendEmail = async (subject, content, recipientEmail) => {
  const mailOptions = {
    from: "parmarth@ietlucknow.ac.in",
    to: recipientEmail,
    subject: subject,
    text: content,
  };

   console.log(mailOptions);
    

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Example usage for HealthCareForm
router.post("/api/medical-help", async (req, res) => {
  const { email, name, contactNumber, donationAmount, ietConnection } =
    req.body;

  const subject = "Medical Help Donation";
  const content = `
    Name: ${name}
    Email: ${email}
    Contact Number: ${contactNumber}
    Donation Amount: ₹${donationAmount}
    IET Connection: ${ietConnection}
  `;

  await sendEmail(subject, content, "parmarth@ietlucknow.ac.in");
  res.status(200).send("Form submitted successfully");
});

// Example usage for SponsorChildForm
router.post("/api/sponsor-child", async (req, res) => {
  const {
    name,
    email,
    phone,
    ietConnection,
    numberOfChildren,
    sponsorshipDetails,
  } = req.body;

  const subject = "Child Sponsorship Request";
  const content = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Number of Children: ${numberOfChildren}
    Sponsorship Details: ${sponsorshipDetails}
    IET Connection: ${ietConnection}
  `;

  await sendEmail(subject, content, "parmarth@ietlucknow.ac.in");
  res.status(200).send("Form submitted successfully");
});

// Example usage for DonationForm
router.post("/api/donate", async (req, res) => {
  const {
    email,
    name,
    contactNumber,
    ietConnection,
    donationType,
    donationAmount,
  } = req.body;

  const donationTypeArray = Array.isArray(donationType) ? donationType : [donationType];
  const subject = "Donation to Parmarth";
  const content = `
    Name: ${name}
    Email: ${email}
    Contact Number: ${contactNumber}
    Donation Type: ${donationType.join(", ")}
    Donation Amount: ₹${donationAmount}
    IET Connection: ${ietConnection}
  `;

  await sendEmail(subject, content, "parmarth@ietlucknow.ac.in");
  res.status(200).send("Form submitted successfully");
});


export default router
