"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const productHandler_1 = __importDefault(require("./handler/productHandler"));
const userHandler_1 = __importDefault(require("./handler/userHandler"));
const orderHandler_1 = __importDefault(require("./handler/orderHandler"));
const dashboardHandler_1 = __importDefault(require("./handler/dashboardHandler"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.status(300).send(`Please choose one of the following services:
    http://localhost:3000/products/,
    http://localhost:3000/users/,
    http://localhost:3000/orders/`);
});
(0, productHandler_1.default)(app);
(0, userHandler_1.default)(app);
(0, orderHandler_1.default)(app);
(0, dashboardHandler_1.default)(app);
app.listen(port, () => {
    console.log(`app's running at http://localhost: ${port}`);
});
exports.default = app;
