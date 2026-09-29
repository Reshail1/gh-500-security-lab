import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { app } from '../src/app';

describe('API', () => {
  test('GET /health reports readiness', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  test('GET /users/:id returns a known user', async () => {
    const response = await request(app).get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', name: 'Ada Lovelace' });
  });

  test('GET /users/:id returns 404 for an unknown user', async () => {
    const response = await request(app).get('/users/999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'User not found' });
  });

  test('POST /feedback accepts and trims a valid message', async () => {
    const response = await request(app).post('/feedback').send({ message: '  Great API!  ' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: expect.any(String), message: 'Great API!' });
  });

  test.each([{}, { message: '' }, { message: 42 }, { message: 'x'.repeat(501) }])(
    'POST /feedback rejects invalid input %#',
    async (body) => {
      const response = await request(app).post('/feedback').send(body);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'message must be 1–500 characters' });
    },
  );
});
