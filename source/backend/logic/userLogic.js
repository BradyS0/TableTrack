function validate_email(email) {
    //email validation regex taken from https://mailtrap.io/blog/javascript-email-validation
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_regex.test(email);
}

function hash_password(password) {
    var hashed_password = password;
    //hash password

    return hashed_password;
}

module.exports = {validate_email};