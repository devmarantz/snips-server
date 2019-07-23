const Snippet = require('./models/Snippet.model');

async function testModels() {
  // const snippets = await Snippet.select();
  // console.log(snippets);
  Snippet.insert({
    author: 'Devon',
    code: 'code code code',
    title: 'test.js',
    description: 'This works great!',
    language: 'javascript',
    bogus: 'THIS IS FAKE!',
  });
}

testModels();
