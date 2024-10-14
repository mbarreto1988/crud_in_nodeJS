import sql from 'mssql';
import configuration from '../config.js';


const dbSetting = {
    user: configuration.db_user,
    password: configuration.db_psw,
    server: configuration.db_server,
    port: parseInt(configuration.db_port),
    database: configuration.db_database,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};


export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSetting);
        // const result = await pool.request().query('SELECT * FROM Articulos');
        // console.log(result);
        // console.log( await pool.request().query("SELECT FORMAT(GETDATE(), 'yyyy-MM-dd HH:mm') AS Fecha_Hora;") ); // Test
        return pool;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

