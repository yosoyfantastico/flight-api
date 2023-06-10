async function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers['api-key']
  const pool = require('../utils/dbConfig')
  let queryString = `SELECT * FROM api_keys WHERE api_key = '${apiKey}'`
  const result = await pool.query(queryString)
  if (result.rowCount === 1) {
    next()
  } else {
    return res.status(400).json({ error: 'Invalid API key' });
  }
}

module.exports = apiKeyMiddleware