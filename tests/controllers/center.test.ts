import supertest from 'supertest';
import app from '../../src/app';

describe('Center controller test', () => {
  it('should fetch stockholm', async () => {
    const response = await supertest(app)
      .get('/api/center/e9988682-3539-4d37-a620-93056126b9cd')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Stockholm Tennis Center');
  });

  it('should return 422 with faulty id provided', async () => {
    const response = await supertest(app)
      .get('/api/center/faulty')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(422);
  });

  it('should fetch 25 first centers', async () => {
    const response = await supertest(app)
      .get('/api/centers')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create new uppsala in stockholm', async () => {
    const response = await supertest(app)
      .post('/api/center')
      .set('Authorization', 'Bearer token')
      .send({
        name: 'Tyresö Tennis Center',
        picture:
          'https://images.unsplash.com/photo-1613870930431-a09c7139eb33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGFkZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        address: 'example 00',
        contactUrl: 'https://example.se',
        bookingUrl: 'https://example.se',
        cityId: 'fe59bd04-1abb-4734-8592-e9bb7016a2c8',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Tyresö Tennis Center');
  });

  it('should update stockholm tennis center to huddinge tennis center', async () => {
    const response = await supertest(app)
      .put('/api/center/e9988682-3539-4d37-a620-93056126b9cd')
      .set('Authorization', 'Bearer token')
      .send({
        name: 'Huddinge Tennis Center',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Huddinge Tennis Center');
  });

  it('should delete stockholm tennis center', async () => {
    const response = await supertest(app)
      .delete('/api/center/e9988682-3539-4d37-a620-93056126b9cd')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
  });
});
