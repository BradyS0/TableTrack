
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


// -------------------------------------------------- validate_tags

test("Tag fails to validate hyphen in the beginning", ()=>{
const test_tag =["ValidTag", "-start", "valid-tag"] //should fail hyphen in the beginning
expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag fails to validate hyphen in the end", ()=>{
const test_tag =["ValidTag", "valid-tag", "end-"] //should fail hyphen in the end
expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag fails to validate a tag is too short", ()=>{
const test_tag =["ValidTag", "valid-tag", "en"] //should fail a tag is too short
expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag fails to validate a tag is too long", ()=>{
const test_tag =["SuuuuuuuuuuuuuuuuuuuuuuperLOoooooooongTag"] //should fail a tag is too long
expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag fails to validate numbers in the string", ()=>{
const test_tag =["123tag"] //no numbers allowed in the string
expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag fails to validate numbers in tags", ()=>{
const test_tag =["validtag",1234,"another-valid-tag"] //no numbers allowed in tags
expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag fails to validate special characters", ()=>{
    const test_tag =["valid!tag"] //should fail special characters not allowed
    expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag fails to validate underscore", ()=>{
    const test_tag =["valid_tag"] //should fail underscore possibly not allowed (assuming only letters and hyphens)
    expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag fails to validate multiple hyphens", ()=>{
    const test_tag =["valid--tag"] //should fail consecutive hyphens
    expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag fails to validate empty string tag", ()=>{
    const test_tag =[""] //should fail empty string
    expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag fails to validate leading/trailing spaces", ()=>{
    const test_tag =[" food "] //should fail spaces even if trimmed or not
    expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag fails to validate non-ASCII characters", ()=>{
    const test_tag =["café"] //should fail accented or non-ASCII letters
    expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag fails to validate non-string tag like boolean", ()=>{
    const test_tag =[true] //should fail non-string types
    expect(RestaurantLogic.validate_tags(test_tag)).toEqual(false)
})

test("Tag validates empty array", ()=>{
const test_tag =[] //empty array is valid
expect(RestaurantLogic.validate_tags(test_tag)).toEqual(true)
})

test("Tag validates all valid tags", ()=>{
const test_tag =["food", "vegan", "dessert", 'valid-tag'] //all valid
expect(RestaurantLogic.validate_tags(test_tag)).toEqual(true)
})