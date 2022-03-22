"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = require("../../model/orderModel");
const dashboardQueries_1 = require("../../model/dashboardQueries");
const userModel_1 = require("../../model/userModel");
const productModel_1 = require("../../model/productModel");
const dashboardQueries = new dashboardQueries_1.DashboardQueries();
const userModel = new userModel_1.UserModel();
const orderModel = new orderModel_1.OrderModel();
const productModel = new productModel_1.ProductModel();
describe("Order Model & Dashboard Query Test:", () => {
    let newUser;
    let newProduct;
    beforeAll(async () => {
        const user = {
            username: "u3",
            first_name: "first",
            last_name: "last",
            password: "pass",
        };
        newUser = await userModel.create(user);
        const product = {
            name: "p4",
            price: 20,
            category: "cag3",
        };
        newProduct = await productModel.create(product);
    });
    it("Index method is existed.", () => {
        expect(orderModel.index).toBeDefined();
    });
    it("Show method is existed.", () => {
        expect(orderModel.show).toBeDefined();
    });
    it("Create method is existed.", () => {
        expect(orderModel.create).toBeDefined();
    });
    it("AddProduct method is existed.", () => {
        expect(orderModel.addProduct).toBeDefined();
    });
    it("Create, Show & AddProduct methods functionality: created and showed user ids of orders to be matched before and after adding product.", async () => {
        const status = "open";
        const quantity = 20;
        const newOrder = await orderModel.create(status, Number(newUser.id));
        const listedOrder = await orderModel.show(newOrder.id);
        const addedProduct = await orderModel.addProduct(Number(newProduct.id), Number(newOrder.id), quantity);
        expect(listedOrder.user_id).toEqual(String(newUser.id));
        expect(Number(addedProduct.order_id)).toEqual(Number(listedOrder.id));
    });
    it("Index method functionality: listed order to be matched by user id.", async () => {
        const listedOrder = await orderModel.index();
        expect(listedOrder[0].user_id).toEqual(String(newUser.id));
    });
    it("Dashboard..Current Order by User method: Should retrieve the open orders with same user id as given to.", async () => {
        const currentOrder = await dashboardQueries.currentOrderByUser(Number(newUser.id));
        expect(currentOrder.user_id).toEqual(String(newUser.id));
        expect(currentOrder.status).toEqual('open');
    });
});
