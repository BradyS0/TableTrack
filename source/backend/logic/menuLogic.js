const Decimal = require('decimal.js');

function validate_name(name) {
    return (typeof name == "string" && name.length > 0 && name.length <= 20);
}

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

function parse_money(price) {
    //partially made using ChatGPT
    const cleaned = price.replace('$', '').trim();
    try {
        return new Decimal(cleaned).toFixed(2);
    } catch {
        return null;
    }
}

export default { validate_name, validate_price, validate_description, validate_category, parse_money }