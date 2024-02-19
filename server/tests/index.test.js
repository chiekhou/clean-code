const request = require('supertest');
const {app,server} = require('../server');

describe('POST /cards', () => {

  it('should create a card with the correct category', async () => {
    const response = await request(app)
      .post('/cards')
      .send({
        question: 'Ils sont trop nul en maths?',
        answer: 'oui',
        tag: 'Programming'
      });

    expect(response.status).toBe(201);
    expect(response.body.category).toBe('FIRST');
  });


  it('should fetch all cards', async () => {
    const res = await request(app).get('/cards');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('cards');
    expect(res.body.cards).toHaveLength(31); // nombre de cards dans votre base de données
  });


  it('should fetch all cards with quizz', async () => {
    const res = await request(app).get('/cards/quizz');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('learnings');
    expect(res.body.learnings).toHaveLength(17); // nombre de cards apprise  dans votre base de données
  });

  it('should update a learning patch', async () => {
    const res = await request(app)
      .patch('/cards/4/answer')
      .send({
        isValid: true,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.isValid).toBe(true)
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    server.close();
  });
  });


