import nodemailer from "nodemailer";
import fs from "fs";
import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import path from "path";
import toTitleCase from "../util/titleCaseConverter.js";
import Certificate from "../models/certificate.js";
import EventVolunteer from "../models/eventVolunteers.js";
import Volunteer from "../models/volunteers.js";
import Request from "../models/request.js";
import Signature from "../models/signature.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // true if using 465
  auth: {
    user: "vivekdixit504@gmail.com",
    pass: "aois onph efad xeca",
  },
  // debug: true, // Debug mode on
  // logger: true, // Logs all activity
  tls: {
    rejectUnauthorized: false, // Ignore self-signed certs if testing locally
  },
});

import { createSVGWindow } from "svgdom";
const window = createSVGWindow();
import { SVG, registerWindow } from "@svgdotjs/svg.js";
const document = window.document;
registerWindow(window, document);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certificateTemplatePath = path.join(
  __dirname,
  "..",
  "assets",
  "certificate.svg",
);

const approveRequest = async (req, res, next) => {
  const requestId = req.params.id;

  try {
    const request = await Request.findById(requestId);
    // console.log(request)
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // ✅ Get both signatures
    const faculty1Sig = await Signature.findOne({ uploadedBy: "faculty1" });
    const faculty2Sig = await Signature.findOne({ uploadedBy: "faculty2" });

    if (!faculty1Sig || !faculty2Sig) {
      return res
        .status(400)
        .json({ error: "Both signatures must be uploaded first" });
    }

    // ✅ Convert base64 to temp PNG files
    const faculty1SigPath = path.join(__dirname, "..", "uploads/signatures", "sig1.jpg");
    const faculty2SigPath = path.join(__dirname, "..", "uploads/signatures", "sig2.jpg");

    fs.writeFileSync(
      faculty1SigPath,
      faculty1Sig.signatureUrl.replace(/^data:image\/\w+;base64,/, ""),
      "base64",
    );
    fs.writeFileSync(
      faculty2SigPath,
      faculty2Sig.signatureUrl.replace(/^data:image\/\w+;base64,/, ""),
      "base64",
    );

    console.log('faculty1SigPath:', faculty1SigPath);
    console.log('faculty2SigPath:', faculty2SigPath);

    console.log('File exists (fac1)?', fs.existsSync(faculty1SigPath));
    console.log('File exists (fac2)?', fs.existsSync(faculty2SigPath));

    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
    });

    const certificateSVG = fs.readFileSync(certificateTemplatePath, "utf8");

    // Draw object create karo
    const draw = SVG(document.documentElement);
    draw.svg(certificateSVG); // Template ko integrate karo


    const { purpose } = request;
    
    if (purpose === "event") {
      try {
        const eventVolunteer = await EventVolunteer.findOne({
          name: request.name.toLowerCase(),
          rollNumber: request.rollNumber,
        });

        const name = eventVolunteer.name.toUpperCase();
        const responsibility = eventVolunteer.responsibility.toUpperCase();
        const branch = eventVolunteer.branch.toUpperCase();
        const eventDate = eventVolunteer.eventDate;
        const certificateNumber =
          eventVolunteer.certificateNumber.toUpperCase();

        // Add all texts to the certificate
        const vivek =
          "for participating in MUSKAAN (The cloth distribution event) organized";
        const vivek1 =
          "by PARMARTH (The Social Club of IET Lucknow) and for your";
        const vivek2 = "commitment to social welfare.";

        draw
          .text(name)
          .attr("x", "50%")
          .attr("y", "44%")
          .attr("text-anchor", "middle")
          .attr("font-size", "52")
          .attr("font-family", "Cerebri")
          .attr("font-weight", "bold");

        draw
          .text(`BRANCH: ${branch}`)
          .attr("x", "68%")
          .attr("y", "56%")
          .attr("text-anchor", "right")
          .attr("font-size", "26")
          .attr("font-family", "Cerebri")
          .attr("font-weight", "bold");

        draw
          .text(`RESPONSIBILITY: ${responsibility}`)
          .attr("x", "16%")
          .attr("y", "56%")
          .attr("text-anchor", "left")
          .attr("font-size", "26")
          .attr("font-family", "Cerebri")
          .attr("font-weight", "bold");

        draw
          .text(`Event Date: ${eventDate}`)
          .attr("x", "7%")
          .attr("y", "8%")
          .attr("text-anchor", "left")
          .attr("font-size", "18")
          .attr("font-family", "Cerebri");

        draw
          .text(`Ref. No: ${certificateNumber}`)
          .attr("x", "72%")
          .attr("y", "8%")
          .attr("text-anchor", "right")
          .attr("font-size", "18")
          .attr("font-family", "Cerebri");

        // Add Faculty 1 Signature
        draw.image(faculty1SigPath, 100, 420, { width: 100 }); // x, y, width

        // Add Faculty 2 Signature
        draw.image(faculty2SigPath, 620, 420, { width: 100 }); // adjust position as per template

        draw
          .text(vivek)
          .attr("x", "50%")
          .attr("y", "62%")
          .attr("text-anchor", "middle")
          .attr("font-size", "25")
          .attr("font-family", "Cerebri");
        draw
          .text(vivek1)
          .attr("x", "50%")
          .attr("y", "66%")
          .attr("text-anchor", "middle")
          .attr("font-size", "25")
          .attr("font-family", "Cerebri");
        draw
          .text(vivek2)
          .attr("x", "50%")
          .attr("y", "70%")
          .attr("text-anchor", "middle")
          .attr("font-size", "25")
          .attr("font-family", "Cerebri");

        // Create PDF and add the modified SVG to it
        SVGtoPDF(doc, draw.svg(), 0, 0);
        const certificatePath = `certificate-${name}.pdf`;
        doc.pipe(fs.createWriteStream(certificatePath));
        doc.end();
        const mailDetails = {
          from: "vivekdixit504@gmail.com", // Mailtrap se match karo
          to: eventVolunteer.email,
          cc: "",
          subject: "Parmarth Requested Certificate is Approved",
          html: `<p>Dear ${name},</p><p>Your request for Parmarth Certificate generation is approved.</p><p>Please find attached certificate for the same.</p><p>Warm Regards,<br/>Parmarth - Social Club<br/>Institute of Engineering and Technology, Lucknow<br/><a href="https://parmarth.ietlucknow.ac.in/" target="_blank" rel="noreferrer">https://parmarth.ietlucknow.ac.in/</a></p>`,
          attachments: [
            {
              path: certificatePath,
            },
          ],
        };

        transport.sendMail(mailDetails, (err, info) => {
          if (err) {
            fs.unlinkSync(certificatePath); // Delete the certificate file if email sending fails
            return res.status(422).json({ error: err.message });
          } else {
            const newCertificate = new Certificate({
              name: name.toUpperCase(),
              email: eventVolunteer.email.trim(),
              branch: branch.trim(),
              rollNumber: eventVolunteer.rollNumber,
              purpose: purpose.trim(),
              certificateNumber,
              event: eventVolunteer.event,
            });

            newCertificate
              .save()
              .then(() => console.log("Certificate data saved"))
              .catch((err) =>
                console.error("Error saving certificate data:", err),
              );

            return res.status(200).json({ message: "Mail sent successfully" });
          }
        });
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    } else if (purpose === "general") {
      try {
        const volunteer = await Volunteer.findOne({
          name: request.name.toUpperCase(),
          rollNumber: request.rollNumber,
        });

        const { branch, session, refrence } = volunteer;
        const name = volunteer.name.toUpperCase();
        const postHolded = volunteer.postHolded.toUpperCase();

        // Add all texts to the certificate
        const vivek =
          "Played a valuable role in PARMARTH – The Social Club of IET Lucknow,";
        const vivek1 =
          "showcasing dedication, creativity, and a strong sense of responsibility.";
        const vivek2 =
          "Wishing continued success and excellence in all future endeavors.";

        draw
          .text(name)

          .attr("x", "50%")
          .attr("y", "44%")
          .attr("text-anchor", "middle")
          .attr("font-size", "52")
          .attr("font-family", "Cerebri")
          .attr("font-weight", "bold");

        draw
          .text(`BRANCH: ${branch}`)
          .attr("x", "68%")
          .attr("y", "56%")
          .attr("text-anchor", "right")
          .attr("font-size", "26")
          .attr("font-family", "Cerebri")
          .attr("font-weight", "bold");

        draw
          .text(`RESPONSIBILITY: ${postHolded}`)
          .attr("x", "15%")
          .attr("y", "56%")
          .attr("text-anchor", "left")
          .attr("font-size", "26")
          .attr("font-family", "Cerebri")
          .attr("font-weight", "bold");

        draw
          .text(`Session: ${session}`)
          .attr("x", "7%")
          .attr("y", "8%")
          .attr("text-anchor", "left")
          .attr("font-size", "18")
          .attr("font-family", "Cerebri");

        draw
          .text(`Ref. No: ${refrence}`)
          .attr("x", "74%")
          .attr("y", "8%")
          .attr("text-anchor", "right")
          .attr("font-size", "18")
          .attr("font-family", "Cerebri");

          

        draw
          .text(vivek)
          .attr("x", "50%")
          .attr("y", "62%")
          .attr("text-anchor", "middle")
          .attr("font-size", "25")
          .attr("font-family", "Cerebri");
        draw
          .text(vivek1)
          .attr("x", "50%")
          .attr("y", "66%")
          .attr("text-anchor", "middle")
          .attr("font-size", "25")
          .attr("font-family", "Cerebri");
        draw
          .text(vivek2)
          .attr("x", "50%")
          .attr("y", "70%")
          .attr("text-anchor", "middle")
          .attr("font-size", "25")
          .attr("font-family", "Cerebri");

        // Create PDF and add the modified SVG to it
        SVGtoPDF(doc, draw.svg(), 0, 0);

        doc.image('./assets/signatures/ajay.jpg', 200, 430, { width: 80 }); // Adjust position
        doc.image('./assets/signatures/pawan.jpg', 550, 430, { width: 80 }); // Adjust position

        const certificatePath = `certificate-${name}.pdf`;
        doc.pipe(fs.createWriteStream(certificatePath));
        doc.end();
        const mailDetails = {
          from: "vivekdixit504@gmail.com", // Mailtrap se match karo
          to: volunteer.email,
          cc: "",
          subject: "Parmarth Requested Certificate is Approved",
          html: `<p>Dear ${name},</p><p>Your request for Parmarth Certificate generation is approved.</p><p>Please find attached certificate for the same.</p><p>Warm Regards,<br/>Parmarth - Social Club<br/>Institute of Engineering and Technology, Lucknow<br/><a href="https://parmarth.ietlucknow.ac.in/" target="_blank" rel="noreferrer">https://parmarth.ietlucknow.ac.in/</a></p>`,
          attachments: [
            {
              path: certificatePath,
            },
          ],
        };

        transport.sendMail(mailDetails, (err, info) => {
          if (err) {
            fs.unlinkSync(certificatePath); // Delete the certificate file if email sending fails
            return res.status(422).json({ error: err.message });
          } else {
            const newCertificate = new Certificate({
              name: name.toUpperCase(),
              email: volunteer.email.trim(),
              branch: branch.trim(),
              rollNumber: volunteer.rollNumber,
              purpose: purpose.trim(),
              refrence,
            });

            newCertificate
              .save()
              .then(() => console.log("Certificate data saved"))
              .catch((err) =>
                console.error("Error saving certificate data:", err),
              );

            return res.status(200).json({ message: "Mail sent successfully" });
          }
        });
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    } else {
      // add other type of certificates
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { approveRequest };