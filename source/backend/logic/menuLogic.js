function validate_name(name) {
    const NAME_REGEX = /^[A-Z](?=.{1,19}$)[A-Za-z]*(?:[ ]+[A-Z][A-Za-z]*)*$/;
    return NAME_REGEX.test(name);
}

function validate_price(price) {
    //does not accept numbers with commas
    const PRICE_REGEX = /^\d+\.?\d{0,2}?$/;
    return PRICE_REGEX;
}

function validate_description(desc) {
    return desc.length <= 200;
}

function validate_category(category) {
    return category.length <= 20
}

export default { validate_name, validate_price, validate_description, validate_category }