const fs = require('fs').promises;

logger = async (req, res, next) => {
  // console.log(req.method, req.path, Date.now());
  // append "method path timestamp" to log.text
  // WARNING: Be careful about pathing
  await fs.appendFile('log.txt', `\n${req.method}  ${req.path}  ${Date.now()}\n`);
  next(); //move on to the next piece of middleware
};

module.exports = logger;
