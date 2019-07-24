const Snippet = require('./models/Snippet.model');

async function testSnippetInsert() {
  // const snippets = await Snippet.select();
  // console.log(snippets);
  try {
    const newSnippet = await Snippet.insert({
      author: 'Devon',
      code: 'code code code',
      title: 'test.js',
      description: 'This works great!',
      language: 'javascript',
      bogus: 'THIS IS FAKE!',
    });
    console.log(newSnippet);
  } catch (err) {
    console.log(err);
  }
}

async function testSnippetSelect() {
  const snippets = await Snippet.select();
  console.log(snippets);
}

// testSnippetSelect();
testSnippetInsert();
