require('dotenv').config();
const request = require('supertest');
const app = require('../app');

describe('Test', ()=> {
  it('should run a test', ()=>{
    console.log(process.env.TEST_DATABASE_URL);
  });
});

describe('Snippets', ()=> {
  describe('GET /api/snips', ()=> {
    it('should get all of the snips', async ()=>{
      const response = await request(app).get('/api/snippets');
      console.log(response.body);
    });
  })
});