import supertest from 'supertest';
import app from '../../src/app';

describe('Match controller test', () => {
  it('should fetch match', async () => {
    const response = await supertest(app)
      .get('/api/match/67860eb0-1084-40d2-8f34-3017eccd9992')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
  });

  it('should fetch 25 first matches', async () => {
    const response = await supertest(app)
      .get('/api/matches')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create match', async () => {
    const response = await supertest(app)
      .post('/api/match')
      .set('Authorization', 'Bearer token')
      .send({
        type: 'single',
        dateTime: '1648820870',
        centerId: 'e9988682-3539-4d37-a620-93056126b9cd',
      });

    expect(response.statusCode).toBe(201);
  });

  it('should update match price', async () => {
    const response = await supertest(app)
      .put('/api/match/73ffd8cd-f0b5-452e-98a0-cc7010656554')
      .set('Authorization', 'Bearer token')
      .send({
        price: '300',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.price).toBe(300);
  });

  it('should delete match', async () => {
    const response = await supertest(app)
      .delete('/api/match/73ffd8cd-f0b5-452e-98a0-cc7010656554')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
  });
});
