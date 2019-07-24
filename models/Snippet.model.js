const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils');

/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */

/* Create */
/**
 * Inserts a new snippet into the db
 * @param {Snippet} newSnippet - the data to create the snippet with
 * @returns {Promise<Snippet>} the created snippet
 */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language) throw Error('Missing Properties!');
    // read snippets.json
    const snippets = await readJsonFromDb('snippets');
    // grab data from newSnippet (validate)
    // make newSnippet a proper object
    // generate default data (id, comments, favorites)
    // push that object into snippets
    snippets.push({
      id: shortid.generate(),
      author,
      code,
      title,
      description,
      language,
      comments: [],
      favorites: 0,
    });
    // write back to the file
    await fs.writeFile(dbPath, JSON.stringify(snippets));
    return snippets[snippets.length - 1];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/* Read */
/**
 * Selects snippets from db.
 * Can accept optional quer object to filter results.
 * @param {Object} {query}
 * @returns {Promise<Object[]>}
 */
exports.select = async (query = {}) => {
  try {
    // 1. Read & Pa the file
    const dbPath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbPath));
    // filter snippets with query
    const filtered = snippets.filter(snippet => Object.keys(query).every(key => query[key] === snippet[key]));
    // 3. Return the data
    return filtered;
  } catch (err) {
    console.log('Error in Snippet model');
    throw err;
  }
};

/* Update */
/* Delete */
exports.delete = id => {
  // 1. Read in the db file
  // 2. filter snippets for everything except snippet.id === id
  // 3. write the file
};
