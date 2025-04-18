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
    return {
      error: "Please fill all the fields",
    };
  }
  const mailOptions = {
    from: email,
    to: "asrafulislam0312@gmail.com",
    subject: subject,
    text: message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return {
        error: error,
      };
    } else {
      console.log("Email sent: " + info.response);
      return {
        success: "Email sent successfully",
      };
    }
  });
};
