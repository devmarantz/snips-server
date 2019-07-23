const fs = require('fs').promises;
const path = require('path');

/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {strin}
 */

/* Create */
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
