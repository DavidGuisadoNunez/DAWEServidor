const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// ...existing code for routes...

describe('Users API', ()  => {
    it('should list all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
    });

    it('should get a user by ID', async () => {
        const res = await request(app).get('/users/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('John Doe');
    });

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'Sam Smith', email: 'sam@example.com' });
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('Sam Smith');
    });

    it('should update a user by ID', async () => {
        const res = await request(app)
            .put('/users/1')
            .send({ name: 'John Smith', email: 'johnsmith@example.com' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('John Smith');
    });

    it('should delete a user by ID', async () => {
        const res = await request(app).delete('/users/1');
        expect(res.statusCode).toEqual(204);
    });
});