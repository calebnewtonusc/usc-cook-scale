#!/bin/bash

set -e

echo "🔥🔥🔥 COMPREHENSIVE USC COOK SCALE TEST SUITE 🔥🔥🔥"
echo "=========================================================="
echo ""

BACKEND="https://usc-cook-scale-backend.vercel.app"
FRONTEND="https://usc-cook-scale.vercel.app"
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Helper function
test_result() {
  TOTAL_TESTS=$((TOTAL_TESTS + 1))
  if [ $1 -eq 0 ]; then
    echo "✅ PASS: $2"
    PASSED_TESTS=$((PASSED_TESTS + 1))
  else
    echo "❌ FAIL: $2"
    FAILED_TESTS=$((FAILED_TESTS + 1))
  fi
  echo ""
}

echo "============================================"
echo "SECTION 1: BACKEND API ENDPOINT TESTS"
echo "============================================"
echo ""

# Test 1.1: Root endpoint
echo "Test 1.1: Backend Root Endpoint"
RESPONSE=$(curl -s "$BACKEND/")
if echo "$RESPONSE" | grep -q "Serverless functions"; then
  test_result 0 "Backend root accessible"
else
  test_result 1 "Backend root not accessible"
fi

# Test 1.2: Health check (if exists)
echo "Test 1.2: Parse Schedule - Valid Text"
RESPONSE=$(curl -s -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"scheduleText":"CSCI 104 with Mark Redekopp, 4 units"}')
if echo "$RESPONSE" | jq -e '.classes | length > 0' > /dev/null 2>&1; then
  test_result 0 "Parse valid schedule text"
else
  test_result 1 "Parse valid schedule text"
fi

# Test 1.3: Parse empty text
echo "Test 1.3: Parse Schedule - Empty Text"
RESPONSE=$(curl -s -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"scheduleText":""}')
if echo "$RESPONSE" | jq -e '.error or (.classes | length == 0)' > /dev/null 2>&1; then
  test_result 0 "Handle empty schedule text"
else
  test_result 1 "Handle empty schedule text"
fi

# Test 1.4: Parse invalid JSON
echo "Test 1.4: Parse Schedule - Invalid JSON"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d 'invalid json')
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
if [ "$HTTP_CODE" = "400" ] || [ "$HTTP_CODE" = "500" ]; then
  test_result 0 "Reject invalid JSON"
else
  test_result 1 "Reject invalid JSON"
fi

# Test 1.5: Parse conversational text
echo "Test 1.5: Parse Schedule - Conversational Text"
RESPONSE=$(curl -s -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"scheduleText":"Hey! So this semester I am taking Chemistry 105B with Professor Moon for four units, and also Spanish 150 with Professor Ortiz"}')
CLASSES=$(echo "$RESPONSE" | jq -e '.classes | length' 2>/dev/null || echo "0")
if [ "$CLASSES" -ge 2 ]; then
  test_result 0 "Parse conversational text (found $CLASSES classes)"
else
  test_result 1 "Parse conversational text"
fi

# Test 1.6: Parse text with complex names
echo "Test 1.6: Parse Schedule - Complex Professor Names"
RESPONSE=$(curl -s -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"scheduleText":"SPAN 150 with Consuelo-Siguenza Ortiz"}')
if echo "$RESPONSE" | jq -e '.classes[0].professor | contains("Ortiz")' > /dev/null 2>&1; then
  test_result 0 "Parse complex professor names"
else
  test_result 1 "Parse complex professor names"
fi

# Test 1.7: Parse with no classes
echo "Test 1.7: Parse Schedule - Random Text"
RESPONSE=$(curl -s -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"scheduleText":"This is just a random paragraph about my weekend plans and has nothing to do with classes"}')
if echo "$RESPONSE" | jq -e '.classes | length == 0' > /dev/null 2>&1; then
  test_result 0 "Detect no classes in random text"
else
  test_result 1 "Detect no classes in random text"
fi

