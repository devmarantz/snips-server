const express = require('express');
const Snippet = require('./models/Snippet.model');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Snips');
});

/* Snippets Route*/
// POST /api/snippets
app.post('/api/snippets', async (req, res) => {});
// GET /api/snippets
app.get('/api/snippets', async (req, res) => {
  // 1.get data from Snippets model
  const snippets = await Snippet.select();
  // 2. send that out
  res.send(snippets);
});
// GET /api/snippets/:id
app.get('/api/snippets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // 1.get data from Snippets model
    const snippets = await Snippet.select({ id: `${id}` });
    // 2. send that out
    res.send(snippets);
  } catch (err) {
    res.send(err);
  }
});
// PATCH /api/snippets/:id
app.patch('/api/snippets/:id', async (req, res) => {});
// DELETE /api/snippets/:id
app.delete('/api/snippets/:id', async (req, res) => {});

app.listen(5000, () => {
  console.log('Snips server running on Port 5000');
});
