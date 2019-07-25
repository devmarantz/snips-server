const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Snips');
});

/* Snippets Route*/
// POST /snippets
app.post('/snippets', (req, res) => {});
// GET /snippets
app.get('/snippets', (req, res) => {});
// GET /snippets/:id
app.get('/snippets/:id', (req, res) => {});
// PATCH /snippets/:id
app.patch('/snippets/:id', (req, res) => {});
// DELETE /snippets/:id
app.delete('/snippets/:id', (req, res) => {});

app.listen(5000, () => {
  console.log('Snips server running on Port 5000');
});
