import colors from 'colors';
import express from 'express'
import router from './router';
import db from './config/db';

// Conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.bgMagenta('Connection has been established successfully.'));
    } catch (error) {
        console.log(colors.bgRed.white('Error connecting to the database: '), error);
    }
}

connectDB();
const server = express();

// Routing
server.use('/api/products', router);

export default server 