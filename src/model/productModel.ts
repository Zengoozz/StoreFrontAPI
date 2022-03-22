import { Client } from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const listedProducts = await conn.query(sql);

      conn.release();
      return listedProducts.rows;
    } catch (err) {
      throw new Error(`Couldn't retrieve products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = " SELECT * FROM products where id = ($1)";
      const listedProduct = await conn.query(sql, [id]);

      conn.release();
      return listedProduct.rows[0];
    } catch (err) {
      throw new Error(`Couldn't retrieve product of id: ${id}. Error: ${err}`);
    }
  }

  async showByCat(cat: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE category = ($1)";
      const listedProducts = await conn.query(sql, [cat]);

      conn.release();
      return listedProducts.rows;
    } catch (err) {
      throw new Error(
        `Couldn't retrieve products of category:${cat}. Error: ${err}`
      );
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const newProduct = await conn.query(sql, [p.name, p.price, p.category]);

      conn.release();
      return newProduct.rows[0];
    } catch (err) {
      throw new Error(
        `Couldn't create new product of name: ${p.name}. Error: ${err}`
      );
    }
  }

}
