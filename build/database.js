"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_NAME_TEST, ENV } = process.env;
if (ENV === "dev") {
    exports.Client = new pg_1.Pool({
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
    });
}
else {
    exports.Client = new pg_1.Pool({
        host: DB_HOST,
        database: DB_NAME_TEST,
        user: DB_USER,
        password: DB_PASSWORD,
    });
}
