function validate_name(name) {
    return (typeof name == "string" && name.length > 0 && name.length <= 20);
}

//checks if string is a valid price
//optional $ at start of string, optional thousand separators (commas) and 0-2 decimals.
function validate_price(price) {
    //partially made using ChatGPT
    const PRICE_REGEX = /^\$?(?:\d+(?:\.\d{0,2})?|\d{1,3}(?:,\d{3})+(?:\.\d{0,2})?)$/
    return (typeof price == "string" && PRICE_REGEX.test(price));
}

function validate_description(desc) {
    return (typeof desc == "string" && desc.length <= 200);
}

function validate_category(category) {
    return (typeof category == "string" && category.length <= 20);
}

// converts string into a variable could be saved as a decimal
function parse_money(price) {
    //partially made using ChatGPT
    if (typeof price == "string") {
        const cleaned = price.replace('$', '');
        try {
            return parseFloat(cleaned).toFixed(2);
        } catch {
            return null;
        }    
    } else {
        return null;
    }
}

export default { validate_name, validate_price, validate_description, validate_category, parse_money }