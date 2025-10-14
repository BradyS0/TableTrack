
// Model Imports
import User       from "../models/User";
import Restaurant from "../models/Restaurant";



// Test owner userID
async function validate_userID(id) {

    // Check if the owner exists
    const user = await User.findByPk(parseInt(id));
    if (user === null) {
        return false; // No user found
    }

    // Check if already has restaurant
    else {
        const rest = await Restaurant.findOne({ where: { userID: parseInt(id) } });
        if (rest === null) {
            return true; // No current restaurant
        }
    }
    return false; // Already has restaurant
}



// Test address
function validate_address(address) {

    // Ensure formatting is correct
    const regex = /^[0-9]{1,} [a-zA-Z0-9 ,.'-]{1,}$/;
    return regex.test(address);
}



// Test phone number
function validate_phone(phone) {

    // Ensure formatting is correct
    const regex = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;
    return regex.test(phone);
}



// Test description
function validate_description(desc) {

    MAX_DESC_LEN = 400;
    MIN_DESC_LEN = 10;

    // Ensure valid description length
    if (desc.length >= MIN_DESC_LEN && desc.length <= MAX_DESC_LEN) {
        return true;
    } else {
        return false;
    }
}



// Test open hours
function validate_hours(hours) {

    // Time regex:          x:--    1x:--     2(1-3):--    --:(0-59)         24:00
    const time_regex = "((([0-9]{1}|1[0-9]{1}|2[0-3]{1}):([0-5]{1}[0-9]{1}))|24:00)"

    // Days regex:
    const days_regex = "^{\"sunday\":{\"open\":\""+time_regex+"\", \"close\":\""+time_regex+"\"}, " +
                         "\"monday\":{\"open\":\""+time_regex+"\", \"close\":\""+time_regex+"\"}, " +
                        "\"tuesday\":{\"open\":\""+time_regex+"\", \"close\":\""+time_regex+"\"}, " +
                      "\"wednesday\":{\"open\":\""+time_regex+"\", \"close\":\""+time_regex+"\"}, " +
                       "\"thursday\":{\"open\":\""+time_regex+"\", \"close\":\""+time_regex+"\"}, " +
                         "\"friday\":{\"open\":\""+time_regex+"\", \"close\":\""+time_regex+"\"}, " +
                       "\"saturday\":{\"open\":\""+time_regex+"\", \"close\":\""+time_regex+"\"}}$";

    // Final regex:
    const regex = new RegExp(days_regex);

    // Ensure formatting is correct
    return regex.test(hours);
}



// Export functions
module.exports = {
    validate_userID,
    validate_address,
    validate_phone,
    validate_description,
    validate_hours
};