import { Router } from "express";
import {
  sendEmail,
  sendEmailWithAttachments,
  sendResetPasswordEmail,
  resetPasswordController,
} from "../../controllers/email.controller.js";

const emailRouter = Router();

emailRouter.get("/", sendEmail);
emailRouter.get("/attachments", sendEmailWithAttachments);

emailRouter.post("/reset-password/", sendResetPasswordEmail);
emailRouter.post("/new-password/:token", resetPasswordController);

export default emailRouter;
