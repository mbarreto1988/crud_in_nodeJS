import app from './app.js';
import { getConnection } from './database/connection.js';
import configuration from './config.js';

const puerto = configuration.port  || 4000;

app.listen(puerto, async () => {
    console.log(`Servidor iniciado en: http://localhost:${puerto}/`);
    await getConnection();
});
