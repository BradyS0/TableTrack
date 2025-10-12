function validation(first_name, last_name, email, password) {
    let valid_names = validate_name(first_name, last_name)
    let valid_email = validate_email(email);
    let valid_pass = validate_password(password);

    return valid_names && valid_email && valid_pass;
}

function validate_name(first_name, last_name) {
    //name validation regex taken from https://stackoverflow.com/a/66910482
    const name_regex = /^[A-Z](?=.{1,29}$)[A-Za-z]*(?:\h+[A-Z][A-Za-z]*)*$/;
    return name_regex.test(first_name) && name_regex.test(last_name);
}

function validate_email(email) {
    //email validation regex taken from https://mailtrap.io/blog/javascript-email-validation
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

module.exports = {validation, hash_password};