import { DashboardQueries } from "../model/dashboardQueries";
import { isAuthenticated } from "../middlewares/authenticate";
import express from "express";

const model = new DashboardQueries();

const dashboardRoutes = (app: express.Application): void => {
  app.get("/currentOrder/:user_id", isAuthenticated, currentOrderByUser);
};

const currentOrderByUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const order = await model.currentOrderByUser(Number(req.params.user_id));
    res.json(order);
  } catch (err) {
    res.json(err);
  }
};

export default dashboardRoutes;
