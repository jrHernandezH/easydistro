import { createPool } from 'mysql2/promise';
import { DB_DATABASE, DB_PORT, DB_HOST, DB_USER, DB_PASSWORD } from './config.js';
export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: "",
    port: DB_PORT,
    database: DB_DATABASE
});

