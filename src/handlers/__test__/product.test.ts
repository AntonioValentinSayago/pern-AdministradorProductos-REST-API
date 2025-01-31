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

 describe('GET /api/products', () => {
    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.body).not.toBe(404)
    })
    it('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body).toHaveLength(1)
        expect(response.body).not.toHaveProperty('erros')
    });
 })

 describe('GET /api/products/:id', () => {
    it('Should return a 404 reponse for a non-existen product', async () => {
        const productId = 2000;
        const response= await request(server).get(`/api/products/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Product not found')
    });
    it('should check a valid ID in the URL', async () => {
        const response= await request(server).get(`/api/products/not-valid-url`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
    });
 });