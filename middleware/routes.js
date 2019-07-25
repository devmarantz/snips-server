const express = require('express');
const Snippet = require('../models/Snippet.model');
const {
  createSnippet,
  getAllSnippets,
  getOneSnippet,
  updateSnippet,
  deleteSnippet,
} = require('../controllers/snippets.controller');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(`We're in the router`);
  res.send('Welcome to Snips');
  next();
});

/* Snippets Route*/
// POST /api/snippets
router.post('/api/snippets', createSnippet);

// GET /api/snippets
router.get('/api/snippets', getAllSnippets);
// GET /api/snippets/:id
router.get('/api/snippets/:id', getOneSnippet);
// PATCH /api/snippets/:id
router.patch('/api/snippets/:id', updateSnippet);
// DELETE /api/snippets/:id
router.delete('/api/snippets/:id', deleteSnippet);

module.exports = router;
