import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure : false,    // true for port 465 but false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PWD,
  },
});

export default transporter;