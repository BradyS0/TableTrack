const LOGIC = {};

LOGIC.validate_int = (id,id_name='') => {
    const num = parseInt(id);

    if (isNaN(num))
        throw new Error(`invalid ${id_name} id.`);

    return num;
}


LOGIC.validate_guest_amount = (guest_amount) => {
    const num = parseInt(guest_amount);
    if (isNaN(num) || num<1)
        throw new Error(`Guest Amount must be a positive integer`);

    return num;
}

LOGIC.validate_date = (date) => {
    const dateObj = new Date(date);

    if( isNaN(dateObj) )
        throw new Error("Invalid date syntax");

    if( dateObj <= new Date() )
        throw new Error("Same day or past reservations not allowed");
    
    return dateObj;
}

LOGIC.create_date_stamp = (yyyy,mm,dd,hh,min) => {
    try{
        yyyy = LOGIC.validate_int(yyyy);
        mm = LOGIC.validate_int(mm);
        dd = LOGIC.validate_int(dd);
        hh = LOGIC.validate_int(hh);
        min = LOGIC.validate_int(min);

        const newDate = new Date(yyyy,mm,dd,hh,min,0,0); // 0s 0ms

        return newDate;
    }catch{
        throw new Error("Invalid date syntax.");
    }
}

const INTERVAL = 2 ; //hourly interval for each reservation
const MIN_INC = 15/60 ; //minutes to increment possible reservable tickets by

// time is a float value
// reserved_times is a list of floats [2.3,...,20.5]
LOGIC.validate_reservation_time = (time,reserved_times) => {
    let is_blocked = false;

    for (const reserved of reserved_times){
        // if diff is less than INTERVAL then ticket overlaps an existing reservation
        if(Math.abs(ticket-reserved) < INTERVAL){
            is_blocked = true;
            break;
        }
    }

    return is_blocked;
}


// create hour.minute floats that are interval hrs apart from existing reserved times and interval before the closing
// reserved_times is a list of floats [2.3,...,20.5]
LOGIC.generate_reservation_tickets = (open,close,reserved_times) =>{
    const tickets = []; //list of 24hr formatted floats : [8.5, 12.65, 20.25] 

    //times slots begin 15minutes after open time
    //new time should be before 2hrs+15min of buffer of closing time
    for (let ticket = open+MIN_INC ; (ticket+INTERVAL+MIN_INC) <= close ; ticket += ticket+MIN_INC){
        const is_blocked = LOGIC.validate_reservation_time(ticket,reserved_times)

        //if the current ticket is not overlapping any existing reservation 
        if(!is_blocked)
            tickets[tickets.length] = (Number(ticket.toFixed(2))); 
    }

    return tickets;
}

console.log(LOGIC)


export default{...LOGIC}