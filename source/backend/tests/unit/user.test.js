const { validate_email } = require('../../logic/userLogic.js');

test("email has @ symbol with in it", () => {

    expect(validate_email("email@example.ca")).toEqual(true);
});

test("email with no @ symbol in it", () => {
    expect(validate_email("emailexample.ca")).toEqual(false);
});