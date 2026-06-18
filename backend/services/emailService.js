const nodemailer =
require("nodemailer");

const transporter =
nodemailer.createTransport({

  service:"gmail",

  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAIL_PASSWORD
  }

});

const sendEmail =
async(email,title,deadline)=>{

  await transporter.sendMail({

    from:process.env.EMAIL,

    to:email,

    subject:"Task Reminder",

    html:`
      <h2>${title}</h2>
      <p>
      Deadline:
      ${deadline}
      </p>
    `

  });

};

module.exports = sendEmail;