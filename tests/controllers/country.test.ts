import supertest from 'supertest';
import app from '../../src/app';

describe('Country controller test', () => {
  it('should fetch Sweden', async () => {
    const response = await supertest(app)
      .get('/api/country/19ae4b1b-03de-444f-a508-311333965a25')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Sweden');
  });

  it('should fetch 25 first countries', async () => {
    const response = await supertest(app)
      .get('/api/countries')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create england', async () => {
    const response = await supertest(app)
      .post('/api/country')
      .set('Authorization', 'Bearer token')
      .send({
        name: 'England',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('England');
  });

  it('should update denmark to worse sweden', async () => {
    const response = await supertest(app)
      .put('/api/country/ae92e451-1a47-4aa3-b587-103afe8b8f67')
      .set('Authorization', 'Bearer token')
      .send({
        name: 'Worse Sweden',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Worse Sweden');
  });

  it('should delete denmark', async () => {
    const response = await supertest(app)
      .delete('/api/country/ae92e451-1a47-4aa3-b587-103afe8b8f67')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
  });
});
