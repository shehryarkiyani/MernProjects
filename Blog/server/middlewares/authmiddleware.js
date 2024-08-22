import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const AuthenticatedUser = (req, res, next) => {
  try {
    const Token = req?.cookies?.token; //|| req?.headers?.authorization;
    if (Token === undefined) {
      return res.status(400).json({ message: "user not authenticated" });
    }
    // const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(Token, process.env.ACCESS_SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(403).json({ msg: "invalid token" });
      }
      console.log(user, "loginuser");
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
