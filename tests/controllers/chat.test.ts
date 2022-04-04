import supertest from 'supertest';
import app from '../../src/app';

describe('Chat controller test', () => {
  it('should create chat', async () => {
    const response = await supertest(app)
      .post('/api/chat')
      .set('Authorization', 'Bearer token')
      .send({
        userIds: '3',
      });

    expect(response.statusCode).toBe(201);
  });

  it('should create not chat that already exits', async () => {
    const response = await supertest(app)
      .post('/api/chat')
      .set('Authorization', 'Bearer token')
      .send({
        userIds: ['2', '3'],
      });

    expect(response.statusCode).toBe(409);
  });

  it('should not create chat when no users ar provided', async () => {
    const response = await supertest(app)
      .post('/api/chat')
      .set('Authorization', 'Bearer token')
      .send({});

    expect(response.statusCode).toBe(422);
  });
});
