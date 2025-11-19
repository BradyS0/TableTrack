const DAYS = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]

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
   let schedule = [];
   for (let day of DAYS){
        let day_schedule = input[day]
        // CASE 1: Undefined, no schedule given
        if (!day_schedule) schedule.push([-1.0, -1.0]);
        
        // CASE 2: Defined, Set to given schedule
        else schedule.push([day_schedule["open"], day_schedule["close"]]);
   }      
    
    return schedule;
}



export default
{   
    DAYS,
    check_open,
    parse_schedule
};


