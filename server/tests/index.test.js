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
    expect(res.body.cards).toHaveLength(31); 
  });


  it('should fetch all cards with quizz', async () => {
    const res = await request(app).get('/cards/quizz');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('learnings');
    expect(res.body.learnings).toHaveLength(17); 
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
  it('should delete a specific card by its ID', async () => {
    const cardId = 1;
    const response = await request(app).delete(`/cards/${cardId}`);

    expect(response.status).toBe(204); 
  });

 
  it('should fetch all cards associated with a specific tag', async () => {
    const tag = 'Programming';
    const response = await request(app).get(`/cards/tag/${tag}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('cards');
    
  });

  
  it('should return 404 if card to update does not exist', async () => {
    const invalidCardId = 999;
    const response = await request(app)
      .patch(`/cards/${invalidCardId}/answer`)
      .send({
        isValid: true,
      });

    expect(response.status).toBe(404);
  });

  
  it('should return 404 if card to delete does not exist', async () => {
    const invalidCardId = 999;
    const response = await request(app).delete(`/cards/${invalidCardId}`);

    expect(response.status).toBe(404);
  });


  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    server.close();
  });
  });


