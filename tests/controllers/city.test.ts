import supertest from 'supertest';
import app from '../../src/app';

describe('City controller test', () => {
  it('should fetch stockholm', async () => {
    const response = await supertest(app)
      .get('/api/city/fe59bd04-1abb-4734-8592-e9bb7016a2c8')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Stockholm');
  });

  it('should return 422 with faulty id provided', async () => {
    const response = await supertest(app)
      .get('/api/city/faulty')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(422);
  });

  it('should fetch 25 first first cities', async () => {
    const response = await supertest(app)
      .get('/api/cities')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch 25 first cities in norway', async () => {
    const response = await supertest(app)
      .get('/api/cities?countryIds=093db85b-ce2f-4292-874b-807bf1e4d50e')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
    expect(response.body[0].name).toBe('Oslo');
  });

  it('should create new uppsala in sweden', async () => {
    const response = await supertest(app)
      .post('/api/city')
      .set('Authorization', 'Bearer token')
      .send({
        name: 'Uppsala',
        countryId: '19ae4b1b-03de-444f-a508-311333965a25',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Uppsala');
  });

  it('should update stockholm to luleå', async () => {
    const response = await supertest(app)
      .put('/api/city/fe59bd04-1abb-4734-8592-e9bb7016a2c8')
      .set('Authorization', 'Bearer token')
      .send({
        name: 'Luleå',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Luleå');
  });

  it('should delete stockholm', async () => {
    const response = await supertest(app)
      .delete('/api/city/fe59bd04-1abb-4734-8592-e9bb7016a2c8')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
  });
});
