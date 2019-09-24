require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const dbInit = require('../db/init');
const db = require('../db/index');

beforeAll(async()=>{
  await dbInit.createTables();
  await dbInit.seedAuthors();
  await dbInit.seedSnippets();
});

describe('Snippets', ()=> {
  describe('GET /api/snips', ()=> {
    it('should get all of the snips', async ()=>{
      // test the /api/snips route
      const response = await request(app)
        .get('/api/snippets')
        .expect(200);
      // console.log(response.body);
      //  expect two rows
      expect(response.body.length).toBe(2);
      // no errors
      expect(response.error).toBeFalsy();
      //  status code should be 200
      expect(response.status).toBe(200);
      //  matches the data directly
      expect(response.body).toMatchSnapshot()
    });
  })
});

afterAll( async() => {
  // close the db pool
  db.end();
})