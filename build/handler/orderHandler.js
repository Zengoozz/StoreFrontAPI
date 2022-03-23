"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = require("../model/orderModel");
const authenticate_1 = require("../middlewares/authenticate");
const model = new orderModel_1.OrderModel();
const orderRoutes = (app) => {
    app.get("/orders/", authenticate_1.isAuthenticated, index);
    app.get("/orders/:id", authenticate_1.isAuthenticated, show);
    app.post("/orders/:user_id", authenticate_1.isAuthenticated, create);
    app.post("/orders/:id/products/", authenticate_1.isAuthenticated, addProduct);
};
const index = async (_req, res) => {
    try {
        const orders = await model.index();
        res.json(orders);
    }
    catch (err) {
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const orders = await model.show(parseInt(req.params.id));
        res.json(orders);
    }
    catch (err) {
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const newOrder = await model.create(req.body.status, Number(req.params.user_id));
        res.status(201).json(newOrder);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const addProduct = async (req, res) => {
    try {
        const addedProduct = await model.addProduct(parseInt(req.body.product_id), parseInt(req.params.id), req.body.quantity);
        res.status(201).json(addedProduct);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
exports.default = orderRoutes;