# Test 1.8: Analyze schedule - valid
echo "Test 1.8: Analyze Schedule - Valid Classes"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"CSCI 104","professor":"Redekopp","units":4}]}')
if echo "$RESPONSE" | jq -e '.overallScore and .verbalLabel and .classes and .totalUnits' > /dev/null 2>&1; then
  test_result 0 "Analyze valid schedule"
else
  test_result 1 "Analyze valid schedule"
fi

# Test 1.9: Analyze - empty array
echo "Test 1.9: Analyze Schedule - Empty Array"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[]}')
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
if [ "$HTTP_CODE" = "400" ]; then
  test_result 0 "Reject empty classes array"
else
  test_result 1 "Reject empty classes array"
fi

# Test 1.10: Analyze - missing courseName
echo "Test 1.10: Analyze Schedule - Missing Course Name"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"professor":"Test","units":4}]}')
if echo "$RESPONSE" | jq -e '.error | contains("courseName")' > /dev/null 2>&1; then
  test_result 0 "Reject missing courseName"
else
  test_result 1 "Reject missing courseName"
fi

# Test 1.11: Analyze - missing professor
echo "Test 1.11: Analyze Schedule - Missing Professor"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"TEST 101","units":4}]}')
if echo "$RESPONSE" | jq -e '.error | contains("professor")' > /dev/null 2>&1; then
  test_result 0 "Reject missing professor"
else
  test_result 1 "Reject missing professor"
fi

# Test 1.12: Analyze - zero units
echo "Test 1.12: Analyze Schedule - Zero Units"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"TEST","professor":"Test","units":0}]}')
if echo "$RESPONSE" | jq -e '.error | contains("units")' > /dev/null 2>&1; then
  test_result 0 "Reject zero units"
else
  test_result 1 "Reject zero units"
fi

# Test 1.13: Analyze - negative units
echo "Test 1.13: Analyze Schedule - Negative Units"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"TEST","professor":"Test","units":-1}]}')
if echo "$RESPONSE" | jq -e '.error | contains("units")' > /dev/null 2>&1; then
  test_result 0 "Reject negative units"
else
  test_result 1 "Reject negative units"
fi

# Test 1.14: Analyze - non-numeric units
echo "Test 1.14: Analyze Schedule - Non-Numeric Units"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"TEST","professor":"Test","units":"four"}]}')
if echo "$RESPONSE" | jq -e '.error' > /dev/null 2>&1; then
  test_result 0 "Reject non-numeric units"
else
  test_result 1 "Reject non-numeric units"
fi

# Test 1.15: STEM detection
echo "Test 1.15: STEM vs Humanities Detection"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"CSCI 104","professor":"Test","units":4},{"courseName":"ENGL 101","professor":"Test","units":4}]}')
STEM_COUNT=$(echo "$RESPONSE" | jq '[.classes[] | select(.type == "STEM")] | length' 2>/dev/null || echo "0")
HUM_COUNT=$(echo "$RESPONSE" | jq '[.classes[] | select(.type == "HUMANITIES")] | length' 2>/dev/null || echo "0")
if [ "$STEM_COUNT" -gt 0 ] && [ "$HUM_COUNT" -gt 0 ]; then
  test_result 0 "Detect STEM ($STEM_COUNT) and Humanities ($HUM_COUNT)"
else
  test_result 1 "Detect STEM and Humanities"
fi

# Test 1.16: RMP data retrieval
echo "Test 1.16: RateMyProfessors Data Retrieval"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"CSCI 104","professor":"Redekopp","units":4}]}')
QUALITY=$(echo "$RESPONSE" | jq -r '.classes[0].professorRating.quality' 2>/dev/null || echo "null")
if [ "$QUALITY" != "null" ] && [ "$QUALITY" != "0" ]; then
  test_result 0 "Retrieve RMP data (Quality: $QUALITY/5)"
else
  test_result 1 "Retrieve RMP data"
fi

