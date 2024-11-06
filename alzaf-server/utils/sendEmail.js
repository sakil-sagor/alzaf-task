const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "tendertradinginc9@gmail.com",
      pass: "mikgrsgpnxcoubgo",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: '"Tender Trading Inc." <tendertradinginc9@gmail.com>',
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email:", error);
  }
};

module.exports = sendEmail;

// tender: tqeceloapbekxnce;
// tender2: "mikgrsgpnxcoubgo"
// tendertradinginc1@gmail.com
// tender: tiryqnufokjybnee
