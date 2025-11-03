
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



// Test name
function validate_name(name) {

    const MAX_NAME_LEN = 50;
    const MIN_NAME_LEN = 1;

    // Ensure valid name length
    if (name.length >= MIN_NAME_LEN && name.length <= MAX_NAME_LEN) {
        return true;
    } else {
        return false;
    }
}



// Test description
function validate_description(desc) {

    const MAX_DESC_LEN = 400;
    const MIN_DESC_LEN = 10;

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
    const days_regex = "^{\"sunday\":{\"open\":\"" + time_regex + "\", \"close\":\"" + time_regex + "\"}, " +
        "\"monday\":{\"open\":\"" + time_regex + "\", \"close\":\"" + time_regex + "\"}, " +
        "\"tuesday\":{\"open\":\"" + time_regex + "\", \"close\":\"" + time_regex + "\"}, " +
        "\"wednesday\":{\"open\":\"" + time_regex + "\", \"close\":\"" + time_regex + "\"}, " +
        "\"thursday\":{\"open\":\"" + time_regex + "\", \"close\":\"" + time_regex + "\"}, " +
        "\"friday\":{\"open\":\"" + time_regex + "\", \"close\":\"" + time_regex + "\"}, " +
        "\"saturday\":{\"open\":\"" + time_regex + "\", \"close\":\"" + time_regex + "\"}}$";

    // Final regex:
    const regex = new RegExp(days_regex);

    // Ensure formatting is correct
    return regex.test(hours);
}

function validate_tags(tags){
    const MIN_LEN = 3
    const MAX_LEN = 30
    //regex only accepts hyphens and alphabets
    const tags_regex = "^[A-Za-z-]+$" 

    if(!Array.isArray(tags))
        return false

    const regex = new RegExp(tags_regex)
    const isValid = tags.every(tag => tag.length>=MIN_LEN &&
        tag.length<=MAX_LEN && regex.test(tag));

    return isValid
}



// Export functions
export default {
    validate_address,
    validate_phone,
    validate_name,
    validate_description,
    validate_hours,
    validate_tags
};
