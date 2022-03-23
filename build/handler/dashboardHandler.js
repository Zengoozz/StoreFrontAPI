"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboardQueries_1 = require("../model/dashboardQueries");
const authenticate_1 = require("../middlewares/authenticate");
const model = new dashboardQueries_1.DashboardQueries();
const dashboardRoutes = (app) => {
    app.get("/currentOrder/:user_id", authenticate_1.isAuthenticated, currentOrderByUser);
};
const currentOrderByUser = async (req, res) => {
    try {
        const order = await model.currentOrderByUser(Number(req.params.user_id));
        res.json(order);
    }
    catch (err) {
        res.json(err);
    }
};
exports.default = dashboardRoutes;
