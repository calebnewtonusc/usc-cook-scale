#!/bin/bash

echo "========================================="
echo "TESTING ALL USC COOK SCALE API ENDPOINTS"
echo "========================================="
echo ""

BACKEND="https://usc-cook-scale-backend.vercel.app"
ORIGIN="https://usc-cook-scale.vercel.app"

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

test_count=0
pass_count=0
fail_count=0

# Function to test OPTIONS preflight
test_options() {
    endpoint=$1
    echo -e "${YELLOW}Testing OPTIONS: $endpoint${NC}"
    
    http_code=$(curl -s -o /dev/null -w "%{http_code}" -X OPTIONS "$BACKEND$endpoint" \
        -H "Origin: $ORIGIN" \
        -H "Access-Control-Request-Method: POST" \
        -H "Access-Control-Request-Headers: Content-Type")
    
    test_count=$((test_count + 1))
    
    if [ "$http_code" = "200" ] || [ "$http_code" = "204" ]; then
        echo -e "${GREEN}✅ PASS - OPTIONS returned $http_code${NC}"
        pass_count=$((pass_count + 1))
        return 0
    else
        echo -e "${RED}❌ FAIL - OPTIONS returned $http_code (expected 200 or 204)${NC}"
        fail_count=$((fail_count + 1))
        return 1
    fi
}

# Function to test POST endpoint
test_post() {
    endpoint=$1
    data=$2
    echo -e "${YELLOW}Testing POST: $endpoint${NC}"
    
    response=$(curl -s -w "\n%{http_code}" -X POST "$BACKEND$endpoint" \
        -H "Content-Type: application/json" \
        -d "$data")
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    test_count=$((test_count + 1))
    
    if [ "$http_code" = "200" ] || [ "$http_code" = "400" ] || [ "$http_code" = "201" ]; then
        echo -e "${GREEN}✅ PASS - POST returned $http_code${NC}"
        echo "Response: ${body:0:100}..."
        pass_count=$((pass_count + 1))
        return 0
    else
        echo -e "${RED}❌ FAIL - POST returned $http_code${NC}"
        echo "Response: $body"
        fail_count=$((fail_count + 1))
        return 1
    fi
}

echo "1. Testing /api/parse-schedule"
echo "================================"
test_options "/api/parse-schedule"
test_post "/api/parse-schedule" '{"scheduleText": "CSCI-103 with Slocum, 4 units"}'
echo ""

echo "2. Testing /api/analyze-schedule"
echo "=================================="
test_options "/api/analyze-schedule"
test_post "/api/analyze-schedule" '{"classes": [{"courseName": "CSCI-103", "professor": "Slocum", "units": 4}]}'
echo ""

echo "3. Testing /api/parse-image"
echo "============================="
test_options "/api/parse-image"
echo "Skipping POST test (requires valid image base64)"
echo ""

echo "4. Testing /api/parse-pdf"
echo "=========================="
test_options "/api/parse-pdf"
echo "Skipping POST test (requires valid PDF base64)"
echo ""

echo "5. Testing /api/research-professor"
echo "===================================="
test_options "/api/research-professor"
test_post "/api/research-professor" '{"professor": "Redekopp", "courseName": "CSCI-104"}'
echo ""

echo "========================================="
echo "TEST SUMMARY"
echo "========================================="
echo -e "Total tests: $test_count"
echo -e "${GREEN}Passed: $pass_count${NC}"
echo -e "${RED}Failed: $fail_count${NC}"
echo ""

if [ $fail_count -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  SOME TESTS FAILED!${NC}"
    exit 1
fi
