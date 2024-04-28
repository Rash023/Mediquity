const { contactUsEmail } = require("../Mail/Template/ContactForm");
const mailSender = require("../Util/MailSender");

/* CONTACT US */
exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } =
    req.body;
  try {
    await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );
    return res.json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};
