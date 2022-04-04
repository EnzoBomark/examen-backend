import supertest from 'supertest';
import app from '../../src/app';

describe('Profile controller test', () => {
  it('should fetch user', async () => {
    const response = await supertest(app)
      .get('/api/profile')
      .set('Authorization', 'Bearer token');

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Enzo');
  });

  it('should not fetch user with faulty token', async () => {
    const response = await supertest(app)
      .get('/api/profile')
      .set('Authorization', 'faulty token');

    expect(response.statusCode).toBe(401);
  });

  it('should create user', async () => {
    const response = await supertest(app)
      .post('/api/profile')
      .set('Authorization', 'Bearer new token')
      .send({
        name: 'Test',
        email: 'test@test.se',
        phone: '0793490530',
      });

    expect(response.statusCode).toBe(201);
  });

  it('should not create user duplicate email', async () => {
    const response = await supertest(app)
      .post('/api/profile')
      .set('Authorization', 'Bearer new token')
      .send({
        name: 'Test',
        email: 'enzo.boma@hotmail.com',
        phone: '0793490530',
      });

    expect(response.statusCode).toBe(409);
  });

  it('should not create user invalid phone number', async () => {
    const response = await supertest(app)
      .post('/api/profile')
      .set('Authorization', 'Bearer new token')
      .send({
        name: 'Test',
        email: 'test@test.se',
        phone: '07934',
      });

    expect(response.statusCode).toBe(400);
  });

  it('should update Enzo to John Doe', async () => {
    const response = await supertest(app)
      .put('/api/profile')
      .set('Authorization', 'Bearer token')
      .send({
        name: 'John doe',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('John doe');
  });

  it('should add skills to Enzo', async () => {
    const response = await supertest(app)
      .put('/api/profile')
      .set('Authorization', 'Bearer token')
      .send({
        skill: '5',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Enzo');
    expect(response.body.skill).toBe('5');
  });
});
