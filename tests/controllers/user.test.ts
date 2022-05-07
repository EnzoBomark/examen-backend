import supertest from 'supertest';
import app from '../../src/app';

describe('User controller test', () => {
  it('should fetch user', async () => {
    const response = await supertest(app)
      .get('/api/user/2')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Jane');
  });

  it('should fetch users', async () => {
    const response = await supertest(app)
      .get('/api/users')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(3);
  });
});
