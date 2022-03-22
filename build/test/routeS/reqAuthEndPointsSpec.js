"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const userHandler_1 = __importDefault(require("../../handler/userHandler"));
const productHandler_1 = __importDefault(require("../../handler/productHandler"));
const orderHandler_1 = __importDefault(require("../../handler/orderHandler"));
const dashboardHandler_1 = __importDefault(require("../../handler/dashboardHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, userHandler_1.default)(app);
(0, productHandler_1.default)(app);
(0, orderHandler_1.default)(app);
(0, dashboardHandler_1.default)(app);
app.listen(5000);
describe("Authentication Test", () => {
    let token = "";
    it("create user with no authentication required", (done) => {
        (0, supertest_1.default)(app)
            .post("/users/")
            .send({
            username: "user44",
            first_name: "last",
            last_name: "first",
            password: "156",
        })
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token)
            .expect("Content-Type", /json/)
            .expect(201)
            .then((res) => {
            if (typeof res.body === "string") {
                token = res.body;
                done();
            }
            else {
                done("failed to sign in");
            }
        })
            .catch((err) => {
            done(err);
        });
    });
    it("create product with authenticated access", (done) => {
        (0, supertest_1.default)(app)
            .post("/products/")
            .send({
            name: "name",
            price: 20,
            category: "cag3",
        })
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token)
            .expect("Content-Type", /json/)
            .expect(201)
            .then((res) => {
            done();
        })
            .catch((err) => {
            done(err);
        });
    });
    it("Users retrieving with authenticated access", () => {
        (0, supertest_1.default)(app)
            .get("/users/")
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token)
            .expect(200);
    });
    it("Orders retrieving with authenticated access", () => {
        (0, supertest_1.default)(app)
            .get("/orders/")
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token)
            .expect(200);
    });
    it("Current Order retrieving with authenticated access", () => {
        (0, supertest_1.default)(app)
            .get("/currentOrder/1")
            .set("Accept", "application/json")
            .set("Authorization", "Bearer " + token)
            .expect(200);
    });
});
