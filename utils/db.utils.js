const fs = require('fs').promises;
const path = require('path');

exports.readJsonFromDb = async resource => {
  const dbPath = path.join(__dirname, '..', 'db', `${resource}.json`);
  return JSON.parse(await fs.readFile(dbPath));
};

exports.writeJsonToDb = async (resource, data) => {
  const dbPath = path.join(__dirname, '..', 'db', `${resource}.json`);
  return await fs.writeFile(dbPath, data);
};
