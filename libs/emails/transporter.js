const nodemailer = require("nodemailer");

let transporter;

const setTransporter = () => {
  if (transporter) {
    return;
  }

  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_TRANSPORTER_SERVICE,
    auth: {
      user: process.env.EMAIL_TRANSPORTER_USER,
      pass: process.env.EMAIL_TRANSPORTER_PASSWORD,
    },
  });
};

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    to,
    from: process.env.ALERT_EMAIL_FROM,
    subject,
    html,
  });
};

module.exports = {
  sendEmail,
  setTransporter,
};
