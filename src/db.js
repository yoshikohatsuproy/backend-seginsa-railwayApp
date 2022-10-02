import { createPool } from "mysql2/promise";
import { db_database, db_host, db_user, db_port, db_password } from "./config.js";

export const pool = await createPool({
  user: db_user,
  password: db_password,
  host: db_host,
  port: db_port,
  database: db_database
});
