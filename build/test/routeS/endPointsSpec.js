"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import app from "../../server";
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe("EndPoints", () => {
    const request = (0, supertest_1.default)(server_1.default);
    let token = "";
    it("Homepage endpoint response status", async () => {
        const response = await request.get("/");
        expect(response.status).toEqual(300);
    });
    it("Product endpoint response status", async () => {
        const response = await request.get("/products/");
        expect(response.status).toEqual(200);
    });
    it("Products by Category endpoint response status", async () => {
        const response = await request.get("/Products/category/1");
        expect(response.status).toEqual(200);
    });
    it("User endpoint response status for Unauthenticated access", async () => {
        const response = await request.get("/users/");
        expect(response.status).toEqual(401);
    });
    it("Order endpoint response status for Unauthenticated access", async () => {
        const response = await request.get("/orders/");
        expect(response.status).toEqual(401);
    });
    it("Current Order endpoint response status for Unauthenticated access", async () => {
        const response = await request.get("/currentOrder/1");
        expect(response.status).toEqual(401);
    });
});
