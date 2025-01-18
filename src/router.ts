import { Router } from "express";
import { body, param } from "express-validator"; // Check en operacione asincronas y en body en caso contrario
import { createProducts, getProducts, getProductsById, updateProducts } from "./handlers/products";
import { handleInputErrors } from "./middleware";

const router = Router();


router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('Id is not valid'),
    handleInputErrors,
    getProductsById)

router.post('/',
    // Validar datos
    body('name')
        .notEmpty().withMessage('Name is required'),
        // .run(req); Solamente en operaciones asincronas
    body('price', 'Price is required')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Value is Valid')
        .custom(value => value > 0).withMessage('Price must be greater than 0'),
    handleInputErrors,
    createProducts
)

router.put('/:id',
    // Validar datos
    body('name')
        .notEmpty().withMessage('Name is required'),
        // .run(req); Solamente en operaciones asincronas
    body('price', 'Price is required')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Value is Valid')
        .custom(value => value > 0).withMessage('Price must be greater than 0'),
    body('availability').withMessage('Availability is not valid'),
    handleInputErrors,
    updateProducts 
)

router.delete('/', (req, res) => {
    res.json('Hello Delete')
})

router.patch('/', (req, res) => {
    res.json('Hello Patch')
})

export default router;