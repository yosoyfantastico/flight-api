const pool = require('../utils/dbConfig')
const os = require('os');
const hostname = os.hostname();
const {
    EARTH_RADIUS,
    FARE_PER_KM_AIR_INDIA,
    FARE_PER_KM_INDIGO,
    FARE_PER_KM_SPICEJET,
    FARE_PER_KM_VISTARA,
} = require('../constants/numbers')

async function getFlightFare(req, res) {

    const {
        fareAIrIndia,
        fareIndigo,
        fareSpiceJet,
        fareVistara
    } = await calculateFlightFare(req.params.origin, req.params.destination, res)

    const fares = {
        fareAIrIndia,
        fareIndigo,
        fareSpiceJet,
        fareVistara
    };

    // Round off the numbers to 2 decimal places
    const roundedFares = {};
    for (const key in fares) {
        const roundedValue = fares[key].toFixed(2);
        roundedFares[key] = roundedValue;
    }

    return res.status(200).json({ INR: roundedFares })
}

async function calculateFlightFare(origin, destination, res) {
    try {
        const { lat: originLat, lon: originLon } = await fetchCoordinates(origin)
        const { lat: destLat, lon: destLon } = await fetchCoordinates(destination)

        const originLatRad = toRadians(originLat)
        const originLonRad = toRadians(originLon)
        const destLatRad = toRadians(destLat)
        const destLonRad = toRadians(destLon)

        // Calculate the differences between the latitudes and longitudes
        const latDiff = destLatRad - originLatRad
        const lngDiff = destLonRad - originLonRad

        // calculating the distance between two coordinates using the HAVERSINE formula
        const a = Math.sin(latDiff / 2) ** 2 + Math.cos(originLatRad) * Math.cos(destLatRad) * Math.sin(lngDiff / 2) ** 2
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = EARTH_RADIUS * c

        const fareAIrIndia = distance * FARE_PER_KM_AIR_INDIA
        const fareIndigo = distance * FARE_PER_KM_INDIGO
        const fareSpiceJet = distance * FARE_PER_KM_SPICEJET
        const fareVistara = distance * FARE_PER_KM_VISTARA

        return {
            fareAIrIndia,
            fareIndigo,
            fareSpiceJet,
            fareVistara
        }
    } catch (error) {
        console.log('Error in calculating flight fare:', error);
        return res.status(500).json({ error: error.message })
    }
}

// console.log('Current hostname:', hostname);
async function fetchCoordinates(icao_code) {
    const query = `SELECT * FROM airport_data WHERE icao = '${icao_code}'`
    const result = await pool.query(query)

    if (result.rowCount === 1) {
        const lat = result.rows[0].lat
        const lon = result.rows[0].lon
        return { lat, lon }
    } else {
        const error = `couldn\'t find the airport, make sure you are using the correct ICAO code, Please refer to ${hostname}/airports/airports.json`
        throw new Error(error);
    }
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180)
}

module.exports = { getFlightFare }