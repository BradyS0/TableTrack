#!/usr/bin/env node
// this file was created using help from GitHub Copilot
import { URL } from 'url';
import http from 'http';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config()

const API_PORT = process.env.API_PORT || 3000;
const BASE_URL = 'http://localhost:'+API_PORT;

const sched_wed =  {wednesday: { open: 9, close: 18.3 }}
const sched_sun =  {sunday: { open: 0, close: 0 }}
const sched_mon = {monday: { open: 14, close: 20.75 }}

// Define all endpoints and their configurations
const ENDPOINTS = [
    // ----------------- User -----------------------
    {
        name: 'Create User',
        method: 'POST',
        path: '/v1/user',
        body: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            password: 'P@ssw0rd!',
        },
    },
    {
        name: 'Login User',
        method: 'POST',
        path: '/v1/user/login',
        body: {
            email: 'johndoe@example.com',
            password: 'P@ssw0rd!',
        },
    },
    {
        name: 'Change Password',
        method: 'PATCH',
        path: '/v1/user/change/password',
        body: {
            userID: 1, // Replace with a valid userID
            old_password: 'P@ssw0rd!',
            new_password: 'N3wP@ssw0rd!',
        },
    },
    {
        name: 'Change First Name',
        method: 'PATCH',
        path: '/v1/user/change/firstname',
        body: {
            userID: 1, // Replace with a valid userID
            first_name: 'Jane',
        },
    },
    {
        name: 'Change Last Name',
        method: 'PATCH',
        path: '/v1/user/change/lastname',
        body: {
            userID: 1, // Replace with a valid userID
            last_name: 'Smith',
        },
    },
    {
        name: 'Change Email',
        method: 'PATCH',
        path: '/v1/user/change/email',
        body: {
            userID: 1, // Replace with a valid userID
            email: 'janesmith@example.com',
        },
    },
    // ----------------- Restaurant -----------------------
    {
        name: 'Create Restaurant',
        method: 'POST',
        path: '/v1/restaurant',
        body: {
            userID: 1,
            name: 'Burger Queen',
            address: '100 Burger street',
            phone:   '(204) 234-5678',
            tags: ['new-restaurant','tester']
        },
    },
    {
        name: 'Get Restaurants',
        method: 'GET',
        path: '/v1/restaurant',
    },
    {
        name: 'Get Restaurant By ID',
        method: 'GET',
        path: '/v1/restaurant/1',
    },
    {
        name: 'Get Restaurant By User ID',
        method: 'GET',
        path: '/v1/restaurant/user/1',
    },
    {
        name: 'Change Restaurant Info',
        method: 'PATCH',
        path: '/v1/restaurant/change',
        body: {
            restID: 1,
            name: 'Burger Queen Updated',
            address: '200 New Burger street',
            phone:   '(204) 876-5432',
            desc: 'An updated description for Burger Queen.',
        },
    },
    {
        name: 'Change Restaurant Description',
        method: 'PATCH',
        path: '/v1/restaurant/change/description',
        body: {
            restID: 1,
            description: 'A new description for Burger Queen.',
        },
    },
    {
        name: 'Change Restaurant Tags',
        method: 'PATCH',
        path: '/v1/restaurant/change/tags',
        body: {
            restID: 1,
            tags: ['updated-tagA', 'updated-tagB'],
        },
    },
    {
        name: 'Change Restaurant Name',
        method: 'PATCH',
        path: '/v1/restaurant/change/name',
        body: {
            restID: 1,
            name: 'Burger Queen Renamed',
        },
    },
    {
        name: 'Change Restaurant Phone',
        method: 'PATCH',
        path: '/v1/restaurant/change/phone',
        body: {
            restID: 1,
            phone: '(204) 999-8888',
        },
    },
    {
        name: 'Change Restaurant Address',
        method: 'PATCH',
        path: '/v1/restaurant/change/address',
        body: {
            restID: 1,
            address: '300 Another Burger street',
        },
    },
   // ----------------- Schedule -----------------------
    {
        name: 'Change Restaurant Schedule',
        method: 'PUT',
        path: '/v1/restaurant/schedule',
        body: {
            restID: 1,
            schedule: sched_wed,
        },
    },
    {
        name: 'Get Restaurant Schedule',
        method: 'GET',
        path: '/v1/restaurant/schedule',
        body: {
            restID: 1,
            day: 'wednesday',
        },
    },
    // ----------------- Menu -----------------------
    {
        name: 'Create Menu Item',
        method: 'POST',
        path: '/v1/menu/1',
        body: {
            name: "Food",
            price: "1.00",
            description: "description",
            category: "category"
        },
    },
    {
        name: 'Get Menu Items',
        method: 'GET',
        path: '/v1/menu/1',
    },
    {
        name: 'Get Menu Item',
        method: 'GET',
        path: '/v1/menu/1/1',
    },
    {
        name: 'Change Menu Item Name',
        method: 'PATCH',
        path: '/v1/menu/1/change/name',
        body: {
            itemID: 1,
            name: "Newname",
        },
    },
    {
        name: 'Change Menu Item Price',
        method: 'PATCH',
        path: '/v1/menu/1/change/price',
        body: {
            itemID: 1,
            price: "2.00",
        },
    },
    {
        name: 'Change Menu Item Description',
        method: 'PATCH',
        path: '/v1/menu/1/change/description',
        body: {
            itemID: 1,
            description: "New description",
        },
    },
    {
        name: 'Change Menu Item Category',
        method: 'PATCH',
        path: '/v1/menu/1/change/category',
        body: {
            itemID: 1,
            category: "NewCategory",
        },
    },
    {
        name: 'Delete Menu Item',
        method: 'DELETE',
        path: '/v1/menu/1/1',
    },
    {
        name: 'Delete User',
        method: 'DELETE',
        path: '/v1/user/1', // Replace with a valid userID for testing
    },
    // Add more endpoints here as needed
];

// Function to make HTTP/HTTPS requests
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
            ...(bodyObj ? { 'Content-Length': Buffer.byteLength(data, 'utf8') } : {}),
        },
        timeout,
    };

    return new Promise((resolve) => {
        const req = lib.request(opts, (res) => {
            let raw = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => (raw += chunk));
            res.on('end', () => {
                let parsed = null;
                try {
                    parsed = raw ? JSON.parse(raw) : null;
                } catch (_) {}
                resolve({ status: res.statusCode, headers: res.headers, raw, json: parsed });
            });
        });
        req.on('error', (err) => resolve({ status: 0, headers: {}, raw: `Request error: ${err.message}`, json: null }));
        if (bodyObj) req.write(data);
        req.end();
    });
}

// Main function to test all endpoints
(async () => {
    console.log(`[INFO] Base URL: ${BASE_URL}`);

    for (const endpoint of ENDPOINTS) {
        const url = BASE_URL + endpoint.path;
        console.log(`\n[INFO] Testing ${endpoint.name} at: ${url}`);
        const res = await requestJson(endpoint.method, url, endpoint.body);
        if (res.json) {
            console.log(`[${endpoint.name}] status:`, res.status, '\n', JSON.stringify(res.json, null, 2));
        } else {
            console.log(`[${endpoint.name}] status:`, res.status, '\n', res.raw);
        }

        if (res.status < 200 || res.status >= 300) {
            console.error(`[ERROR] ${endpoint.name} failed with status ${res.status}`);
        }
    }

    console.log('\n[INFO] All endpoints tested.');
    process.exit(0);
})().catch((e) => {
    console.error('[FATAL]', e);
    process.exit(1);
});