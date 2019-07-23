const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

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
 *
 */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    // read snippets.json
    const dbPath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbPath));
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
    return fs.writeFile(dbPath, JSON.stringify(snippets));
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
