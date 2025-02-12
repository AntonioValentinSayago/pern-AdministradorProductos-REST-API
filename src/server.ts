import express from 'express'
import colors from 'colors'
import cors, { CorsOptions } from 'cors';
import moragn from 'morgan'
import router from './router'
import db from './config/db'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'

// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log( colors.blue( 'Conexión exitosa a la BD'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))
    }
}
connectDB()

// Instancia de express
const server = express()

// Configuración de CORS
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === undefined || origin === process.env.FRONTEND_URL) {
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }, // Que es lo que va a permitir el CORS enviar a la petición
}
server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json())

// Configuración de Morgan
server.use(moragn('dev'))

server.use('/api/products', router)

// Docs de Swagger
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server