const Snippet = require('../models/Snippet.model');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

exports.createSnippet = async (req, res, next) => {
  try {
    const newSnippet = await Snippet.insert(req.body);
    res.status(201).send(newSnippet);
  } catch (err) {
    next(err);
  }
};

exports.getAllSnippets = async ({ query }, res, next) => {
  try {
    // 1.get data from Snippets model
    const snippets = await Snippet.select(query);
    // 2. send that out
    res.send(snippets);
  } catch (err) {
    next(err);
  }
};

exports.getSnippetByID = async ({ params: { id } }, res, next) => {
  try {
    // 1.get data from Snippets model
    const snippets = await Snippet.select({ id });
    if (snippets.length === 0) {
      throw new ErrorWithHttpStatus('ID does not exist', 404);
    }
    // 2. send that out
    res.send(snippets[0]);
  } catch (err) {
    next(err);
  }
};

exports.deleteSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const snippets = await Snippet.delete(id);
    res.send(snippets);
  } catch (err) {
    next(err);
  }
};

exports.updateSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const snippets = await Snippet.update(id, req.body);
    res.send(snippets);
  } catch (err) {
    next(err);
  }
};
