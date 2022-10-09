import { config } from "dotenv"
config()

export const port = process.env.PORT || 3000
export const db_user = process.env.DB_USER || "root"
export const db_password = process.env.DB_PASSWORD || "root"
export const db_host = process.env.DB_HOST || "localhost"
export const db_port = process.env.DB_PORT || 3306
export const db_database =  process.env.DB_DATABASE ||'railway_dev'
export const secret_key =  process.env.SECRET_JWT_SEED ||'Palabra_Secreta'