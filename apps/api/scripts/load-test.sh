#!/bin/bash

# Simple load test script that makes cURL requests every 2 seconds
# Usage: ./load-test.sh

URL="http://localhost:3001/backend-api/competitions/99a8f533-b745-48c6-afb3-252a0c02e25b/agents?limit=10&offset=0"

echo "Starting load test for: $URL"
echo "Making requests every 2 seconds..."
echo "Press Ctrl+C to stop"
echo ""

# Counter for requests
counter=1

while true; do
    echo "Request #$counter - $(date)"

    # Start timer
    start_time=$(date +%s.%N)

    # Make the request and capture response details
    response=$(curl -s -o /dev/null -w "Status: %{http_code}, Connect: %{time_connect}s, Total: %{time_total}s" "$URL")

    # End timer
    end_time=$(date +%s.%N)

    # Calculate elapsed time
    elapsed=$(echo "$end_time - $start_time" | bc -l)

    echo "$response, Script Timer: ${elapsed}s"
    echo ""

    ((counter++))
    sleep 2
done
