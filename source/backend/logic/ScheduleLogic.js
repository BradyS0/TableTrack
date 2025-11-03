
// Return true if the restaurant is open
function check_open(time, open, close)
{
    if      (time <  open)  return false;
    else if (time >= close) return false;
    else                    return true;
}



// Validate the schedule for a day
function validate_schedule(input)
{
    // Create regular expression to check formatting of the schedule
    const day_regex  = "(sunday|monday|tuesday|wednesday|thursday|friday|saturday)";
    const time_regex = "([0-9]{1}\\.[0-9]{1,2}|1[0-9]{1}\\.[0-9]{1,2}|2[0-3]{1}\\.[0-9]{1,2}|24\\.(0|00))";
    const line_regex = "\""+day_regex+"\":\\{\"open\":"+time_regex+", \"close\":"+time_regex+"\\}";
    const list_regex = "^\\{\"schedule\":\\{("+line_regex+"(, ){0,1}){0,7}\\}\\}$";

    // Compare input to regex
    const reg = new RegExp(list_regex);
    return reg.test(input);
}



// Convert json schedule to array
function parse_schedule(input)
{
    var json = JSON.parse(input)

    // Get each day from schedule
    var days = [];
    days.push(json.sunday);
    days.push(json.monday);
    days.push(json.tuesday);
    days.push(json.wednesday);
    days.push(json.thursday);
    days.push(json.friday);
    days.push(json.saturday);

    // Loop through days and add to schedule
    var schedule = [];
    for (var i = 0; i < days.length; i++)
    {
        // CASE 1: Undefined, no schedule given
        if (days[i] === undefined) schedule.push([0.0, 0.0]);
        
        // CASE 2: Defined, Set to given schedule
        else schedule.push(days[i].open, days[i].close);
    }
    return schedule;
}



export default
{
    check_open,
    validate_schedule,
    parse_schedule
};


