"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("../../model/productModel");
const model = new productModel_1.ProductModel();
describe("Product Model Test:", () => {
    it("Index method is existed.", () => {
        expect(model.index).toBeDefined();
    });
    it("Show method is existed.", () => {
        expect(model.show).toBeDefined();
    });
    it("Show by category method is existed.", () => {
        expect(model.showByCat).toBeDefined();
    });
    it("Create method is existed.", () => {
        expect(model.create).toBeDefined();
    });
    it("Create & Show methods functionality: created product and retrieved product names to be matched.", async () => {
        const product = {
            name: "p1",
            price: 20,
            category: "cag1",
        };
        const newProduct = await model.create(product);
        const listedProduct = await model.show(newProduct.id);
        expect(listedProduct.name).toEqual(product.name);
    });
    it("Index method functionality: listed products to be existed and indexed.", async () => {
        const product = {
            name: "p2",
            price: 20,
            category: "cag2",
        };
        const newProduct = await model.create(product);
        const listedProduct = await model.index();
        expect(listedProduct).toEqual([
            { id: 1, name: "p4", price: 20, category: "cag3" },
            { id: 2, name: "p1", price: 20, category: "cag1" },
            { id: 3, name: "p2", price: 20, category: "cag2" },
        ]);
    });
    it("Show by Category method functionality: listed product to be matched by asked category.", async () => {
        const product = {
            name: "p3",
            price: 20,
            category: "cag1",
        };
        const newProduct = await model.create(product);
        const listedProduct = await model.showByCat("cag1");
        expect(listedProduct).toEqual([
            { id: 2, name: "p1", price: 20, category: "cag1" },
            { id: 4, name: "p3", price: 20, category: "cag1" },
        ]);
    });
});
