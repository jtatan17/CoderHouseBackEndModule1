import jwt from "jsonwebtoken";
import passport from "passport";

export const PRIVATE_KEY = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
};

export const authToken = (req, res, next) => {
  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth:", authHeader);

    if (!authHeader) {
      console.log("No authorization header found");
      return res.status(401).json({
        success: false,
        error: "Authorization header missing",
      });
    }

    // 2. Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("Malformed authorization header");
      return res.status(401).json({
        success: false,
        error: "Malformed token format. Use 'Bearer <token>'",
      });
    }

    // 3. Verify token
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
      if (error) {
        console.error("JWT verification failed:", error.name);

        let errorMessage = "Invalid token";
        if (error.name === "TokenExpiredError") {
          errorMessage = "Token expired";
        } else if (error.name === "JsonWebTokenError") {
          errorMessage = "Malformed token";
        }

        return res.status(403).json({
          success: false,
          error: errorMessage,
          details:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        });
      }

      // 4. Attach user to request
      req.user = credentials.user;
      console.log("Authenticated user:", req.user.email);
      next();
    });
  } catch (err) {
    console.error("Unexpected authentication error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal authentication error",
    });
  }
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    console.log("Entrando a llamar a" + strategy);
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);
      if (!user) {
        const isViewRequest = req.accepts("html");

        // Redirect for views, JSON error for API
        if (isViewRequest) {
          return res.redirect("/login");
        } else {
          return res
            .status(401)
            .send({
              error: info?.messages || info?.toString() || "Unauthorized",
            });
        }
      }
      console.log("Usuario obtenido de el Strategy");
      console.log(user);
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user)
      return res.status(401).send("Unauthorized: User not found in JWT");
    if (req.user.role !== role) {
      return res
        .status(401)
        .send("Forbidden: El usuario no tiene permisos con este rol");
    }
    next();
  };
};
