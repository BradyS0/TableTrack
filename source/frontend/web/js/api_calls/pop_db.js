//this file was created with help github copilot
import { restaurants, menus, schedules, wallplan, layout} from './mock/mockRestdata.js'

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
    return { status: res.status, data };
}

// same as above but for PUT
async function putJSON(path, body) {
    const url = `${API_URL}${path}`;
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    let data = null;
    return { status: res.status, data };
}

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
            const rest = restaurants[i - 1];
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
                    const res3 = await postJSON(`/v1/menu/${i}`, menuItem);
                    console.log('addMenuItem ->', res3);
                }
                const scheduleData = {};
                scheduleData.schedule = schedules[i % schedules.length];
                scheduleData.restID = i;
                const schedRes = await putJSON(`/v1/restaurant/schedule`, scheduleData);
                console.log('setSchedule ->', schedRes);

                // /floorplan/walls/<restID></restID>
                const wallRes = await putJSON(`/v1/floorplan/walls/${i}`, wallplan);
                console.log('setWallLayout ->', wallRes);

                // /floorplan/layout/</restID>
                const layoutRes = await putJSON(`/v1/floorplan/layout/${i}`, layout);
                console.log('setLayout ->', layoutRes);

            }
        } else {
            console.log('skipping restaurant creation; user create failed');
        }
    }
}

populateDB().catch(e => console.error('populateDB error:', e));

