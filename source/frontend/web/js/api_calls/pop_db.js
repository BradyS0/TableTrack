import { restaurants, menus } from './mock/mockRestdata.js'

// Configurable API_URL support for Node and browser environments.
// Priority: process.env.API_URL -> window.__API_URL__ -> fallback
const API_URL = (typeof process !== 'undefined' && process.env && process.env.API_URL)
    || (typeof window !== 'undefined' && window.__API_URL__)
    || 'http://localhost:3000';

async function postJSON(path, body) {
    const url = `${API_URL}${path}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    let data = null;
    try { data = await res.json(); } catch (e) { /* ignore parse errors */ }
    return { status: res.status, data };
}

// async function getJSON(path) {
//     const url = `${API_URL}${path}`;
//     const res = await fetch(url, { method: 'GET' });
//     let data = null;
//     try { data = await res.json(); } catch (e) { /* ignore parse errors */ }
//     return { status: res.status, data };
// }

const userTemplate = {
    first_name: 'Test',
    last_name: 'User',
    password: 'Password123!'
};

async function populateDB() {
    for (let i = 1; i <= restaurants.length; i++) {
        const userID = i;
        const user = { ...userTemplate, email: `testuser${i}@example.com` };
        console.log('creating user:', user.email);

        const res1 = await postJSON('/v1/user', user);
        console.log('createUser ->', res1);

        if (res1.status && res1.status < 300) {
            const rest = restaurants[userID - 1];
            console.log('creating restaurant:', rest.name);
            let id = i;
            if (i < 10)
                id = "0" + i;
            console.log(`(2${id}) ${id}1-${id}34`)
            const restBody = {
                userID,
                name: rest.name,
                tags: rest.tags,
                address: rest.address,
                phone: `(2${id}) ${id}1-${id}34`
            };

            const res2 = await postJSON('/v1/restaurant', restBody);
            console.log('createRestaurant ->', res2);

            if (res2.status && res2.status < 300) {
                const m = menus[i % menus.length];
                for (let menuItem of m) {
                    // ensure price is string like original
                    menuItem.price = `${menuItem.price}`;
                    const res3 = await postJSON(`/v1/menu/${userID}`, menuItem);
                    console.log('addMenuItem ->', res3);
                }
            }
        } else {
            console.log('skipping restaurant creation; user create failed');
        }
    }
}

populateDB().catch(e => console.error('populateDB error:', e));

