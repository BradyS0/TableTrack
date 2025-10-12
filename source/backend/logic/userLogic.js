function validate_all(first_name, last_name, email, password) {
    const valid_first = validate_name(first_name)
    const valid_last = validate_name(last_name)
    const valid_email = validate_email(email);
    const valid_pass = validate_password(password);

    return valid_first && valid_last && valid_email && valid_pass;
}

//function validate_name(first_name, last_name)

//name validation regex taken from https://stackoverflow.com/a/66910482
//Length of names between 2-30 characters (inclusive)
//Names can only contain A-Z, a-z and spaces, first letter of variable must always be upper case
//Names cannot start or end with a space, but can be separated by a space
//No special characters
function validate_name(name) {
    const name_regex = /^[A-Z](?=.{1,29}$)[A-Za-z]*(?:\h+[A-Z][A-Za-z]*)*$/;
    return name_regex.test(name);
}

//function validate_email(email)

//email validation regex taken from https://mailtrap.io/blog/javascript-email-validation
//Checks for presence of @ symbol, domain part with at least one dot including domain extension
//and no leading, trailing, or consecutive whitespace characters
function validate_email(email) {
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_regex.test(email);
}

function validate_password(password) {
    
    return true
}

function hash_password(password) {
    let hashed_password = password;
    //hash password

    return hashed_password;
}

module.exports = {validation: validate_all, hash_password};