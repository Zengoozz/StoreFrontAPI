"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    try {
        const header = String(req.headers.authorization);
        const token = header?.split(" ")[1];
        jsonwebtoken_1.default.verify(String(token), String(process.env.JWT_SECRET));
        next();
    }
    catch (err) {
        res.status(401).json(`Invalid token. ${err}`);
    }
};
exports.isAuthenticated = isAuthenticated;