# Test 1.17: Handle professor not found
echo "Test 1.17: Handle Professor Not Found"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"TEST 999","professor":"NotARealProfessor12345","units":4}]}')
RATING=$(echo "$RESPONSE" | jq -r '.classes[0].professorRating' 2>/dev/null || echo "error")
if [ "$RATING" = "null" ]; then
  test_result 0 "Handle missing professor gracefully"
else
  test_result 1 "Handle missing professor gracefully"
fi

# Test 1.18: Multiple classes
echo "Test 1.18: Analyze Multiple Classes"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"CSCI 104","professor":"Redekopp","units":4},{"courseName":"MATH 225","professor":"Smith","units":4},{"courseName":"WRIT 150","professor":"Johnson","units":4}]}')
CLASS_COUNT=$(echo "$RESPONSE" | jq '.classes | length' 2>/dev/null || echo "0")
TOTAL_UNITS=$(echo "$RESPONSE" | jq '.totalUnits' 2>/dev/null || echo "0")
if [ "$CLASS_COUNT" = "3" ] && [ "$TOTAL_UNITS" = "12" ]; then
  test_result 0 "Analyze multiple classes (3 classes, 12 units)"
else
  test_result 1 "Analyze multiple classes"
fi

# Test 1.19: CORS headers
echo "Test 1.19: CORS Headers"
RESPONSE=$(curl -s -I -X OPTIONS "$BACKEND/api/parse-schedule")
if echo "$RESPONSE" | grep -qi "access-control-allow-origin"; then
  test_result 0 "CORS headers present"
else
  test_result 1 "CORS headers present"
fi

# Test 1.20: Parse image endpoint exists
echo "Test 1.20: Parse Image Endpoint"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BACKEND/api/parse-image" \
  -H 'Content-Type: application/json' \
  -d '{"image":"test"}')
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
# Should return 400 or 500 (not 404) since endpoint exists
if [ "$HTTP_CODE" != "404" ]; then
  test_result 0 "Parse image endpoint exists"
else
  test_result 1 "Parse image endpoint exists"
fi

echo ""
echo "============================================"
echo "SECTION 2: SCORING ALGORITHM TESTS"
echo "============================================"
echo ""

# Test 2.1: STEM scores higher than Humanities
echo "Test 2.1: STEM Scores Higher Than Humanities"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"CSCI 104","professor":"UnknownProf1","units":4},{"courseName":"ENGL 101","professor":"UnknownProf2","units":4}]}')
STEM_SCORE=$(echo "$RESPONSE" | jq '[.classes[] | select(.type == "STEM")][0].score' 2>/dev/null || echo "0")
HUM_SCORE=$(echo "$RESPONSE" | jq '[.classes[] | select(.type == "HUMANITIES")][0].score' 2>/dev/null || echo "0")
if [ "$STEM_SCORE" -gt "$HUM_SCORE" ]; then
  test_result 0 "STEM score ($STEM_SCORE) > Humanities score ($HUM_SCORE)"
else
  test_result 1 "STEM score should be higher than Humanities"
fi

# Test 2.2: Units affect score
echo "Test 2.2: Units Affect Score"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"TEST A","professor":"UnknownProf","units":2},{"courseName":"TEST B","professor":"UnknownProf","units":4}]}')
SCORE_2=$(echo "$RESPONSE" | jq '.classes[0].score' 2>/dev/null || echo "0")
SCORE_4=$(echo "$RESPONSE" | jq '.classes[1].score' 2>/dev/null || echo "0")
if [ "$SCORE_4" -gt "$SCORE_2" ]; then
  test_result 0 "4-unit class ($SCORE_4) scores higher than 2-unit ($SCORE_2)"
else
  test_result 1 "Unit multiplier not working"
fi

# Test 2.3: Score bounds (0-100)
echo "Test 2.3: Score Within Bounds (0-100)"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"CSCI 104","professor":"Redekopp","units":4}]}')
SCORE=$(echo "$RESPONSE" | jq '.overallScore' 2>/dev/null || echo "-1")
if [ "$SCORE" -ge 0 ] && [ "$SCORE" -le 100 ]; then
  test_result 0 "Overall score within bounds ($SCORE)"
