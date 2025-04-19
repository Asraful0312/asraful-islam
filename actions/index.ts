"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

export const sendEMail = async (
  email: string,
  subject: string,
  message: string
) => {
  if (!email || !subject || !message) {
    return { error: "Please fill all the fields" };
  }

  const mailOptions = {
    from: process.env.NODE_MAILER_EMAIL, // ✅ use a trusted sender
    to: process.env.NODE_MAILER_EMAIL, // sending to yourself
    subject,
    text: `From: ${email}\n\n${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { error: "Failed to send email" };
  }
};
