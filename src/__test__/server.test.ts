import request from 'supertest'
import server from '../server'

describe('GET /api', () => { 
    it('Should sen back a json response', async () => {
        const response = await request(server).get('/api')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        expect(response.headers['content-type']).toMatch(/json/)

        expect(response.status).not.toBe(404)
    })
 })