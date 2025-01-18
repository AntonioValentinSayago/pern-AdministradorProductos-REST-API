import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    // const product = new Products(req.body); // Crear un nuevo producto
    // const savedProduct = await product.save(); // Guardar en la base de datos
    let errors = validationResult(req); // Obtener los errores de la validacion
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Si hay errores, responder al cliente
    }
    next(); // Termine mi trabajo, pase al siguiente middleware
}