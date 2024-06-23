// @/pages/api/contact
// Module to send email

import nodemailer from "nodemailer";

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    // Log the request body and environment variables
    console.log("Request Body:", req.body);
    console.log("Email User:", process.env.EMAIL_USER);
    console.log(
      "Email Pass:",
      process.env.EMAIL_PASS ? "Loaded" : "Not Loaded",
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: "joshuadanpeterson@gmail.com",
      subject: `Contact Form Submission: ${subject}`,
      text: `You have a new contact form submission from:
      
      Name: ${name}
      Email: ${email}
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
