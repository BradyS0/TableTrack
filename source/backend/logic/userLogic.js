function validate_all(first_name, last_name, email, password) {
    const VALID_FIRST = validate_name(first_name);
    const VALID_LAST = validate_name(last_name);
    const VALID_EMAIL = validate_email(email);
    const VALID_PASS = validate_password(password);

    return VALID_FIRST && VALID_LAST && VALID_EMAIL && VALID_PASS;
}

//function validate_name(first_name, last_name)

//name validation regex derived from https://stackoverflow.com/a/66910482
//Length of names between 2-30 characters (inclusive)
//Names can only contain A-Z, a-z and spaces, first letter of variable must always be upper case
//Names cannot start or end with a space, but can be separated by a space
//No special characters
function validate_name(name) {
    const NAME_REGEX = /^[A-Z](?=.{1,29}$)[A-Za-z]*(?:[ ]+[A-Z][A-Za-z]*)*$/;
    return NAME_REGEX.test(name);
}

//function validate_email(email)

//email validation regex taken from https://mailtrap.io/blog/javascript-email-validation
//Checks for presence of @ symbol, domain part with at least one dot including domain extension
//and no leading, trailing, or consecutive whitespace characters
function validate_email(email) {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAIL_REGEX.test(email);
}

function validate_password(password) {
    const PASS_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,15}$/;
    return PASS_REGEX.test(password);
}

function hash_password(password) {
    let hashed_password = password;
    //hash password

    return hashed_password;
}

module.exports = {validate_all, validate_email, validate_name, validate_password, hash_password};
