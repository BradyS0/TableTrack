
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



function validate_tags(tags){
    const MIN_LEN = 3
    const MAX_LEN = 30
    //regex only accepts hyphens and alphabets , cannopt start or end with a hyphen
    const tags_regex = /^[A-Za-z]+(?:-[A-Za-z]+)*$/

    if(!Array.isArray(tags))
        return false

    const isValid = tags.every(tag =>
        typeof(tag) === 'string' && 
        tag.length>=MIN_LEN &&
        tag.length<=MAX_LEN && 
        tags_regex.test(tag));

    return isValid
}



// Export functions
export default {
    validate_address,
    validate_phone,
    validate_name,
    validate_description,
    validate_tags
};
