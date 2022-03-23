"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate_1 = require("../middlewares/authenticate");
const userModel_1 = require("../model/userModel");
const model = new userModel_1.UserModel();
const userRoutes = (app) => {
    app.get("/users/", authenticate_1.isAuthenticated, index);
    app.get("/users/:id", authenticate_1.isAuthenticated, show);
    app.post("/users/", create);
};
const index = async (_req, res) => {
    try {
        const users = await model.index();
        res.json(users);
    }
    catch (err) {
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await model.show(parseInt(req.params.id));
        res.json(user);
    }
    catch (err) {
        res.json(err);
    }
};
const create = async (req, res) => {
    const user = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
    };
    try {
        const newUser = await model.create(user);
        const token = jsonwebtoken_1.default.sign(newUser, String(process.env.JWT_SECRET));
        res.status(201).json(token);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
exports.default = userRoutes;
