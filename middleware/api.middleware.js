async function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers['api-key'];
  console.log('inside middleware')
  const pool = require('../utils/dbConfig')
  let err
  pool.query(`SELECT * FROM api_keys WHERE api_key = '${apiKey}'`, (err, res) => {
    console.log('inside query in api middleware')
    if (!err) {
      if (res.rowCount == 1) {
        next();
      }
      else {
        err = true
      }
    }
  });
  if(err){
    return res.status(400).json({ res: 'couldnt find what youare looking for' })
  }
};
module.exports = apiKeyMiddleware