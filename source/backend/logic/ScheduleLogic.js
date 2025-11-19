const DAYS = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]

// Return true if the restaurant is open
function check_open(time, open, close)
{
    if      (time <  open)  return false;
    else if (time >= close) return false;
    else                    return true;
}

//returns sunday-saturday 0-6
function get_day_index(day){
    if (typeof day != "string") return -1
    return DAYS.indexOf(day.toLowerCase())
}


export default
{   
    DAYS,
    get_day_index,
    check_open
};


