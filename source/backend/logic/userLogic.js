function validate_email(email) {
    if(email.includes("@"))
        return true;
    else
        return false;
}

function hash_password(password) {
    var hashed_password = password;
    //hash password

    return hashed_password;
}

module.exports = {validate_email};