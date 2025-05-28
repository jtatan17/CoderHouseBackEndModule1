import passport from "passport";
import passportLocal from "passport-local";
import Users from "../Data/mongo/models/users.model.js";
import { createHash, isValidPassword } from "../helpers/bcrypt.helper.js";
import usersManager from "../Data/mongo/users.mongo.js";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { PRIVATE_KEY } from "../helpers/tokens.helper.js";
//Strategy gets decalred

const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
  //Register

  passport.use(
    "register",
    new localStrategy(
      {
        passReqToCallback: true,

        usernameField: "email",
      },
      async (req, _email, _password, done) => {
        const { name, date, email, password, avatar } = req.body;

        console.log("Registrando un usuario");
        console.log(req.body);

        try {
          const existingUser = await usersManager.readBy({ email });

          if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409; // 409 Conflict is appropriate for duplicate resource
            throw error;
          }
          const hashedPassword = createHash(password);
          const newUser = {
            name,
            date,
            email,
            avatar,
            password: hashedPassword,
          };

          const response = await usersManager.create(newUser);

          return done(null, response);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // passport.use(
  //   "login",
  //   new localStrategy(
  //     {
  //       passReqToCallback: true,

  //       usernameField: "email",
  //     },
  //     async (req, _email, _password, done) => {
  //       const { name, date, email, password, avatar } = req.body;

  //       try {
  //         const user = await usersManager.readBy({ email });
  //         console.log("Logeando un usuario");
  //         console.log(req.body);
  //         if (!user || !isValidPassword(user, password)) {
  //           return done(null, false, { message: "Invalid credentials" });
  //         }
  //         return done(null, user);
  //       } catch (error) {
  //         return done("Error registrando el usuario" + error);
  //       }
  //     }
  //   )
  // );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: (req) => req.cookies.jwtCookieToken,
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        console.log("Entrando a passport strategy con JWT");
        try {
          console.log("JWT obtenida del payload");
          console.log(jwt_payload);
          done(null, jwt_payload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await Users.findById(id);
      done(null, user);
    } catch (error) {
      console.log("Error deserializando el usuario " + error);
    }
  });
};

const cookieExtractor = (req) => {
  let token = null;
  console.log("Entrando al extracto");

  if (req && req.cookies) {
    console.log("cookies presente");
    console.log(req.cookies);

    token = req.cookies.jwtCookieToken;
    console.log(token);
  }
  return token;
};

export default initializePassport;
