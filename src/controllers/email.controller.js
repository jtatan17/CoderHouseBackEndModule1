import nodemailer from "nodemailer";
import pathHandler from "../middleware/pathHandler.mid.js";
import __dirname from "../../utils.js";

const emailAccount = process.env.GMAIL_ACCOUNT;
const emailPassword = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: emailAccount,
    pass: emailPassword,
  },
});
//
transporter.verify(function (err, success) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server SMTP is ready to take our message");
  }
});

const mailOptions = {
  from: `Coder Test ${emailAccount}`,
  to: emailAccount,
  subject: "Correo de prueba CoderHouse - programacion BackEnd",
  html: "<div><h1>Esto es un Test de envio de correos con Nodemailer</h1></div>",
  attachments: [],
};

export const sendEmail = (req, res) => {
  try {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ message: "Error", payload: err });
      }

      console.log(`Message sent `, info.messageId);
      res.send({ status: "Success", payload: info });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error,
      message: "No se pudo enviar el email desde:" + emailAccount,
    });
  }
};

const mailOptionsWithAttachments = {
  from: `Coder Test ${emailAccount}`,
  to: emailAccount,
  subject: "Correo de prueba CoderHouse - programacion BackEnd",
  html: `
  <div>
  <h1>Esto es un Test de envio de correos con Nodemailer con archivo adjunto</h1>
  <p>Ahora usando imagenes:</p>
  <img src="cid:meme" />
  </div>`,
  attachments: [
    {
      filename: "Meme de programacion",
      path: __dirname + "/public/images/memeprogramacion.jpg",
      cid: "meme",
    },
  ],
};

export const sendEmailWithAttachments = (req, res) => {
  try {
    transporter.sendMail(mailOptionsWithAttachments, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ message: "Error", payload: err });
      }

      console.log(`Message sent `, info.messageId);
      res.send({ status: "Success", payload: info });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error,
      message: "No se pudo enviar el email desde:" + emailAccount,
    });
  }
};
