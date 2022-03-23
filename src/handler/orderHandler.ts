import { OrderModel } from "../model/orderModel";
import { isAuthenticated } from "../middlewares/authenticate";
import express from "express";

const model = new OrderModel();

const orderRoutes = (app: express.Application): void => {
  app.get("/orders/", isAuthenticated, index);
  app.get("/orders/:id", isAuthenticated, show);
  app.post("/orders/:user_id", isAuthenticated, create);
  app.post("/orders/:id/products/", isAuthenticated, addProduct);
};

const index = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const orders = await model.index();
    res.json(orders);
  } catch (err) {
    res.json(err);
  }
};

const show = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const orders = await model.show(parseInt(req.params.id));
    res.json(orders);
  } catch (err) {
    res.json(err);
  }
};

const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const newOrder = await model.create(
      req.body.status,
      Number(req.params.user_id)
    );
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};

const addProduct = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const addedProduct = await model.addProduct(
      parseInt(req.body.product_id),
      parseInt(req.params.id),
      req.body.quantity
    );
    res.status(201).json(addedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

export default orderRoutes;
