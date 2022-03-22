"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../middlewares/authenticate");
const productModel_1 = require("../model/productModel");
const model = new productModel_1.ProductModel();
const productRoutes = (app) => {
    app.get("/products/", index),
        app.get("/products/:id", show),
        app.get("/products/category/:category", showByCat);
    app.post("/products/", authenticate_1.isAuthenticated, create);
};
const index = async (_req, res) => {
    const products = await model.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await model.show(parseInt(req.params.id));
    product
        ? res.json(product)
        : res
            .status(404)
            .json(`No existed product found with id: ${req.params.id}`);
};
const showByCat = async (req, res) => {
    const products = await model.showByCat(req.params.category);
    res.json(products);
};
const create = async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const newProduct = await model.create(product);
        res.status(201);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.default = productRoutes;
