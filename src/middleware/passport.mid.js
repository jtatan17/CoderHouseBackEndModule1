import passport from "passport";

export const passportJWT = passport.authenticate("jwt", { session: false });
