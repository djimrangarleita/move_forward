import request from 'supertest';
import { startApp } from '../../run';
import { Express } from 'express-serve-static-core';

describe('Test app module', () => {
    let app: Express;
    
    beforeAll(() => {
        app = startApp();
    });

    test('It should return 200 status when call /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});