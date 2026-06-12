// @/pages/api/contact
// Module to send email

import nodemailer from "nodemailer";

const DEFAULT_CONTACT_EMAIL = "joshuadanpeterson@gmail.com";
const DEFAULT_SUBJECT_TAG = "[Portfolio Contact]";

function sanitizeSubject(value) {
  return String(value || "Website inquiry")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default async (req, res) => {
  if (req.method === "POST") {
    const {
      name,
      email,
      subject,
      projectType,
      timeline,
      budgetRange,
      message,
    } = req.body;
    const subjectTag =
      process.env.CONTACT_FORM_SUBJECT_TAG || DEFAULT_SUBJECT_TAG;
    const contactRecipient =
      process.env.CONTACT_FORM_TO ||
      process.env.EMAIL_USER ||
      DEFAULT_CONTACT_EMAIL;
    const taggedSubject = `Contact Form Submission: ${sanitizeSubject(
      subject,
    )} ${subjectTag}`;
    const projectLines = [
      projectType ? `Project type: ${projectType}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      budgetRange ? `Budget range: ${budgetRange}` : null,
    ].filter(Boolean);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: contactRecipient,
      subject: taggedSubject,
      text: `You have a new contact form submission from:
      
      Name: ${name}
      Email: ${email}
      ${projectLines.length > 0 ? `${projectLines.join("\n      ")}\n      ` : ""}
      Message: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
