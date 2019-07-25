const Snippet = require('../models/Snippet.model');

exports.createSnippet = async (req, res) => {
  try {
    const newSnippet = await Snippet.insert(req.body);
    res.status(201).send(newSnippet);
  } catch (err) {
    res.send(err);
  }
};

exports.getAllSnippets = async (req, res) => {
  // 1.get data from Snippets model
  const snippets = await Snippet.select();
  // 2. send that out
  res.send(snippets);
};

exports.getOneSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    // 1.get data from Snippets model
    const snippets = await Snippet.select({ id: `${id}` });
    // 2. send that out
    res.send(snippets);
  } catch (err) {
    res.send(err);
  }
};

exports.deleteSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const snippets = await Snippet.delete(id);
    res.send(snippets);
  } catch (err) {
    res.send(err);
  }
};

exports.updateSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const snippets = await Snippet.update(id, req.body);
    res.send(snippets);
  } catch (err) {
    res.send(err);
  }
};