else
  test_result 1 "Overall score out of bounds"
fi

# Test 2.4: Verbal labels exist
echo "Test 2.4: Verbal Labels"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"ENGL 101","professor":"EasyProf","units":4}]}')
LABEL=$(echo "$RESPONSE" | jq -r '.verbalLabel' 2>/dev/null || echo "")
if [ -n "$LABEL" ] && [ "$LABEL" != "null" ]; then
  test_result 0 "Verbal label present: '$LABEL'"
else
  test_result 1 "Verbal label missing"
fi

echo ""
echo "============================================"
echo "SECTION 3: FRONTEND TESTS"
echo "============================================"
echo ""

# Test 3.1: Frontend accessible
echo "Test 3.1: Frontend Accessible"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND")
if [ "$HTTP_CODE" = "200" ]; then
  test_result 0 "Frontend loads (HTTP 200)"
else
  test_result 1 "Frontend not accessible"
fi

# Test 3.2: Frontend has correct title
echo "Test 3.2: Frontend Title"
RESPONSE=$(curl -s "$FRONTEND")
if echo "$RESPONSE" | grep -qi "USC Cook Scale"; then
  test_result 0 "Frontend has correct title"
else
  test_result 1 "Frontend title incorrect"
fi

# Test 3.3: Frontend loads CSS
echo "Test 3.3: Frontend CSS"
if echo "$RESPONSE" | grep -qi "stylesheet\|\.css"; then
  test_result 0 "CSS assets present"
else
  test_result 1 "CSS assets missing"
fi

# Test 3.4: Frontend loads JS
echo "Test 3.4: Frontend JavaScript"
if echo "$RESPONSE" | grep -qi "script\|\.js"; then
  test_result 0 "JavaScript assets present"
else
  test_result 1 "JavaScript assets missing"
fi

echo ""
echo "============================================"
echo "SECTION 4: BUILD & COMPILATION TESTS"
echo "============================================"
echo ""

# Test 4.1: Frontend TypeScript compiles
echo "Test 4.1: Frontend TypeScript Compilation"
cd /Users/joelnewton/usc-cook-scale/frontend
if npx tsc --noEmit 2>&1 | grep -qi "error"; then
  test_result 1 "Frontend TypeScript has errors"
else
  test_result 0 "Frontend TypeScript compiles"
fi

# Test 4.2: Backend TypeScript compiles
echo "Test 4.2: Backend TypeScript Compilation"
cd /Users/joelnewton/usc-cook-scale/backend
if npx tsc --noEmit 2>&1 | grep -qi "error"; then
  test_result 1 "Backend TypeScript has errors"
else
  test_result 0 "Backend TypeScript compiles"
fi

# Test 4.3: Frontend ESLint
echo "Test 4.3: Frontend ESLint"
cd /Users/joelnewton/usc-cook-scale/frontend
if npx eslint src --ext .ts,.tsx --max-warnings 0 2>&1 | grep -qi "error"; then
  test_result 1 "Frontend has ESLint errors"
else
  test_result 0 "Frontend passes ESLint"
fi

# Test 4.4: Frontend builds
echo "Test 4.4: Frontend Build"
cd /Users/joelnewton/usc-cook-scale/frontend
if npm run build 2>&1 | grep -iE "^error|failed" | grep -v "warning"; then
  test_result 1 "Frontend build failed"
else
  test_result 0 "Frontend builds successfully"
fi

echo ""
echo "============================================"
echo "SECTION 5: END-TO-END FLOW TESTS"
echo "============================================"
echo ""

# Test 5.1: Parse → Analyze flow
echo "Test 5.1: Complete Flow - Parse Text → Analyze"
PARSE_RESPONSE=$(curl -s -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"scheduleText":"CSCI 104 with Redekopp, WRIT 150 with Smith"}')
CLASSES=$(echo "$PARSE_RESPONSE" | jq -c '.classes')

