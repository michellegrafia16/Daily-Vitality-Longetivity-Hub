const http = require('http');
const fs = require('fs');
const path = require('path');

const SERVER_URL = 'http://localhost:3005';
let passed = 0;
let failed = 0;

function makeRequest(path, expectedStatus) {
    return new Promise((resolve) => {
        const req = http.get(SERVER_URL + path, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === expectedStatus) {
                    passed++;
                    console.log(`✓ ${path} - Status: ${res.statusCode}`);
                } else {
                    failed++;
                    console.log(`✗ ${path} - Expected: ${expectedStatus}, Got: ${res.statusCode}`);
                }
                resolve();
            });
        });
        req.on('error', (err) => {
            failed++;
            console.log(`✗ ${path} - Error: ${err.message}`);
            resolve();
        });
    });
}

function makeRequestWithTimeout(path, expectedStatus, timeout = 5000) {
    return new Promise((resolve) => {
        const req = http.get(SERVER_URL + path, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === expectedStatus) {
                    passed++;
                    console.log(`✓ ${path} - Status: ${res.statusCode}`);
                } else {
                    failed++;
                    console.log(`✗ ${path} - Expected: ${expectedStatus}, Got: ${res.statusCode}`);
                }
                resolve();
            });
        });
        
        req.setTimeout(timeout, () => {
            req.destroy();
            failed++;
            console.log(`✗ ${path} - Timeout after ${timeout}ms`);
            resolve();
        });
        
        req.on('error', (err) => {
            failed++;
            console.log(`✗ ${path} - Error: ${err.message}`);
            resolve();
        });
    });
}

async function runTests() {
    console.log('Starting server tests...\n');
    
    // Test 1: Basic pages
    console.log('--- Testing basic pages ---');
    await makeRequest('/', 200);
    await makeRequest('/index.html', 200);
    await makeRequest('/fitness.html', 200);
    await makeRequest('/nutrition.html', 200);
    await makeRequest('/styles.css', 200);
    await makeRequest('/script.js', 200);
    
    // Test 2: Security - Path traversal attempts
    console.log('\n--- Testing security (path traversal) ---');
    await makeRequest('/../server.js', 403);
    await makeRequest('/../../package.json', 403);
    await makeRequest('/%2e%2e%2fserver.js', 403);
    await makeRequest('/..%2f..%2fserver.js', 403);
    
    // Test 3: Non-existent files
    console.log('\n--- Testing 404 handling ---');
    await makeRequest('/nonexistent.html', 404);
    await makeRequest('/fake/path.html', 404);
    
    // Test 4: Method not allowed
    console.log('\n--- Testing method restrictions ---');
    await new Promise((resolve) => {
        const req = http.request(SERVER_URL + '/', { method: 'POST' }, (res) => {
            if (res.statusCode === 405) {
                passed++;
                console.log('✓ POST / - Status: 405 (Method Not Allowed)');
            } else {
                failed++;
                console.log(`✗ POST / - Expected: 405, Got: ${res.statusCode}`);
            }
            resolve();
        });
        req.on('error', () => resolve());
        req.end();
    });
    
    // Test 5: Stress test - concurrent requests
    console.log('\n--- Stress test (50 concurrent requests) ---');
    const concurrentRequests = [];
    for (let i = 0; i < 50; i++) {
        concurrentRequests.push(makeRequestWithTimeout('/', 200, 3000));
    }
    await Promise.all(concurrentRequests);
    
    // Test 6: Invalid file extensions
    console.log('\n--- Testing invalid file extensions ---');
    await makeRequest('/server.php', 403);
    await makeRequest('/file.exe', 403);
    
    console.log('\n========================================');
    console.log(`Results: ${passed} passed, ${failed} failed`);
    console.log('========================================');
    
    process.exit(failed > 0 ? 1 : 0);
}

// Wait a bit for server to start
setTimeout(runTests, 2000);
