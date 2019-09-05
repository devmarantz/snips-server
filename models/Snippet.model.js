const shortid = require('shortid');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');
const db = require('../db/index');

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
    if(!code || !title || !description || !author || !language){
      throw new ErrorWithHttpStatus('Missing Properties', 400);
    }
    const result = await db.query('INSERT INTO snippet (code, title, description, author, language) VALUES ($1, $2, $3, $4, $5)', [code, title, description, author, language]);
    return result;
    // if (!author || !code || !title || !description || !language)
    //   throw new ErrorWithHttpStatus('Missing Properties', 400);
    // // read snippets.json
    // const snippets = await readJsonFromDb('snippets');
    // // grab data from newSnippet (validate)
    // // make newSnippet a proper object
    // // generate default data (id, comments, favorites)
    // // push that object into snippets
    // snippets.push({
    //   id: shortid.generate(),
    //   author,
    //   code,
    //   title,
    //   description,
    //   language,
    //   comments: [],
    //   favorites: 0,
    // });
    // // write back to the file
    // await writeJsonToDb('snippets', snippets);
    // return snippets[snippets.length - 1];
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};

/* Read */
/**
 * Selects snippets from db.
 * Can accept optional query object to filter results.
 * Otherwise returns all snippets
 * @param {Object} {query}
 * @returns {Promise<Object[]>}
 */
exports.select = async (query = {}) => {
  try {
    if(Object.keys(query).length > 0){
      var keys = Object.keys(query);
      var values = Object.values(query);
      var params = [];
      var queries = [];
      for(var i = 1; i <= keys.length ; i++) {
        params.push(keys[i-1] + ' = $' + (i));
        queries.push(`${values[i-1]}`);
      }
      var queryText = 'SELECT * FROM snippet WHERE ' + params.join(' AND ');
      const result = await db.query(queryText, queries)
      return result;
    } else {
      const result = await db.query('SELECT * FROM snippet');
      return result;
    }
    // Old code
    // // 1. Read & Parse the file
    // const snippets = await readJsonFromDb('snippets');
    // // filter snippets with query
    // const filtered = snippets.filter(snippet => Object.keys(query).every(key => query[key] === snippet[key]));
    // // 3. Return the data
    // return filtered;
  } catch (err) {
    console.log(err);
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
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
  try {
    const { code, title, description, author, language } = newData;
    const result = await db.query('UPDATE snippet SET code = $1, title = $2, description = $3, author = $4, language = $5 WHERE id = $6', [code, title, description, author, language, id]);
    return result;
    // // 1. read file
    // const snippets = await readJsonFromDb('snippets');
    // // 2. find the entry with id
    // const updatedSnippets = snippets.map(snippet => {
    //   // if it's not the one we want, just return it
    //   if (snippet.id !== id) return snippet;

    //   // loop over keys in new data
    //   Object.keys(newData).forEach(key => {
    //     // check if snippet has that key and set it
    //     if (key in snippet) snippet[key] = newData[key];
    //   });
    //   return snippet;
    // });
    // // 3. update the snippet with appropriate data (make sure to validate!)
    // await writeJsonToDb('snippets', updatedSnippets);
    // return updatedSnippets;
    // // 4. write the file
  } catch {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};

/**
 *  Deletes a snippet
 * @param {string} id - id of the snippet to delete
 * @returns {Promise<void>}
 */
// TODO: Add error handler
exports.delete = async id => {
  try {
    const result = await db.query(`DELETE FROM snippet WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      throw new ErrorWithHttpStatus('ID Does not exist', 400);
    }
    return result;
    // Old Code
    // // 1. Read in the db file
    // const snippets = await readJsonFromDb('snippets');
    // // 2. Check if id exists
    // // 3. filter snippets for everything except snippet.id === id
    // const filtered = snippets.filter(snippet => id !== snippet.id);
    // // 4. write the file
    // // Skips new write if id DNE
    // if (filtered.length === snippets.length) {
    //   throw new ErrorWithHttpStatus('ID Does not exist', 400);
    // }
    // await writeJsonToDb('snippets', filtered);
    // return filtered;
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database Error', 500);
  }
};
