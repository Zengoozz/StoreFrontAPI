import { Client } from "../database";
import bcrypt, { hashSync } from "bcrypt";

export type User = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const listedUsers = await conn.query(sql);

      conn.release();
      return listedUsers.rows;
    } catch (err) {
      throw new Error(`Couldn't retrieve users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = " SELECT * FROM users where id = ($1)";
      const listedUser = await conn.query(sql, [id]);

      conn.release();
      return listedUser.rows[0];
    } catch (err) {
      throw new Error(`Couldn't retrieve user of id: ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *";
      const hashedPass = bcrypt.hashSync(
        u.password + process.env.PEPPER,
        process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : ""
      );
      const newUser = await conn.query(sql, [
        u.username,
        u.first_name,
        u.last_name,
        hashedPass,
      ]);

      conn.release();
      return newUser.rows[0];
    } catch (err) {
      throw new Error(`Couldn't create new user ${u.username}. Error: ${err}`);
    }
  }
}
