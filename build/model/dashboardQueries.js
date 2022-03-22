"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = require("../database");
class DashboardQueries {
    async currentOrderByUser(user_id) {
        try {
            const conn = await database_1.Client.connect();
            const userSql = "SELECT * FROM users WHERE id=($1)";
            const result = await conn.query(userSql, [user_id]);
            const user = result.rows[0];
            //console.log(user);
            if (user) {
                const currentOrderSql = "SELECT * FROM products_j_orders INNER JOIN orders ON products_j_orders.order_id = orders.id WHERE status = ($1) AND orders.user_id = ($2)";
                const currentOrder = await conn.query(currentOrderSql, [
                    "open",
                    user_id,
                ]);
                conn.release();
                return currentOrder.rows[0];
            }
            else {
                throw new Error(`Couldn't retrieve order. Error: No order existed with user id: ${user_id}`);
            }
        }
        catch (err) {
            throw new Error(`Couldn't retrieve order. Error: ${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
