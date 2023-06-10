//batch insert chat.openai.com
const { Pool } = require('pg');
require('dotenv').config()
const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: 5432, // default PostgreSQL port
});
console.log('started')
const data = require('./airports.json'); // Replace with the path to your JSON file


const entries = Object.entries(data);
console.log(entries.length);
const batchSize = 1000; // Number of entries to insert per batch
let batchCount = 0;
let batchValues = [];
let TIME_TAKEN = 0
let totalRowsInserted = 0;

const insertBatch = async (values) => {
    const placeholders = values.map((_, index) => `($${index * 10 + 1}, $${index * 10 + 2}, $${index * 10 + 3}, $${index * 10 + 4}, $${index * 10 + 5}, $${index * 10 + 6}, $${index * 10 + 7}, $${index * 10 + 8}, $${index * 10 + 9}, $${index * 10 + 10})`).join(', ');
    const query = `INSERT INTO airport_data (icao, iata, name, city, state, country, elevation, lat, lon, tz)
                   VALUES ${placeholders}`;

    try {
        const startTime = new Date(); // Start time
        await pool.query(query, values.flat());
        const endTime = new Date(); // End time
        const elapsedTime = endTime - startTime;
        TIME_TAKEN+=elapsedTime
        // console.log(`Batch ${batchCount} inserted successfully in ${elapsedTime}ms`);
    } catch (err) {
        console.error(`Error inserting batch ${batchCount}`, err);
    }
};

const insertData = async () => {
    for (const [icao, entry] of entries) {
        const { iata, name, city, state, country, elevation, lat, lon, tz } = entry;
        const values = [icao, iata, name, city, state, country, elevation, lat, lon, tz];
        batchValues.push(values);

        if (batchValues.length >= batchSize) {
            
            await insertBatch(batchValues);
            totalRowsInserted += batchValues.length;
            batchValues = [];
            batchCount++;
        }
    }

    if (batchValues.length > 0) {
        await insertBatch(batchValues);
        
    }

    console.log(`THIS JOB TOOK ${TIME_TAKEN/1000} SECONDS and ${totalRowsInserted} rows were inserted`)
    // Close the database connection
    pool.end();
};

insertData();