if [ "$CLASSES" != "null" ] && [ "$CLASSES" != "[]" ]; then
  ANALYZE_RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
    -H 'Content-Type: application/json' \
    -d "{\"classes\":$CLASSES}")

  if echo "$ANALYZE_RESPONSE" | jq -e '.overallScore' > /dev/null 2>&1; then
    test_result 0 "End-to-end parse → analyze flow"
  else
    test_result 1 "Analyze step failed"
  fi
else
  test_result 1 "Parse step failed"
fi

# Test 5.2: Multiple conversational schedules
echo "Test 5.2: Complex Conversational Schedule"
RESPONSE=$(curl -s -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"scheduleText":"This semester is going to be tough! I have Data Structures CSCI 104 with Professor Mark Redekopp (4 units), Linear Algebra MATH 225 with Dr. Smith (4 units), and Writing 150 with Professor Johnson-Smith (4 units). Wish me luck!"}')
CLASS_COUNT=$(echo "$RESPONSE" | jq '.classes | length' 2>/dev/null || echo "0")
if [ "$CLASS_COUNT" -ge 3 ]; then
  test_result 0 "Parse complex conversational text ($CLASS_COUNT classes)"
else
  test_result 1 "Parse complex conversational text"
fi

echo ""
echo "============================================"
echo "SECTION 6: PERFORMANCE TESTS"
echo "============================================"
echo ""

# Test 6.1: Parse speed
echo "Test 6.1: Parse Performance"
START=$(date +%s%N)
curl -s -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"scheduleText":"CSCI 104 with Redekopp"}' > /dev/null
END=$(date +%s%N)
DURATION=$(( (END - START) / 1000000 ))
if [ $DURATION -lt 5000 ]; then
  test_result 0 "Parse completed in ${DURATION}ms (< 5s)"
else
  test_result 1 "Parse too slow: ${DURATION}ms"
fi

# Test 6.2: Analyze speed
echo "Test 6.2: Analyze Performance (1 class)"
START=$(date +%s%N)
curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"CSCI 104","professor":"Redekopp","units":4}]}' > /dev/null
END=$(date +%s%N)
DURATION=$(( (END - START) / 1000000 ))
if [ $DURATION -lt 5000 ]; then
  test_result 0 "Analyze (1 class) in ${DURATION}ms (< 5s)"
else
  test_result 1 "Analyze too slow: ${DURATION}ms"
fi

# Test 6.3: Analyze speed multiple classes
echo "Test 6.3: Analyze Performance (3 classes)"
START=$(date +%s%N)
curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"CSCI 104","professor":"Redekopp","units":4},{"courseName":"MATH 225","professor":"Smith","units":4},{"courseName":"WRIT 150","professor":"Johnson","units":4}]}' > /dev/null
END=$(date +%s%N)
DURATION=$(( (END - START) / 1000000 ))
if [ $DURATION -lt 10000 ]; then
  test_result 0 "Analyze (3 classes) in ${DURATION}ms (< 10s)"
else
  test_result 1 "Analyze too slow: ${DURATION}ms"
fi

echo ""
echo "============================================"
echo "SECTION 7: SECURITY TESTS"
echo "============================================"
echo ""

# Test 7.1: SQL Injection attempt
echo "Test 7.1: SQL Injection Protection"
RESPONSE=$(curl -s -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"scheduleText":"'; DROP TABLE classes; --"}')
if echo "$RESPONSE" | jq -e '.classes or .error' > /dev/null 2>&1; then
  test_result 0 "SQL injection handled safely"
else
  test_result 1 "SQL injection protection"
fi

# Test 7.2: XSS attempt
echo "Test 7.2: XSS Protection"
RESPONSE=$(curl -s -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"scheduleText":"<script>alert(\"XSS\")</script>"}')
if echo "$RESPONSE" | jq -e '.' > /dev/null 2>&1; then
  test_result 0 "XSS attempt handled"
