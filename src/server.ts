import colors from 'colors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import express from 'express'
import router from './router';
import db from './config/db';

// Conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        //console.log(colors.bgMagenta('Connection has been established successfully.'));
    } catch (error) {
        console.log(colors.bgRed.white('Error connecting to the database: '), error);
    }
}

connectDB();
const server = express();

// Configuración para leer datos desde el formulario (body)
server.use(express.json());

// Routing
server.use('/api/products', router);

server.get('/api', (req, res) => {
    res.send({ msg: 'Welcome to the API' });
})

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec) )

export default server 