const Snippet = require('./models/Snippet.model');

async function testModels() {
  // const snippets = await Snippet.select();
  // console.log(snippets);
  try {
    const newSnippet = await Snippet.insert({
      author: 'Devon',
      code: 'code code code',
      title: 'test.js',
      description: 'This works great!',
      // language: 'javascript',
      bogus: 'THIS IS FAKE!',
    });
    console.log(newSnippet);
  } catch (err) {
    console.log(err);
  }
}

testModels();
