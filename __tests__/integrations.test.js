require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const dbInit = require('../db/init');

beforeAll(async()=>{
  await dbInit.createTables();
  await dbInit.seedAuthors();
  await dbInit.seedAuthors();
})

describe('Snippets', ()=> {
  describe('GET /api/snips', ()=> {
    it('should get all of the snips', async ()=>{
      const response = await request(app).get('/api/snippets');
      console.log(response.body);
    });
  })
});