
// eslint-disable-next-line
const API_URL = __API_URL__;
const API = `${API_URL}/v1/reservation`;

async function get_tickets(restID, tableID, date)
{
    const new_body = { restID:restID, tableID:tableID, date_stamp:date };

    let result = {code:9001, message:"api backend cannot be reached"};
    try {

        // Send request to the backend
        const req = await fetch(`${API}/ticket`, {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_body)
        });

        // Unpack request results
        result.code = req.status;
        const data  = await req.json();
        if(result.code < 300) {
            result.message = 'Request completed';
            result.data    = data;
            //result.tickets = data.tickets;
        } else
            result.message = data.error;

    } catch (e) { console.log("ERROR:::",e.message); }

    return result;
}

async function create_res(restID, userID, tableID, date, people)
{
    const new_body = { restID:restID, userID:userID, tableID:tableID, date_stamp:date, capacity:people };

    let result = {code:9001, message:"api backend cannot be reached"};
    try {

        // Send request to the backend
        const req = await fetch(`${API}/create`, {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_body)
        });

        // Unpack request results
        result.code = req.status;
        const data  = await req.json();
        if(result.code < 300) {
            result.message = 'Request completed';
            result.data    = data;
        } else
            result.message = data.error;

    } catch (e) { console.log("ERROR:::",e.message); }

    return result;
}

async function get_by_user(userID)
{
    let result = {code:9001, message:"api backend cannot be reached"};
    try {

        // Send request to the backend
        const req = await fetch(`${API}/user/${userID}`, {method: 'GET'});

        // Unpack request results
        result.code = req.status;
        const data  = await req.json();
        if(result.code < 300) {
            result.message = 'Request completed';
            result.data    = data;
            //result.reservations = data.reservations;
        } else
            result.message = data.error;

    } catch (e) { console.log("ERROR:::",e.message); }

    return result;
}

async function get_by_rest(restID)
{
    let result = {code:9001, message:"api backend cannot be reached"};
    try {

        // Send request to the backend
        const req = await fetch(`${API}/restaurant/${restID}`, {method: 'GET'});

        // Unpack request results
        result.code = req.status;
        const data  = await req.json();
        if(result.code < 300) {
            result.message = 'Request completed';
            result.data    = data;
            //result.reservations = data.reservations;
        } else
            result.message = data.error;

    } catch (e) { console.log("ERROR:::",e.message); }

    return result;
}

async function delete_res(reserveID, restID, userID)
{
    const new_body = { restID:restID, userID:userID };

    let result = {code:9001, message:"api backend cannot be reached"};
    try {

        // Send request to the backend
        const req = await fetch(`${API}/delete/${reserveID}`, {method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_body)
        });

        // Unpack request results
        result.code = req.status;
        const data  = await req.json();
        if(result.code < 300) {
            result.message = 'Request completed';
            result.data    = data;
        } else
            result.message = data.error;

    } catch (e) { console.log("ERROR:::",e.message); }

    return result;
}
