import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => { 
    // Valicaciones de la respuesta de validaciones 
    it('Should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)
        
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('Should validate that the price is greate than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Product - Testing',
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('Should create a new product', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                name: 'Product - Testing',
                price: 100
            })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('error')
    })
 })