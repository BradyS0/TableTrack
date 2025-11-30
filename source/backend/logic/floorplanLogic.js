
function validate_position(pos)
{
    // Get values from JSON
    let x = parseFloat(pos.x);
    let y = parseFloat(pos.y);

    // Check values are valid
    if (x == NaN || y == NaN)
        throw new Error("Invalid position type");
}

function validate_walls(walls)
{
    // Check if walls is empty
    if (walls == null || walls == undefined || walls.length < 3)
        throw new Error("Atleast 3 walls must be given");

    // Validate format of each wall
    for (let i = 0; i < walls.length; i++)
        validate_position(walls[i]);
}

function validate_type(type)
{
    if (String(type).length == 0)
        throw new Error("A type must be given")
}

function validate_rotation(rot)
{
    // Check rotation is number
    if (parseFloat(rot) == NaN)
        throw new Error("Invalid rotation type");

    // Check rotation in bounds
    if (rot < -360 || rot > 360)
        throw new Error("Rotation exceeds 360 degrees");
}

function validate_data(data)
{
    // Check data not null
    if (data == null || data == undefined)
        throw new Error("Data cannot be null");
}

function validate_table_data(data)
{
    validate_data(data);

    // Get values from JSON
    let cap = parseInt(data.capacity);
    let res = String(data.reservable);

    // Check capacity number
    if (cap == NaN)
        throw new Error("Invalid capacity type");
    if (cap < 1)
        throw new Error("Capacity must be atleast 1");

    // Check boolean
    if (res != true && res != false)
        throw new Error("Invalid reservable type");
}
