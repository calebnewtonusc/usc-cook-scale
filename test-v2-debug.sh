#!/bin/bash

API_URL="https://usc-cook-scale-backend.vercel.app"

echo "Testing V2 endpoint with debug..."
echo ""

# Test with ONE class first
curl -X POST "$API_URL/api/analyze-schedule-v2" \
  -H "Content-Type: application/json" \
  -d '{
    "classes": [
      {
        "courseName": "CSCI-103",
        "professor": "Slocum, Carter",
        "units": 4
      }
    ]
  }' \
  --max-time 120 \
  -v 2>&1 | head -100

