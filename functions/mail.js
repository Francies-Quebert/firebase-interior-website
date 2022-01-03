const mailer = require("nodemailer");
// const SMTPTransport = require("nodemailer/lib/smtp-transport");

const getEmailData = (to, name, type, body) => {
  console.log(body, "body data");
  let data = null;
  switch (type) {
    case "contact":
      data = {
        from: "Azure Home and Consultants <clientsprojects2020@gmail.com>",
        to,
        subject: `Hello ${name}`,
        html: `<div>
            <p>We have received your message and would like to thank you for writing to us. If your inquiry is urgent,
             please use the telephone number listed below to talk to one of our staff members. Otherwise, 
             we will reply by email as soon as possible.</p>
            <p>+91 90045 14488 
            </p>
            <p> Talk to you soon,<p>
          </div>`,
      };
      break;
    case "admin":
      data = {
        from: "Azure Homes ad consultants <azurehomesandconsultants@gmail.com>",
        to,
        subject: `Contact Requested From ${name} @website`,
        html: `<div>
            <p>We have received your message from ${name}.
            <br />
            Subject: ${body.subject},<br/>
            Email: ${body.email},<br/>
            Phone: ${body.phone}<br/>
            Message: ${body.message}<br/></p>
            <p> This is Generated From The Website.<p>
          </div>`,
      };
      break;
    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, type, body) => {
    console.log(body, "body data send");
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "clientsprojects2020@gmail.com",
      pass: "Thikhaibhai@2020",
    },
  });

  const mail = getEmailData(to, name, type, body);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(" email sent successfully");
    }
    smtpTransport.close();
  });
  //   const sendTransport = nodemailer.createTransport({
  //     server: "Gmail",
  //     auth: {
  //       user: "clientsprojects2020@gmail.com",
  //       pass: "Thikhaibhai@2020",
  //     },
  //   });

  //   const mail = getEmailData(to, name, type);

  //   sendTransport.sendEmail(mail, function (error, response) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("email send successfully");
  //     }
  //     sendTransport.close();
  //   });
};

module.exports = { sendEmail };
