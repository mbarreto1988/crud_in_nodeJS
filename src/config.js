import { config } from 'dotenv';

config();

const configuration = {
    port: process.env.PORT,
    db_server: process.env.DB_SERVER,
    db_port: process.env.DB_PORT,
    db_database: process.env.DB_DATABASE,
    db_user: process.env.DB_USER,
    db_psw: process.env.DB_PASSWORD

};

export default configuration;
