import supertest from 'supertest';
import app from '../../src/app';

describe('Chat controller test', () => {
  it('should create chat when userIds is an array', async () => {
    const response = await supertest(app)
      .post('/api/chat')
      .set('Authorization', 'Bearer token')
      .send({
        userIds: ['2', '3'],
      });

    expect(response.statusCode).toBe(201);
  });

  it('should create chat when userIds is a string', async () => {
    const response = await supertest(app)
      .post('/api/chat')
      .set('Authorization', 'Bearer token')
      .send({
        userIds: '2',
      });

    expect(response.statusCode).toBe(201);
  });

  it('should not create chat when no users ar provided', async () => {
    const response = await supertest(app)
      .post('/api/chat')
      .set('Authorization', 'Bearer token')
      .send({});

    expect(response.statusCode).toBe(422);
  });
});
