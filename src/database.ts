import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_NAME_TEST, ENV } =
  process.env;

export let Client: Pool;


if (ENV === "dev") {
  Client = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  });
} else {
  Client = new Pool({
    host: DB_HOST,
    database: DB_NAME_TEST,
    user: DB_USER,
    password: DB_PASSWORD,
  });
}
