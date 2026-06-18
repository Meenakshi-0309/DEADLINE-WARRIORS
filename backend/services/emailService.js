process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }

});


const sendEmail = async (email, title, deadline) => {

  try {

    await transporter.sendMail({

      from: process.env.EMAIL,

      to: email,

      subject: "Task Reminder",

      html: `
        <h2>🔔 Task Reminder</h2>

        <h3>${title}</h3>

        <p>
          Your task deadline is:
          <b>${deadline}</b>
        </p>

        <p>
          Please complete it before the deadline.
        </p>
      `

    });


    console.log(
      "Email sent successfully to:",
      email
    );


  } catch(error) {

    console.log(
      "Email Error:",
      error.message
    );

  }

};


module.exports = sendEmail;