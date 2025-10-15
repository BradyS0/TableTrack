
import RestaurantLogic from '../../logic/restaurantLogic.js';


// -------------------------------------------------- validate_address

test("validate_address: No number", () => {

    const str = "Main street, Winnipeg MB";
    expect(RestaurantLogic.validate_address(str)).toEqual(false);
});

test("validate_address: No text", () => {

    const str = "100";
    expect(RestaurantLogic.validate_address(str)).toEqual(false);
});

test("validate_address: Valid address", () => {

    const str = "100 Main street, Winnipeg MB";
    expect(RestaurantLogic.validate_address(str)).toEqual(true);
});



// -------------------------------------------------- validate_phone

test("validate_phone: Bad area code", () => {

    const str = "(01 123-4567";
    expect(RestaurantLogic.validate_phone(str)).toEqual(false);
});

test("validate_phone: No dash", () => {

    const str = "(204) 123 4567";
    expect(RestaurantLogic.validate_phone(str)).toEqual(false);
});

test("validate_phone: Valid number", () => {

    const str = "(204) 123-4567";
    expect(RestaurantLogic.validate_phone(str)).toEqual(true);
});



// -------------------------------------------------- validate_name

// Same implementation as validate_description



// -------------------------------------------------- validate_description

test("validate_description: Too short", () => {

    const str = "aaaaa"; // 5
    expect(RestaurantLogic.validate_description(str)).toEqual(false);
});

test("validate_description: Too long", () => {

    const str = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + // 50
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + // 100
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + // 150
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + // 200
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + // 250
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + // 300
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + // 350
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + // 400
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" + // 450
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";  // 500
    expect(RestaurantLogic.validate_description(str)).toEqual(false);
});

test("validate_description: Just right", () => {

    const str = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"; // 50
    expect(RestaurantLogic.validate_description(str)).toEqual(true);
});



// -------------------------------------------------- validate_hours

const sun_fri_json = "{\"sunday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
                      "\"monday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
                     "\"tuesday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
                   "\"wednesday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
                    "\"thursday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, " +
                      "\"friday\":{\"open\":\"8:30\", \"close\":\"22:30\"}, ";

test("validate_hours: Missing bracket", () => {

    const sat_json = "\"saturday\":\"open\":\"8:30\", \"close\":\"22:30\"}}";
    expect(RestaurantLogic.validate_hours(sun_fri_json + sat_json)).toEqual(false);
});

test("validate_hours: Open 12:69 (Bad)", () => {

    const sat_json = "\"saturday\":{\"open\":\"12:69\", \"close\":\"22:30\"}}";
    expect(RestaurantLogic.validate_hours(sun_fri_json + sat_json)).toEqual(false);
});

test("validate_hours: Close 24:30 (Bad)", () => {

    const sat_json = "\"saturday\":{\"open\":\"8:30\", \"close\":\"24:30\"}}";
    expect(RestaurantLogic.validate_hours(sun_fri_json + sat_json)).toEqual(false);
});

test("validate_hours: 6:00 to 12:30", () => {

    const sat_json = "\"saturday\":{\"open\":\"6:00\", \"close\":\"12:30\"}}";
    expect(RestaurantLogic.validate_hours(sun_fri_json + sat_json)).toEqual(true);
});
