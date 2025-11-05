
// Return time in 24:00 format
function get_time()
{
    var date = new Date();

    var time = 0.0;
    time += date.getHours();
    time += date.getMinutes()/60;

    return time;
}

// Return day in 0-6 Sun - Sat
function get_day()
{
    var date = new Date();
    return date.getDay();
}

// Export functions
export default {
    get_time,
    get_day
};
