import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "12h" });
  res.cookie("jwt-movie", token, {
    maxAge: 6 * 60 * 60 * 1000, //6 hours in milisecs
    httpOnly: true, //prevent xss attacks
    sameSite: "strict", //CSRF attacks cross site req forgery attack
    secure: ENV_VARS.NODE_ENV !== "development",
  });
  return token;
};
