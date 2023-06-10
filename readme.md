# Example
## METHOD: GET
### `localhost:80/api/flights/origin/destination`

### Response: JSON
```JSON
{
  "indigo": "₹1,614",
  "airAsia": "₹1,869",
  "vistara": "₹2, 133"
}
```

````SQL
CREATE TABLE api_keys (  id SERIAL PRIMARY KEY,  api_key VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW())
````

````SQL
INSERT INTO api_keys (api_key) VALUES  ('abc123'),  ('def456'),  ('ghi789'),  ('jkl012'),  ('mno345')
````

````SQL
CREATE TABLE airport_data ( icao VARCHAR(4), iata VARCHAR(3), name VARCHAR(255), city VARCHAR(255), state VARCHAR(255), country VARCHAR(255), elevation INTEGER, lat FLOAT, lon FLOAT, tz VARCHAR(255))
````

REFERENCES:
https://github.com/mwgg/Airports
https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
https://www.igismap.com/haversine-formula-calculate-geographic-distance-earth/
https://expressjs.com/en/5x/api.html
https://node-postgres.com/