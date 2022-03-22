"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    async index() {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT * FROM users";
            const listedUsers = await conn.query(sql);
            conn.release();
            return listedUsers.rows;
        }
        catch (err) {
            throw new Error(`Couldn't retrieve users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.Client.connect();
            const sql = " SELECT * FROM users where id = ($1)";
            const listedUser = await conn.query(sql, [id]);
            conn.release();
            return listedUser.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't retrieve user of id: ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const conn = await database_1.Client.connect();
            const sql = "INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *";
            const hashedPass = bcrypt_1.default.hashSync(u.password + process.env.PEPPER, process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : "");
            const newUser = await conn.query(sql, [
                u.username,
                u.first_name,
                u.last_name,
                hashedPass,
            ]);
            conn.release();
            return newUser.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't create new user ${u.username}. Error: ${err}`);
        }
    }
}
exports.UserModel = UserModel;
