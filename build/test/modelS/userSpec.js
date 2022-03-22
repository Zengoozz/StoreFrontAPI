"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../../model/userModel");
const model = new userModel_1.UserModel();
describe("User Model Test:", () => {
    it("Index method is existed.", () => {
        expect(model.index).toBeDefined();
    });
    it("Show method is existed.", () => {
        expect(model.show).toBeDefined();
    });
    it("Create method is existed.", () => {
        expect(model.create).toBeDefined();
    });
    it("Create & Show methods functionality: created and showd usernames and passwords to be matched.", async () => {
        const user = {
            username: "u1",
            first_name: "first",
            last_name: "last",
            password: "pass"
        };
        const newUser = await model.create(user);
        const listedUser = await model.show(newUser.id);
        expect(listedUser.username).toEqual(user.username);
    });
    it("Index method functionality: listed users to be matched by username and indexed.", async () => {
        const user = {
            username: "u2",
            first_name: "first2",
            last_name: "last2",
            password: "pass2"
        };
        const newUser = await model.create(user);
        const listedUser = await model.index();
        expect(listedUser[1].username).toEqual('u1');
        expect(listedUser[2].username).toEqual('u2');
    });
});
