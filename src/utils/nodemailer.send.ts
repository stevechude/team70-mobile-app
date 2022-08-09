import nodemailer from "nodemailer";
async function sendEmail(email: any, subject: any, text: any) {
  let transport = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: subject,
    text: text,
  };
  transport.sendMail(
    mailOptions,
    function (err: any, info: { response: string }) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent " + info.response);
      }
    }
  );
}

// sendEmail("stevechude@gmail.com", "testing email", "hello there.")
export { sendEmail };
