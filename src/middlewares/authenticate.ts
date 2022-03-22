import express from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  try {
    const header = String(req.headers.authorization);
    const token = header?.split(" ")[1];
    jwt.verify(String(token), String(process.env.JWT_SECRET));
    next();
  } catch (err) {
    res.status(401).json(`Invalid token. ${err}`);
  }
};
