import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.TNM_SERVICE,
  auth: {
    user: process.env.TNM_USER,
    pass: process.env.TNM_PASS,
  }
});

export default transporter;