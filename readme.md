# TO RUN LOCALLY
## 1. install dependencies
`npm install`

## 2. create database and table
### Database Schema

````SQL
CREATE DATABASE flightapi;
````

````SQL
CREATE TABLE api_keys (  id SERIAL PRIMARY KEY,  api_key VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW())
````

````SQL
INSERT INTO api_keys (api_key) VALUES  ('abc123'),  ('def456'),  ('ghi789'),  ('jkl012'),  ('mno345')
````

````SQL
CREATE TABLE airport_data ( icao VARCHAR(4), iata VARCHAR(3), name VARCHAR(255), city VARCHAR(255), state VARCHAR(255), country VARCHAR(255), elevation INTEGER, lat FLOAT, lon FLOAT, tz VARCHAR(255))
````
## 3. set the environment variables in .env file

## 4 insert data in database
`node utils/batchInsert.js`

## 5. run the server
`npm start`

**********************************************************************************************************************


# SAMPLE REQUEST
*if httpS doesn't work, please use HTTP*
### `https://flight.thenewabacus.com/api/flights/originICAO/destinationICAO`

## Sample http request(POWERSHELL)
`Invoke-WebRequest -Uri 'https://flight.thenewabacus.com/api/flights/RPLL/KJFK' -Headers @{'api-key' = 'mno345'}`

## Sample http request(cURL)[linux]
`curl --location --request GET 'https://flight.thenewabacus.com/api/flights/RPLL/KJFK'--header 'api-key: mno345'`

## API KEYS
####  `abc123`, `def456`, `ghi789`, `jkl012`, `mno345`
### Response: JSON
```JSON
{
    "INR": {
        "fareAIrIndia": "54782.27",
        "fareIndigo": "82173.41",
        "fareSpiceJet": "95868.98",
        "fareVistara": "109564.55"
    }
}
```



REFERENCES:

[Airports Data](https://github.com/mwgg/Airports)

[calculating distance between two coordinates](https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula)

[haversine formula](https://www.igismap.com/haversine-formula-calculate-geographic-distance-earth/)

[express documentation](https://expressjs.com/en/5x/api.html)

[node postgres documentation](https://node-postgres.com/)

[ssl certificate guide](https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca)

[another ssl certificate guide](https://flaviocopes.com/express-letsencrypt-ssl/#:~:text=Setup%20Let%27s%20Encrypt%20for%20Express%201%20Install%20Certbot,the%20certificate%20...%206%20Setup%20the%20renewal%20)
