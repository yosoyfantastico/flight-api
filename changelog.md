# Change Log

## error handling in controller
## middleware improvements
- added exception for api url
## Improvements MVP features
- added error handling, when the icao code is not found, it will return an error message to the user
- added route for the airport data, for reference
- removed the formatNumberWithCommas, price can be formatted in the frontend if required

- added airports.json and batchInsert.js [for development only]
## MVP features
- api returns the price of the flights from different providers
    - used Haversine formula to calculate the distance between two points
    - modified the code which fetched airport data into async functions
    - embeded the function to calculate fare into the controller
    - fare is calculated based on the distance between the two airports
    - now using icao code to fetch the airport data, instead of city name
    - constant variables are now in the directory called constants, classified by string and numbers
    
    >@todo::
    error handling in the controller
    fixing the formatNumberWithCommas function

## Repository Genesis
- auth controller for frontend added [wip]
- controller method for flight fare added [wip]
- function to calculate price added, is Work in progress[WIP]

- middleware added to verify the api key
- api key table added in the database (query in readme.md)
- readme added
- bash script to deploy the procect added [wip]