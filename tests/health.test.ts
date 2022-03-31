import supertest from 'supertest';
import app from '../src/app';

describe('Health Test', () => {
  it('should get 200 OK', async () => {
    const response = await supertest(app).get('/api/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('OK');
  });
});
