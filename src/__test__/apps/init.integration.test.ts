import request from 'supertest';
import { Express } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { startApp } from '../../run';

describe('Test server status', () => {
  let app: Express;
  let db: typeof mongoose;

  beforeAll(async () => {
    try {
      const apps = await startApp();
      app = apps.app;
      db = apps.db;
    } catch (error) {
      console.log('Exiting app...');
      process.exit(1);
    }
  });

  afterAll(async () => {
    await db.connection.close();
  });

  test('It should return 200 status when call /api/status', async () => {
    const response = await request(app).get('/api/status');
    expect(response.status).toBe(200);
  });
});
