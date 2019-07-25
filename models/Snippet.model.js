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
    await writeJsonToDb('snippets', snippets);
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
    // 1. Read & Parse the file
    const snippets = await readJsonFromDb('snippets');
    // filter snippets with query
    const filtered = snippets.filter(snippet => Object.keys(query).every(key => query[key] === snippet[key]));
    // 3. Return the data
    return filtered;
  } catch (err) {
    console.log('Error in Snippet model');
    throw err;
  }
};

/**
 *  Updates a snippet
 * @param {string} id - id of the snippet to update
 * @param {Snippet} newData - subset of values to update
 * @returns {Promise<void>}
 */
// TODO: Add error handler
exports.update = async (id, newData) => {
  // 1. read file
  const snippets = await readJsonFromDb('snippets');
  // 2. find the entry with id
  const updatedSnippets = snippets.map(snippet => {
    // if it's not the one we want, just return it
    if (snippet.id !== id) return snippet;

    // loop over keys in new data
    Object.keys(newData).forEach(key => {
      // check if snippet has that key and set it
      if (key in snippet) snippet[key] = newData[key];
    });
    return snippet;
  });
  // 3. update the snippet with appropriate data (make sure to validate!)
  await writeJsonToDb('snippets', updatedSnippets);
  return updatedSnippets;
  // 4. write the file
};

/**
 *  Deletes a snippet
 * @param {string} id - id of the snippet to delete
 * @returns {Promise<void>}
 */
// TODO: Add error handler
exports.delete = async id => {
  try {
    // 1. Read in the db file
    const snippets = await readJsonFromDb('snippets');
    // 2. Check if id exists
    // 3. filter snippets for everything except snippet.id === id
    const filtered = snippets.filter(snippet => id !== snippet.id);
    // 4. write the file
    // Skips new write if id DNE
    if (filtered.length === snippets.length) {
      throw Error('ID Does not exist');
    }
    await writeJsonToDb('snippets', filtered);
    return filtered;
  } catch (err) {
    throw err;
  }
};
