const express = require('express')
const path = require('path');
const app = express()
const apiKeyMiddleware = require('./middleware/api.middleware')

let morgan = require('morgan')
require('dotenv').config()
app.use(morgan('tiny'))

app.use(apiKeyMiddleware)
const utilsFolderPath = path.join(__dirname, 'utils');

app.use('/airports', express.static(utilsFolderPath));

const flightRoute = require('./routes/flight.route')
app.use('/api/flights', flightRoute)

app.listen(process.env.web_port, () => {
  console.info('server running on web_port: ',process.env.web_port)
})