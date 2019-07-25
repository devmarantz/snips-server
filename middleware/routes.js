const express = require('express');
const Snippet = require('../models/Snippet.model');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(`We're in the router`);
  res.send('Welcome to Snips');
  next();
});

/* Snippets Route*/
// POST /api/snippets
router.post('/api/snippets', async (req, res) => {
  try {
    const newSnippet = await Snippet.insert(req.body);
    res.send(newSnippet);
  } catch (err) {
    res.send(err);
  }
});
// GET /api/snippets
router.get('/api/snippets', async (req, res) => {
  // 1.get data from Snippets model
  const snippets = await Snippet.select();
  // 2. send that out
  res.send(snippets);
});
// GET /api/snippets/:id
router.get('/api/snippets/:id', async (req, res) => {
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
router.patch('/api/snippets/:id', async (req, res) => {});
// DELETE /api/snippets/:id
router.delete('/api/snippets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const snippets = await Snippet.delete(id);
    res.send(snippets);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
