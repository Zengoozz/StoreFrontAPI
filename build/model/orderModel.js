"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = require("../database");
class OrderModel {
    async index() {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT * FROM orders";
            const listedOrders = await conn.query(sql);
            conn.release();
            return listedOrders.rows;
        }
        catch (err) {
            throw new Error(`Couldn't retrieve orders. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT * FROM orders WHERE id = ($1)";
            const order = await conn.query(sql, [id]);
            conn.release();
            return order.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't retrieve order of id: ${id}. Error: ${err}`);
        }
    }
    async create(status, user_id) {
        try {
            const conn = await database_1.Client.connect();
            const userSql = "SELECT * FROM users WHERE id = ($1)";
            const user = await conn.query(userSql, [user_id]);
            if (user.rows[0]) {
                const sql = "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
                const result = await conn.query(sql, [status, user_id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            else {
                throw new Error(`Couldn't create order. Error: No user existed with id: ${user_id}`);
            }
        }
        catch (err) {
            throw new Error(`Couldn't create order. Error: ${err}`);
        }
    }
    async addProduct(product_id, order_id, quantity) {
        try {
            const conn = await database_1.Client.connect();
            const orderSql = "SELECT * FROM orders WHERE id=($1)";
            const order = await conn.query(orderSql, [order_id]);
            const productSql = "SELECT * FROM products WHERE id=($1)";
            const product = await conn.query(productSql, [product_id]);
            if (order.rows[0] && product.rows[0]) {
                const sql = "INSERT INTO products_j_orders (quantity, product_id, order_id) VALUES ($1, $2, $3) RETURNING *";
                const result = await conn.query(sql, [
                    quantity,
                    product_id,
                    order_id,
                ]);
                const newOrder = result.rows[0];
                conn.release();
                return newOrder;
            }
            else {
                throw new Error(`Couldn't create order. Error: No order existed with id: ${order_id}`);
            }
        }
        catch (err) {
            throw new Error(`${err}`);
        }
    }
}
exports.OrderModel = OrderModel;
