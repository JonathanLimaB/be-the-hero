const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async() => {
        await connection.destroy();
    });

    it('shoud be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "PapaiOng",
                email: "jonathan_lima1525@hotmail.com",
                watsapp: "24992593536",
                city: "Volta Redonda",
                uf: "RJ"
              });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });

})