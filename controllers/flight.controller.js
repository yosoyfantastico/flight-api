
const calculateFlightFare = require('../utils/calculateFare')
exports.getFlightFare = (req, res) => {

    const origin = req.params.origin;
    const destination = req.params.destination;

    const fare = calculateFlightFare(origin, destination);

    res.json({ origin, destination, fare });

}


