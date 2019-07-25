const Snippet = require('./models/Snippet.model');

async function testSnippetInsert() {
  // const snippets = await Snippet.select();
  // console.log(snippets);
  try {
    const newSnippet = await Snippet.insert({
      author: 'Noname',
      code: 'Diddy Bop',
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

async function testSnippetDelete(id) {
  try {
    const snippets = await Snippet.delete(id);
    console.log(snippets);
  } catch (err) {
    console.log(err);
  }
}

// testSnippetSelect();
// testSnippetInsert();
testSnippetDelete();
//
