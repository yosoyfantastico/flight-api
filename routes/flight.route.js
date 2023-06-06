const express =  require('express')
const router = express.Router()
const flightController = require('../controllers/flight.controller')

router.route('/:origin/:destination').get(flightController.getFlightFare)

module.exports = router