const nodemailer = require("nodemailer")
require('dotenv').config();

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
      secure: false,
    })
    let info = await transporter.sendMail({
      from: `"Mediquity" <${process.env.MAIL_USER}>`,
      to: `${email}`, 
      subject: `${title}`, 
      html: `${body}`, 
    })
    return info
  } 
  catch (error) {
    console.log(error.message)
    return error.message
  }
}

module.exports = mailSender
