const nodemailer = require("nodemailer");
const { SMTP_PASS, SMTP_USER, SMTP_PORT, SMTP_HOST } = process.env;
// async..await is not allowed in global scope, must use a wrapper
const maileHelper = async (email, subject, message, link) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: '"IONVU STORE 👻" ionvu@store', // sender address
    to: email,
    subject: subject,
    text: message,
    html: `<div>
    <p>Reset Password Link: ${message} </p>
    <div>${link}</div>
    <a href="${link}">Link</a>
    </div>`,
  });
};
module.exports = maileHelper;
