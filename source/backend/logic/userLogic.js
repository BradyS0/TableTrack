function validate_email(email){
    if(email.includes("@"))
        return true;
    else
        return false;
}

module.exports = {validate_email};