const fs = require('fs');
function calculateFlightFare(origin, destination) {
    const earthRadius = 6371;
    //fetch origin's and destination's data from postges pool
    const pool = require('../utils/dbConfig')
    let originLat, originLng, destLat, destLng
    let err
    console.log('===', origin, destination)
    /**
      * @todo
      * both the pool.query methods dont fetch data, becayse there are more than one cities with the same name
      * potential fixes: 
      *     * use iata code instead of city name
      *     * ask for city, state, country instead of just city
     */
    pool.query(`SELECT * FROM airport_data WHERE city = '${origin}'`, (err, res) => {
        console.log('inside query in api calculate fare origin')
        if (!err) {


            console.log('not error source')
            console.log('res', res.rowCount)
            if (res.rowCount == 1) {
                originLat = res.rows[0].latitude
                originLng = res.rows[0].longitude
                console.log('origin', originLat, originLng)
            }
            else {
                err = true
            }
        }
        else {
            console.log('found error in origin')
        }
    });
    pool.query(`SELECT * FROM airport_data WHERE city = '${destination}'`, (err, res) => {
        console.log('inside query in api calculate fare dest')
        if (!err) {
            console.log('not error dest')
            console.log('res', res.rowCount)
            if (res.rowCount == 1) {
                destLat = res.rows[0].latitude
                destLng = res.rows[0].longitude
                console.log('dest', destLat, destLng)
            }
            else {
                err = true
            }
        }
        else {
            console.log('found error in dest')
        }

    });
    if (err) {
        return res.status(400).json({ res: 'couldnt find what youare looking for' })
    }


    // const originLatRad = toRadians(originLat);
    // const originLngRad = toRadians(originLng);
    // const destLatRad = toRadians(destLat);
    // const destLngRad = toRadians(destLng);

    return Math.floor(Math.random() * (1000 - 100 + 1) + 100);
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
module.exports = calculateFlightFare;