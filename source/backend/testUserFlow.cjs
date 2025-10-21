#!/usr/bin/env node
// testUserFlow.cjs
// Simple script to test create user and login against your API
// Run in PowerShell from backend folder:
//   node .\testUserFlow.cjs

const { URL } = require('url');
const http = require('http');
const https = require('https');

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const CREATE_PATH = '/v1/user';
const LOGIN_PATH = '/v1/user/login';

const DEFAULT_USER = {
    first_name: 'April',
    last_name: 'Wine',
    email: 'testuser@example.com',
    password: 'P@ssW0rd!'
};

function requestJson(method, urlString, bodyObj, timeout = 10000) {
    const data = bodyObj ? JSON.stringify(bodyObj) : '';
    const url = new URL(urlString);
    const lib = url.protocol === 'https:' ? https : http;

    const opts = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(bodyObj ? { 'Content-Length': Buffer.byteLength(data, 'utf8') } : {})
        },
        timeout
    };

    return new Promise((resolve) => {
        const req = lib.request(opts, (res) => {
            let raw = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => (raw += chunk));
            res.on('end', () => {
                let parsed = null;
                try { parsed = raw ? JSON.parse(raw) : null; } catch (_) { }
                resolve({ status: res.statusCode, headers: res.headers, raw, json: parsed });
            });
        });
        req.on('error', (err) => resolve({ status: 0, headers: {}, raw: `Request error: ${err.message}`, json: null }));
        if (bodyObj) req.write(data);
        req.end();
    });
}

(async () => {
    const createUrl = BASE_URL + CREATE_PATH;
    const loginUrl = BASE_URL + LOGIN_PATH;

    console.log(`[INFO] Base URL: ${BASE_URL}`);
    console.log(`[INFO] Creating user at: ${createUrl}`);
    const createRes = await requestJson('POST', createUrl, DEFAULT_USER);
    if (createRes.json) {
        console.log('[CREATE] status:', createRes.status, '\n', JSON.stringify(createRes.json, null, 2));
    } else {
        console.log('[CREATE] status:', createRes.status, '\n', createRes.raw);
    }

    // Accept 201 Created; if 400 with duplicate/invalid we still attempt login
    if (createRes.status && createRes.status !== 201 && createRes.status !== 400) {
        console.error(`[ERROR] Unexpected create status: ${createRes.status}`);
    }

    console.log(`\n[INFO] Logging in at: ${loginUrl}`);
    const loginRes = await requestJson('POST', loginUrl, { email: DEFAULT_USER.email, password: DEFAULT_USER.password });
    if (loginRes.json) {
        console.log('[LOGIN] status:', loginRes.status, '\n', JSON.stringify(loginRes.json, null, 2));
    } else {
        console.log('[LOGIN] status:', loginRes.status, '\n', loginRes.raw);
    }

    if (loginRes.status === 200) {
        const token = loginRes.json && (loginRes.json.token || loginRes.json.accessToken || loginRes.json.jwt || loginRes.json.access_token);
        if (token) console.log('\n[TOKEN]', token);
        console.log('\n[SUCCESS] User create/login flow completed.');
        process.exit(0);
    } else {
        console.error('\n[FAIL] Login failed.');
        process.exit(1);
    }
})().catch((e) => {
    console.error('[FATAL]', e);
    process.exit(1);
});
