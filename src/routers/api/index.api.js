import { Router } from "express";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";
import logInRouter from "./logIn.api.js";
import cookieRouter from "./cookies.router.js";
import sessionsRouter from "./sessions.router.js";
import authRouter from "./auth.router.js";
import UsersExtendRouter from "../Custom/user.extendedrouter.js";
import emailRouter from "./email.router.js";

const apiRouter = Router();

apiRouter.use("/cookies", cookieRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/userlogin", logInRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/email", emailRouter);

const usersExtendRouter = new UsersExtendRouter();
apiRouter.use("/custom", usersExtendRouter.getRouter());

export default apiRouter;
