import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "nguyenhua2508@gmail.com",
    pass: "dwpazfixbkwdtabo",
  },
});

const sendOtpEmail = (email, otp) => {
  const mailOptions = {
    from: "nguyenhua2508@gmail.com",
    to: email,
    subject: "OTP for Password Reset",
    text: `Your OTP for password reset is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export default sendOtpEmail;
