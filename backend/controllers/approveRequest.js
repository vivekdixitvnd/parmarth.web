import nodemailer from "nodemailer";
import fs from "fs";
import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import path from "path";
import toTitleCase from "../util/titleCaseConverter.js";
import Certificate from "../models/certificate.js";
import EventVolunteer from "../models/eventVolunteers.js";
import Request from "../models/request.js";

import { createSVGWindow } from "svgdom";
const window = createSVGWindow();
import SVG from "svg.js";
const document = window.document;

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const certificateTemplatePath = path.join(__dirname, "..", "assets", "certificate.svg");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PSWD,
  },
});

const approveRequest = async (req, res, next) => {
  const requestId = req.params.id

  try {
    const request = await Request.findById(requestId);
    console.log(request)
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
    });

    const draw = SVG(document.documentElement);
    console.log(draw)

    const { purpose } = request;
    console.log(purpose)
    if (purpose === "event") {
      try {
        const eventVolunteer = await EventVolunteer.findOne({
          name: request.name,
          rollNumber: request.rollNumber,
        });
        console.log(eventVolunteer)

        const { branch, academicYear, certificateNumber } = eventVolunteer;
        const name = toTitleCase(eventVolunteer.name);
        const responsibility = toTitleCase(eventVolunteer.responsibility);

        const nameSVG = draw
          .text(name)
          .size(45)
          .attr("x", "50%")
          .attr("y", "42%")
          .attr("text-anchor", "middle");

        const branchSVG = draw
          .text(branch)
          .size(20)
          .attr("x", "50%")
          .attr("y", "55%")
          .attr("text-anchor", "middle");

        const responsibilitySVG = draw
          .text(responsibility)
          .size(20)
          .attr("x", "60%")
          .attr("y", "55%")
          .attr("text-anchor", "middle");

        const academicYearSVG = draw
          .text(`${academicYear}-`)
          .size(16)
          .attr("x", "65%")
          .attr("y", "10%")
          .attr("text-anchor", "middle");

        const certificateNumberSVG = draw
          .text(certificateNumber)
          .size(16)
          .attr("x", "70%")
          .attr("y", "10%")
          .attr("text-anchor", "middle");

        SVGtoPDF(doc, fs.readFileSync(certificateTemplatePath));
        SVGtoPDF(doc, nameSVG.svg());
        SVGtoPDF(doc, branchSVG.svg());
        SVGtoPDF(doc, responsibilitySVG.svg());
        SVGtoPDF(doc, academicYearSVG.svg());
        SVGtoPDF(doc, certificateNumberSVG.svg());

        const certificatePath = `certificate-${name}.pdf`;

        doc.pipe(fs.createWriteStream(certificatePath));
        doc.end();

        const mailDetails = {
          from: process.env.EMAIL,
          to: eventVolunteer.email,
          cc: process.env.EMAIL,
          subject: "Parmarth Certificate",
          html: `<img draggable="false" src="https://drive.google.com/uc?id=1VD0pfPT3F_iTP1BgjERkub2GA-UEmAPM" width="100px" height="100px"/><p>Hi ${name},</p><p>Your request for Parmarth Certificate generation is approved.</p><p>Please find attached certificate for the same.</p><p>Regards,<br/>Team Parmarth</p><p><a href="https://parmarth.ietlucknow.ac.in/" target="_blank" rel="noreferrer">Parmarth Social Club</a>, IET Lucknow</p>`,
          attachments: [
            {
              path: certificatePath,
            },
          ],
        };

        transporter.sendMail(mailDetails, (err) => {
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
              .catch((err) => console.error("Error saving certificate data:", err));

            return res.status(200).json({ message: "Mail sent successfully" });
          }
        });
      } catch (error) {
        return res.status(422).json({ error: error.message });
      }
    } else {
      // For other types of certificates
      // Implement the logic here
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { approveRequest };









































// import nodemailer from "nodemailer";
// import fs from "fs";
// import PDFDocument from "pdfkit";
// import SVGtoPDF from "svg-to-pdfkit";
// import path from "path";
// import toTitleCase from "../util/titleCaseConverter.js";
// import Certificate from "../models/certificate.js";
// import EventVolunteer from "../models/eventVolunteers.js";

// import { createSVGWindow } from "svgdom";
// const window = createSVGWindow();
// import SVG from "svg.js";
// const document = window.document;

// const __filename = new URL(import.meta.url).pathname;
// const __dirname = path.dirname(__filename);

// const certificateTemplatePath = path.join(__dirname, "..", "assets", "certificate.svg");

// const transporter = nodemailer.createTransport({
//   service: "hotmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_APP_PSWD,
//   },
// });

// const approveRequest = async (req, res, next) => {
//   const requestId = req.params.id;

//   try {
//     const request = await Request.findById(requestId);
//     if (!request) {
//       return res.status(404).json({ error: "Request not found" });
//     }

//     const doc = new PDFDocument({
//       layout: "landscape",
//       size: "A4",
//     });

//     const draw = SVG(document.documentElement);

//     const { purpose } = request;

//     if (purpose === "event") {
//       try {
//         const eventVolunteer = await EventVolunteer.findOne({
//           name: request.name,
//           rollNumber: request.rollNumber,
//         });

//         const { branch, academicYear, certificateNumber } = eventVolunteer;
//         const name = toTitleCase(eventVolunteer.name);
//         const responsibility = toTitleCase(eventVolunteer.responsibility);

//         const nameSVG = draw
//           .text(name)
//           .size(45)
//           .attr("x", "50%")
//           .attr("y", "42%")
//           .attr("text-anchor", "middle");

//         const branchSVG = draw
//           .text(branch)
//           .size(20)
//           .attr("x", "50%")
//           .attr("y", "55%")
//           .attr("text-anchor", "middle");

//         const responsibilitySVG = draw
//           .text(responsibility)
//           .size(20)
//           .attr("x", "60%")
//           .attr("y", "55%")
//           .attr("text-anchor", "middle");

//         const academicYearSVG = draw
//           .text(`${academicYear}-`)
//           .size(16)
//           .attr("x", "65%")
//           .attr("y", "10%")
//           .attr("text-anchor", "middle");

//         const certificateNumberSVG = draw
//           .text(certificateNumber)
//           .size(16)
//           .attr("x", "70%")
//           .attr("y", "10%")
//           .attr("text-anchor", "middle");

//         SVGtoPDF(doc, fs.readFileSync(certificateTemplatePath));
//         SVGtoPDF(doc, nameSVG.svg());
//         SVGtoPDF(doc, branchSVG.svg());
//         SVGtoPDF(doc, responsibilitySVG.svg());
//         SVGtoPDF(doc, academicYearSVG.svg());
//         SVGtoPDF(doc, certificateNumberSVG.svg());

//         const certificatePath = `certificate-${name}.pdf`;

//         doc.pipe(fs.createWriteStream(certificatePath));
//         doc.end();

//         const mailDetails = {
//           from: process.env.EMAIL,
//           to: eventVolunteer.email,
//           cc: process.env.EMAIL,
//           subject: "Parmarth Certificate",
//           html: `<img draggable="false" src="https://drive.google.com/uc?id=1VD0pfPT3F_iTP1BgjERkub2GA-UEmAPM" width="100px" height="100px"/><p>Hi ${name},</p><p>Your request for Parmarth Certificate generation is approved.</p><p>Please find attached certificate for the same.</p><p>Regards,<br/>Team Parmarth</p><p><a href="https://parmarth.ietlucknow.ac.in/" target="_blank" rel="noreferrer">Parmarth Social Club</a>, IET Lucknow</p>`,
//           attachments: [
//             {
//               path: certificatePath,
//             },
//           ],
//         };

//         transporter.sendMail(mailDetails, (err) => {
//           if (err) {
//             fs.unlinkSync(certificatePath); // Delete the certificate file if email sending fails
//             return res.status(422).json({ error: err.message });
//           } else {
//             const newCertificate = new Certificate({
//               name: name.toUpperCase(),
//               email: eventVolunteer.email.trim(),
//               branch: branch.trim(),
//               rollNumber: eventVolunteer.rollNumber,
//               purpose: purpose.trim(),
//               certificateNumber,
//               event: eventVolunteer.event,
//             });

//             newCertificate
//               .save()
//               .then(() => console.log("Certificate data saved"))
//               .catch((err) => console.error("Error saving certificate data:", err));

//             return res.status(200).json({ message: "Mail sent successfully" });
//           }
//         });
//       } catch (error) {
//         return res.status(422).json({ error: error.message });
//       }
//     } else {
//       // For other types of certificates
//       // Implement the logic here
//     }
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// export { approveRequest };