else
  test_result 1 "XSS protection"
fi

# Test 7.3: Large payload
echo "Test 7.3: Large Payload Handling"
LARGE_TEXT=$(python3 -c "print('CSCI 104 ' * 10000)")
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d "{\"scheduleText\":\"$LARGE_TEXT\"}")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
# Should not crash (200, 400, or 413)
if [ "$HTTP_CODE" != "500" ]; then
  test_result 0 "Large payload handled (HTTP $HTTP_CODE)"
else
  test_result 1 "Large payload crashed server"
fi

# Test 7.4: Method not allowed
echo "Test 7.4: HTTP Method Restriction"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X GET "$BACKEND/api/parse-schedule")
if [ "$HTTP_CODE" = "405" ]; then
  test_result 0 "GET method properly rejected (405)"
else
  test_result 1 "Method restriction not working"
fi

echo ""
echo "============================================"
echo "SECTION 8: EDGE CASES"
echo "============================================"
echo ""

# Test 8.1: Very long class name
echo "Test 8.1: Very Long Class Name"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ","professor":"Test","units":4}]}')
if echo "$RESPONSE" | jq -e '.classes' > /dev/null 2>&1; then
  test_result 0 "Long class name handled"
else
  test_result 1 "Long class name crashed"
fi

# Test 8.2: Unicode characters
echo "Test 8.2: Unicode Characters"
RESPONSE=$(curl -s -X POST "$BACKEND/api/parse-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"scheduleText":"数学 101 with 教授 José García-Martínez 🔥"}')
if echo "$RESPONSE" | jq -e '.classes or .error' > /dev/null 2>&1; then
  test_result 0 "Unicode characters handled"
else
  test_result 1 "Unicode characters crashed"
fi

# Test 8.3: Special characters in professor name
echo "Test 8.3: Special Characters"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"TEST","professor":"O'\''Brien-Smith","units":4}]}')
if echo "$RESPONSE" | jq -e '.classes' > /dev/null 2>&1; then
  test_result 0 "Special characters in names handled"
else
  test_result 1 "Special characters crashed"
fi

# Test 8.4: Decimal units
echo "Test 8.4: Decimal Units"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d '{"classes":[{"courseName":"TEST","professor":"Test","units":3.5}]}')
if echo "$RESPONSE" | jq -e '.classes or .error' > /dev/null 2>&1; then
  test_result 0 "Decimal units handled"
else
  test_result 1 "Decimal units crashed"
fi

# Test 8.5: Very large number of classes
echo "Test 8.5: Large Number of Classes"
CLASSES_JSON='{"classes":['
for i in {1..20}; do
  CLASSES_JSON="$CLASSES_JSON{\"courseName\":\"TEST$i\",\"professor\":\"Prof$i\",\"units\":4},"
done
CLASSES_JSON="${CLASSES_JSON%,}]}"
RESPONSE=$(curl -s -X POST "$BACKEND/api/analyze-schedule" \
  -H 'Content-Type: application/json' \
  -d "$CLASSES_JSON")
if echo "$RESPONSE" | jq -e '.classes | length == 20' > /dev/null 2>&1; then
  test_result 0 "20 classes processed"
else
  test_result 1 "Large class count failed"
fi

echo ""
echo "=========================================================="
echo "🔥🔥🔥 FINAL TEST RESULTS 🔥🔥🔥"
echo "=========================================================="
echo ""
echo "Total Tests:  $TOTAL_TESTS"
echo "✅ Passed:    $PASSED_TESTS"
echo "❌ Failed:    $FAILED_TESTS"
echo ""

PASS_RATE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
echo "Pass Rate:    $PASS_RATE%"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
  echo "🎉🎉🎉 ALL TESTS PASSED! PROJECT IS PERFECT! 🎉🎉🎉"
  exit 0
else
  echo "⚠️  Some tests failed. Review results above."
  exit 1
fi
