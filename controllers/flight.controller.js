const pool = require('../utils/dbConfig')
/**
 * @TODO
 * -- do some better error handling when origin or destination is not found 
 *    in method fetchOriginCoordinates or fetchDestinationCoordinates 's else block
 * -- formatNumberWithCommas doesn't work
 */
const {
    EARTH_RADIUS,
    FARE_PER_KM_AIR_INDIA,
    FARE_PER_KM_INDIGO,
    FARE_PER_KM_SPICEJET,
    FARE_PER_KM_VISTARA,
} = require('../constants/numbers')

const { CURRENCY_SYMBOL } = require('../constants/strings')

async function getFlightFare(req, res) {

    const {
        fareAIrIndia,
        fareIndigo,
        fareSpiceJet,
        fareVistara
    } = await calculateFlightFare(req.params.origin, req.params.destination)

    const fares = {
        fareAIrIndia,
        fareIndigo,
        fareSpiceJet,
        fareVistara
    };

    // Round off the numbers to 2 decimal places and format with commas
    const roundedFares = {};
    for (const key in fares) {
        const roundedValue = fares[key].toFixed(2);
        
        const formattedValue = `${formatNumberWithCommas(roundedValue)}`;
        roundedFares[key] = formattedValue;
    }
    return res.status(200).json({INR:roundedFares})
}

async function calculateFlightFare(origin, destination) {

    const { originLat, originLon } = await fetchOriginCoordinates(origin)
    const { destLat, destLon } = await fetchDestinationCoordinates(destination)

    const originLatRad = toRadians(originLat)
    const originLonRad = toRadians(originLon)
    const destLatRad = toRadians(destLat)
    const destLonRad = toRadians(destLon)

    // Calculate the differences between the latitudes and longitudes
    const latDiff = destLatRad - originLatRad
    const lngDiff = destLonRad - originLonRad

    // calculatting the distance bet two coordinates using the Haversine formula
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
}

async function fetchOriginCoordinates(origin) {
    const query = `SELECT * FROM airport_data WHERE icao = '${origin}'`
    const result = await pool.query(query)

    if (result.rowCount === 1) {
        const originLat = result.rows[0].lat
        const originLon = result.rows[0].lon
        return { originLat, originLon }
    } else {
        return { error: 'Origin not found' };
    }
}

async function fetchDestinationCoordinates(destination) {
    const query = `SELECT * FROM airport_data WHERE icao = '${destination}'`
    const result = await pool.query(query)
    if (result.rowCount === 1) {
        const destLat = result.rows[0].lat
        const destLon = result.rows[0].lon
        return { destLat, destLon }
    } else {
        return { error: 'Destination not found' };
    }
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180)
}
function formatNumberWithCommas(number) {
    return number.toLocaleString('en-IN');
}
module.exports = { getFlightFare }