#!/usr/bin/env node
// Simple smoke check: polls the API until it returns a successful response or times out
const host = process.env.API_HOST || 'localhost';
const port = process.env.API_PORT || process.env.PORT || '3000';
const path = process.env.SMOKE_PATH || '/health';
const url = `http://${host}:${port}${path}`;

const timeoutMs = parseInt(process.env.SMOKE_TIMEOUT || '60000', 10);
const intervalMs = parseInt(process.env.SMOKE_INTERVAL || '2000', 10);

const start = Date.now();

async function check() {
    try {
        const res = await fetch(url);
        if (res.ok) {
            console.log(`Smoke check OK: ${res.status} ${res.statusText} -> ${url}`);
            const body = await res.text();
            console.log('Response preview:', body.slice(0, 400));
            process.exit(0);
        }
        console.log(`Received ${res.status} ${res.statusText}, retrying...`);
    } catch (err) {
        console.log(`Fetch error: ${err.message}`);
    }

    if (Date.now() - start > timeoutMs) {
        console.error(`Smoke check failed: timeout after ${timeoutMs}ms waiting for ${url}`);
        process.exit(1);
    }

    await new Promise((r) => setTimeout(r, intervalMs));
    return check();
}

check();
