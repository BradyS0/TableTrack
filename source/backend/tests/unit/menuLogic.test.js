import MenuLogic from "../../logic/menuLogic";

// -------------------------------------------------- validate_name
// valid cases
test("menu item name that is between length 1-20", () => {
    expect(MenuLogic.validate_name("Cheese")).toEqual(true);
});

// edge cases
test("empty menu item name", () => {
    expect(MenuLogic.validate_name("")).toEqual(false);
});

test("menu item name that is length 1", () => {
    expect(MenuLogic.validate_name("a")).toEqual(true);
});

test("menu item name that is length 20", () => {
    expect(MenuLogic.validate_name("Eggs Bacon and Toast")).toEqual(true);
});

test("menu item name that is length 21", () => {
    expect(MenuLogic.validate_name("Cheese is a long word")).toEqual(false);
});

test("menu item name that is not a string", () => {
    expect(MenuLogic.validate_name(0)).toEqual(false);
});

// -------------------------------------------------- validate_price
// valid cases
test("price starting with $, thousands separator (commas), and two decimal spots", () => {
    expect(MenuLogic.validate_price("$1,000.99")).toEqual(true);
});

test("price with no $, but has a thousands separator (commas), and two decimal spots", () => {
    expect(MenuLogic.validate_price("1,000.99")).toEqual(true);
});

test("price without thousands separator", () => {
    expect(MenuLogic.validate_price("$1000.99")).toEqual(true);
});

test("price without decimals", () => {
    expect(MenuLogic.validate_price("$1,000")).toEqual(true);
});

// edge cases

test("empty price", () => {
    expect(MenuLogic.validate_price("")).toEqual(false);
})

test("price with only one decimal spot", () => {
    expect(MenuLogic.validate_price("$1.1")).toEqual(true);
});

test("price with period, but no decimals", () => {
    expect(MenuLogic.validate_price("$100.")).toEqual(false);
});

test("price with only digits after decimal spot", () => {
    expect(MenuLogic.validate_price("$.12")).toEqual(false);
});

test("starting with multiple $", () => {
    expect(MenuLogic.validate_price("$$10")).toEqual(false);
});

test("price ending with $", () => {
    expect(MenuLogic.validate_price("100.10$")).toEqual(false);
});

test("only $", () => {
    expect(MenuLogic.validate_price("$")).toEqual(false);
});

test("price with letters", () => {
    expect(MenuLogic.validate_price("$10a.11")).toEqual(false);
});

test("price that is not a string", () => {
    expect(MenuLogic.validate_price(1)).toEqual(false);
});

// -------------------------------------------------- validate_description
// valid cases
test("description that is between length 0 and 200", () => {
    expect(MenuLogic.validate_description("This is a description.")).toEqual(true);
});

// edge cases
test("empty string description", () => {
    expect(MenuLogic.validate_description("")).toEqual(true);
});

test("description that is length 200", () => {
    const test = "x".repeat(200);
    expect(MenuLogic.validate_description(test)).toEqual(true);
});

test("description that is length 201", () => {
    const test = "x".repeat(201);
    expect(MenuLogic.validate_description(test)).toEqual(false);
});

test("description that is not a string", () => {
    expect(MenuLogic.validate_category(0)).toEqual(false);
});

// -------------------------------------------------- validate_category
// valid cases
test("category that is between length 0 and 20", () => {
    expect(MenuLogic.validate_category("This is a category.")).toEqual(true);
});

// edge cases
test("empty category", () => {
    expect(MenuLogic.validate_category("")).toEqual(true);
});

test("category that is length 20", () => {
    const test = "x".repeat(20);
    expect(MenuLogic.validate_category(test)).toEqual(true);
});

test("category that is length 21", () => {
    const test = "x".repeat(21);
    expect(MenuLogic.validate_category(test)).toEqual(false);
});

test("category that is not a string", () => {
    expect(MenuLogic.validate_category(0)).toEqual(false);
});

// -------------------------------------------------- parse_money
// valid cases
test("price starting with $, thousands separator (commas), and two decimal spots", () => {
    expect(MenuLogic.parse_money("$1,000.99")).toEqual(1000.99);
});

test("price with no $, but has a thousands separator (commas), and two decimal spots", () => {
    expect(MenuLogic.parse_money("1,000.99")).toEqual(1000.99);
});

test("price without thousands separator", () => {
    expect(MenuLogic.parse_money("$1000.99")).toEqual(1000.99);
});

test("price without decimals", () => {
    expect(MenuLogic.parse_money("$1,000")).toEqual(1000.00);
});

// edge cases
test("empty price", () => {
    expect(MenuLogic.parse_money("")).toEqual(NaN);
});

test("price with only one decimal spot", () => {
    expect(MenuLogic.parse_money("$1.1")).toEqual(1.10);
});

test("price with period, but no decimals", () => {
    expect(MenuLogic.parse_money("$100.")).toEqual(NaN);
});

test("price with only digits after decimal spot", () => {
    expect(MenuLogic.parse_money("$.12")).toEqual(NaN);
});

test("starting with multiple $", () => {
    expect(MenuLogic.parse_money("$$10")).toEqual(NaN);
});

test("price ending with $", () => {
    expect(MenuLogic.parse_money("100.10$")).toEqual(NaN);
});

test("only $", () => {
    expect(MenuLogic.parse_money("$")).toEqual(NaN);
});

test("price with letters", () => {
    expect(MenuLogic.parse_money("$10a.11")).toEqual(NaN);
});

test("price that is not a string", () => {
    expect(MenuLogic.parse_money(1)).toEqual(NaN);
});