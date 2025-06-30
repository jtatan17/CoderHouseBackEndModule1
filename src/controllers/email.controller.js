import nodemailer from "nodemailer";
import pathHandler from "../middleware/pathHandler.mid.js";
import __dirname from "../../utils.js";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../helpers/bcrypt.helper.js";

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

export const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userRepository.readBy({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetLink = `http://localhost:8080/newPassword/${token}`;

    const mailOptions = {
      from: `YourApp <${emailAccount}>`,
      to: email,
      subject: "Reset your password",
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to create a new password. This link is valid for 1 hour.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Failed to send email", error: err });
      res.status(200).send({ message: "Reset link sent", info });
    });
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err });
  }
};

// ✅ Reset password with token
export const resetPasswordController = async (req, res) => {
  console.log("🔐 Entered resetPasswordController");
  const { token } = req.params;
  const { newPassword, confirmNewPassword } = req.body;

  if (!newPassword || !confirmNewPassword)
    return res.status(400).send({ message: "Both fields are required" });

  if (newPassword !== confirmNewPassword)
    return res.status(400).send({ message: "Passwords do not match" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await userRepository.readById(decoded.uid);
    console.log(user);
    if (!user) return res.status(404).send({ message: "User not found" });

    const isSame = isValidPassword(user, newPassword);
    if (isSame)
      return res
        .status(400)
        .send({ message: "New password must be different" });

    const hashedPassword = createHash(newPassword);
    await userRepository.updateById(user._id, { password: hashedPassword });

    res.status(200).send({ message: "Password successfully updated" });
  } catch (err) {
    res
      .status(401)
      .send({ message: "Token expired or invalid", error: err.message });
  }
};
