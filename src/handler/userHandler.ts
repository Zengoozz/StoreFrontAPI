import express from "express";
import jwt from "jsonwebtoken";
import { isAuthenticated } from "../middlewares/authenticate";
import { User, UserModel } from "../model/userModel";

const model = new UserModel();

const userRoutes = (app: express.Application): void => {
  app.get("/users/",isAuthenticated, index);
  app.get("/users/:id",isAuthenticated, show);
  app.post("/users/",create);
};

const index = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  const users = await model.index();
  res.json(users);
};

const show = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const user = await model.show(parseInt(req.params.id));
  res.json(user);
};

const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const user: User = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  try {
    const newUser = await model.create(user);
    const token = jwt.sign(newUser, String(process.env.JWT_SECRET));

    res.status(201).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
};

export default userRoutes;
