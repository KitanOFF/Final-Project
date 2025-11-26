const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'b881a174e483e8',
      pass: 'f2fb94f79b09d5',
    },
  });

  transporter.verify((err, succ) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('success');
    }
  });

  const mailOptions = {
    from: 'semos <semos@edu.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;