
function validate_position(pos)
{
    if (pos == null || pos == undefined)
        throw new Error("Position cannot be null")

    // Get values from JSON
    let x = parseFloat(pos.x);
    let y = parseFloat(pos.y);
    
    // Check values are valid
    if (Number.isNaN(x) || Number.isNaN(y))
        throw new Error("Invalid position type");

    return true;
}

function validate_walls(walls)
{
    // Check if walls is empty
    if (walls == null || walls == undefined || walls.length < 3)
        throw new Error("Atleast 3 walls must be given");

    // Validate format of each wall
    for (let i = 0; i < walls.length; i++)
        validate_position(walls[i]);

    return true;
}

function validate_type(type)
{
    if (type == null || type == undefined || String(type).length == 0)
        throw new Error("A type must be given")

    return true;
}

function validate_rotation(rot)
{
    const num_rot = parseFloat(rot);

    // Check rotation is number
    if (Number.isNaN(num_rot))
        throw new Error("Invalid rotation type");

    // Check rotation in bounds
    if (num_rot < -360 || num_rot > 360)
        throw new Error("Rotation exceeds 360 degrees");

    return true;
}

function validate_data(data)
{
    // Check data not null
    if (data == null || data == undefined)
        throw new Error("Data cannot be null");

    return true;
}

function validate_table_data(data)
{
    validate_data(data);

    // Get values from JSON
    let cap = parseInt(data.capacity);
    let res = String(data.reservable);
    if      (res == "true")  res = true;
    else if (res == "false") res = false;

    // Check capacity number
    if (Number.isNaN(cap))
        throw new Error("Invalid capacity type");
    if (cap < 1)
        throw new Error("Capacity must be atleast 1");
    
    // Check boolean
    if (res !== true && res !== false)
        throw new Error("Invalid reservable type");

    return true;
}

export default
{
    validate_position,
    validate_walls,
    validate_type,
    validate_rotation,
    validate_data,
    validate_table_data
}