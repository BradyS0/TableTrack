
const API_URL = __API_URL__;
const API = `${API_URL}/v1/floorplan`;

async function set_walls(restID, walls)
{
    const new_walls = { floorplan: walls };

    let result = {code:9001, message:"api backend cannot be reached"};
    try {
        
        // Send request to the backend
        const req = await fetch(`${API}/walls/${restID}`, {method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_walls)
        });

        // Unpack request results
        result.code = req.status;
        const data  = await req.json();
        if(result.code < 300) 
            result.message = 'Request completed';
        else
            result.message = data.error;

    } catch (e) { console.log("ERROR:::",e.message); }

    return result;
}

async function get_walls()
{
    let result = {code:9001, message:"api backend cannot be reached"};
    try {
        
        // Send request to the backend
        const req = await fetch(`${API}/walls/${restID}`, {method: 'GET'});

        // Unpack request results
        result.code = req.status;
        const data  = await req.json();
        if(result.code < 300) {
            result.message = 'Request completed';
            result.data    = data;
            //result.floorplan = data.floorplan;
        } else 
            result.message = data.error;

    } catch (e) { console.log("ERROR:::",e.message); }

    return result;
}

async function set_layout(restID, tables, misc)
{
    const new_layout = { tables:tables, misc:misc };

    let result = {code:9001, message:"api backend cannot be reached"};
    try {

        // Send request to the backend
        const req = await fetch(`${API}/layout/${restID}`, {method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_layout)
        });

        // Unpack request results
        result.code = req.status;
        const data  = await req.json();
        if(result.code < 300) 
            result.message = 'Request completed';
        else
            result.message = data.error;

    } catch (e) { console.log("ERROR:::",e.message); }

    return result;
}

async function get_layout()
{
    let result = {code:9001, message:"api backend cannot be reached"};
    try {
        
        // Send request to the backend
        const req = await fetch(`${API}/layout/${restID}`, {method: 'GET'});

        // Unpack request results
        result.code = req.status;
        const data  = await req.json();
        if(result.code < 300) {
            result.message = 'Request completed';
            result.data    = data;
            //result.tables  = data.tables;
            //result.misc    = data.misc;
        } else 
            result.message = data.error;

    } catch (e) { console.log("ERROR:::",e.message); }

    return result;
}