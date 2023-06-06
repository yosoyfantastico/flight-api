#!/bin/bash
export port=80
export user=your_username
export host=localhost
export database=your_database_name
export password=your_password

pm2 start server.js --name flightAPI