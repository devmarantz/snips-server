require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const dbInit = require('../db/init');

beforeAll(async()=>{
  await dbInit.createTables();
  await dbInit.seedAuthors();
  await dbInit.seedSnippets();
});

describe('Snippets', ()=> {
  describe('GET /api/snips', ()=> {
    it('should get all of the snips', async ()=>{
      // test the /api/snips route
      const response = await request(app).get('/api/snippets');
      console.log(response.body);
    });
  })
});