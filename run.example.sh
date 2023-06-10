#!/bin/bash
export port=5432
export web_port=80
export user=postgres
export host=
export database=flightapi
export password=

pm2 start server.js --name flightAPI
