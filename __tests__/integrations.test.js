require('dotenv').config();

describe('Test', ()=> {
  it('should run a test', ()=>{
    console.log(process.env.DATABASE_URL);
  });
});