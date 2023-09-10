const nodemailer = require("nodemailer");
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const htmlContent = fs.readFileSync(path.join(__dirname, 'template.ejs'), 'utf8'); 

const sendEmail = async (subject, message, send_to, reply_to, name) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  //how to render variables into a ejs file
  const renderedHtml = ejs.render(htmlContent, { message, name });

  const options = {
    // from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: renderedHtml,
  };

  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.error(err);
    } else {
      console.error(info);
    }
  });
};

module.exports = sendEmail;