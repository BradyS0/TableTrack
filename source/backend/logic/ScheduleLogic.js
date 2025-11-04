
// Return true if the restaurant is open
function check_open(time, open, close)
{
    if      (time <  open)  return false;
    else if (time >= close) return false;
    else                    return true;
}


// Convert json schedule to array
function parse_schedule(input)
{   
    var days = [];
    days.push(input["sunday"]);
    days.push(input["monday"]);
    days.push(input["tuesday"]);
    days.push(input["wednesday"]);
    days.push(input["thursday"]);
    days.push(input["friday"]);
    days.push(input["saturday"]);

    // Loop through days and add to schedule
    var schedule = [];
    for (var i = 0; i < days.length; i++)
    {
        // CASE 1: Undefined, no schedule given
        if (days[i] === undefined) schedule.push([-1.0, -1.0]);
        
        // CASE 2: Defined, Set to given schedule
        else schedule.push([(days[i])["open"], (days[i])["close"]]);
    }
    return schedule;
}



export default
{
    check_open,
    validate_schedule,
    parse_schedule
};


