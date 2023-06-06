const express = require('express')
const app = express()
const apiKeyMiddleware = require('./middleware/api.middleware')

let morgan = require('morgan')
require('dotenv').config()
app.use(morgan('tiny'))


app.use(apiKeyMiddleware);


const authRoute = require('./routes/auth.route')
app.use('/api/auth', authRoute)

const flightRoute = require('./routes/flight.route')
app.use('/api/flights', flightRoute)

app.listen(process.env.port, () => {
  console.info('server running on port: ',process.env.port)
})