import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      auth0: string;
      userID: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  //Bearer tokengoeshere
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authorization.split(" ")[1];

  console.log(token);

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0 = decoded.sub;

    const user = await User.findOne({ auth0 });

    if (!user) {
      return res.status(401);
    }

    req.auth0 = auth0 as string;
    req.userID = user._id.toString();
    next();
  } catch (error) {
    return res.status(401);
  }
};
