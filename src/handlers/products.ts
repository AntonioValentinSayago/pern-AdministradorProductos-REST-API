import { Request, Response } from 'express'
import Products from '../models/Products.model'

// Funciones async para poder traer los datos de la base de datos
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Products.findAll({
            attributes: ['createdAt', 'updatedAt', 'availability']
        }); // Buscar todos los productos
        res.json({message: `Get Products succes`, data: products}); // Responder al cliente
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// Funciones async para poder traer los datos de la base de datos por id
export const getProductsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Obtener el id de los parametros
        const product = await Products.findByPk(id); // Buscar por id
        if (!product) return res.status(404).json({ message: 'Product not found' }); // Si no existe el producto
        res.json({message: `Get Products success with ${id}`, data: product}); // Responder al cliente
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
// Funciones async para poder traer los datos de la base de datos
export const createProducts = async (req: Request, res: Response) => {
    try {
        const savedProduct = await Products.create(req.body); // Crear y guardar en la base de datos
        res.status(201).json({ message: 'Product created', data: savedProduct }); // Responder al cliente
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// Funcion para actualizar producto por ID
export const updateProducts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Obtener el id de los parametros
        const product = await Products.findByPk(id); // Buscar por id
        if (!product) return res.status(404).json({ message: 'Product not found' }); // Si no existe el producto

        await product.update(req.body); // Actualizar el producto
        await product.save(); // Guardar el producto
        res.json({message: `Update Products success with ${id}`, data: product}); // Responder al cliente
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

//  Diferencia entre PUT y PATCH
export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Obtener el id de los parametros
        const product = await Products.findByPk(id); // Buscar por id
        if (!product) return res.status(404).json({ message: 'Product not found' }); // Si no existe el producto

        product.availability = !product.dataValues.availability; // Actualizar el producto especificamente la disponibilidad
        await product.save(); // Guardar el producto
        res.json({message: `Update Products success with ${id}`, data: product}); // Responder al cliente
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// Funcion para eliminar producto por ID
export const deleteProducts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Obtener el id de los parametros
        const product = await Products.findByPk(id); // Buscar por id
        if (!product) return res.status(404).json({ message: 'Product not found' }); // Si no existe el producto

        await product.destroy(); // Eliminar el producto
        res.json({message: `Delete Products success with ${id}`}); // Responder al cliente
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}