const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAILHOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPASSWORD,
  },
});

const mailTransporter = async (mail) => {
  const mailOptions = {
    from: process.env.MAILFROM,
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = {
  mailTransporter,
};
