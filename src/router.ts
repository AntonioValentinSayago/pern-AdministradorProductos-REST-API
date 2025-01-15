import { Router } from "express"; 

const router = Router();


router.get('/', (req, res) => {
    res.json('Hello Get')
})

router.post('/', (req, res) => {
    res.json('Hello Post')
})

router.put('/', (req, res) => {
    res.json('Hello Put')
})

router.delete('/', (req, res) => {
    res.json('Hello Delete')
})

router.patch('/', (req, res) => {
    res.json('Hello Patch')
})

export default router;